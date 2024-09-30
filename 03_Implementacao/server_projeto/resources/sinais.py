import json
import mysql.connector
from falcon import HTTP_400, HTTP_500
from datetime import datetime, timedelta, date, time
import traceback
from decimal import Decimal

class SinaisResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, id):
        tipo_sinal = req.get_param('tipoSinal', default=None)
        time_span = req.get_param('timeSpan', default=None)
        start_date_str = req.get_param('startDate', default=None)
        end_date_str = req.get_param('endDate', default=None)

        try:
            cursor = self.db_connection.cursor(dictionary=True)

            valid_signals = ['BatCardiaco', 'Passos']
            if tipo_sinal and tipo_sinal not in valid_signals:
                raise ValueError("Invalid tipoSinal. Use 'BatCardiaco' or 'Passos'.")

            select_columns = "Data"
            if tipo_sinal == 'BatCardiaco':
                select_columns += ", BatCardiaco"
                query_filter = "AND BatCardiaco != 0"
            elif tipo_sinal == 'Passos':
                select_columns += ", Passos"
                query_filter = "AND MINUTE(Data) = 0"
            else:
                select_columns += ", BatCardiaco, Passos"
                query_filter = ""

            query = f"SELECT {select_columns} FROM DadosDeSaude WHERE NumUtenteSaude = %s {query_filter}"
            params = [id]
            duration = None

            if time_span:
                end_date = datetime.now()
                if time_span == 'day':
                    start_date = end_date - timedelta(days=1)
                elif time_span == 'week':
                    start_date = end_date - timedelta(weeks=1)
                elif time_span == 'month':
                    start_date = end_date - timedelta(days=30)
                elif time_span == 'year':
                    start_date = end_date - timedelta(days=365)
                elif time_span == 'between':
                    if not start_date_str or not end_date_str:
                        raise ValueError("Both startDate and endDate must be provided for 'between' time span.")
                    start_date = validate_and_convert_date(start_date_str)
                    end_date = validate_and_convert_date(end_date_str)

                    # Determine the duration and adjust the query accordingly
                    duration = end_date - start_date
                    end_date -= timedelta(hours=1)
                    if duration.days > 30:
                        # Use year format
                        query = """
                            SELECT
                                Data,
                                BatCardiaco
                            FROM DadosDeSaude
                            WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s AND BatCardiaco != 0
                            AND HOUR(Data) % 12 = 0 AND MINUTE(Data) = 0
                        """
                        params = [id, start_date, end_date]
                    elif duration.days > 7:
                        # Use month format
                        query = """
                            SELECT
                                Data,
                                BatCardiaco
                            FROM DadosDeSaude
                            WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s AND BatCardiaco != 0
                            AND ((HOUR(Data) % 4 = 0 OR HOUR(Data) = 0)) AND MINUTE(Data) = 0
                        """
                        params = [id, start_date, end_date]
                else:
                    raise ValueError("Invalid time span. Use 'day', 'week', 'month', 'year', or 'between'.")

                if time_span != 'day' and tipo_sinal == 'Passos' and time_span != 'between':
                    adjusted_end_date = datetime.combine(datetime.now(), time.max)
                    query = f"""
                        SELECT DATE(Data) as Data, MAX(Passos) as Passos
                        FROM DadosDeSaude
                        WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s
                        {query_filter}
                        GROUP BY DATE(Data)
                    """
                    params = [id, start_date, datetime.now()]
                elif time_span == 'day' and tipo_sinal == 'Passos':
                    start_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
                    query = f"SELECT {select_columns} FROM DadosDeSaude WHERE NumUtenteSaude = %s {query_filter}"
                    query += " AND Data BETWEEN %s AND %s"
                    params.extend([start_date, end_date])
                elif time_span == 'between' and tipo_sinal == 'Passos' and duration.days != 1:
                    adjusted_end_date = datetime.combine(end_date, time.max)
                    query = f"""
                        SELECT DATE(Data) as Data, MAX(Passos) as Passos
                        FROM DadosDeSaude
                        WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s
                        {query_filter}
                        GROUP BY DATE(Data)
                    """
                    params = [id, start_date, adjusted_end_date]
                elif time_span == 'week' and tipo_sinal == 'BatCardiaco':
                    query = f"""
                        SELECT {select_columns}
                        FROM DadosDeSaude
                        WHERE NumUtenteSaude = %s AND Data >= %s AND Data <= %s
                        {query_filter}
                        AND Data IN (
                            SELECT MIN(Data)
                            FROM DadosDeSaude
                            WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s
                            {query_filter}
                            GROUP BY DATE(Data), HOUR(Data)
                        )
                    """
                    params = [id, start_date, end_date, id, start_date, end_date]
                elif time_span == 'month' and tipo_sinal == 'BatCardiaco':
                    query = """
                        SELECT
                            Data,
                            BatCardiaco
                        FROM DadosDeSaude
                        WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s AND BatCardiaco != 0
                        AND ((HOUR(Data) % 4 = 0 OR HOUR(Data) = 0)) AND MINUTE(Data) = 0
                    """
                    params = [id, start_date, end_date]
                elif time_span == 'year' and tipo_sinal == 'BatCardiaco':
                    query = """
                        SELECT
                            Data,
                            BatCardiaco
                        FROM DadosDeSaude
                        WHERE NumUtenteSaude = %s AND Data BETWEEN %s AND %s AND BatCardiaco != 0
                        AND HOUR(Data) % 12 = 0 AND MINUTE(Data) = 0
                    """
                    params = [id, start_date, end_date]
                else:
                    query += " AND Data BETWEEN %s AND %s"
                    params.extend([start_date, end_date])

            cursor.execute(query, params)
            data = cursor.fetchall()

            # Label periods and convert datetime objects to strings
            for record in data:
                if 'Data' in record:
                    Data = record['Data']
                    if isinstance(Data, datetime):
                        record['period'] = 'active' if 6 <= Data.hour < 22 else 'sleep'
                        record['Data'] = Data.strftime('%Y-%m-%d %H:%M:%S')
                    elif 'date' in record and 'hour_interval' in record:  # For monthly BatCardiaco data
                        record['period'] = 'active' if 6 <= record['hour_interval'] < 22 else 'sleep'
                        record['Data'] = f"{record['date']} {record['hour_interval']:02d}:00:00"

            resp.media = convert_dates_to_strings(data)
        except mysql.connector.Error as e:
            error_message = f"Database error: {str(e)}"
            print(error_message)
            resp.status = HTTP_500
            resp.media = {'error': error_message}
        except ValueError as e:
            error_message = f"Value error: {str(e)}"
            print(error_message)
            resp.status = HTTP_400
            resp.media = {'error': error_message}
        except Exception as e:
            error_message = f"Unexpected error: {str(e)}"
            print(error_message)
            print(traceback.format_exc())
            resp.status = HTTP_500
            resp.media = {'error': error_message}

def validate_and_convert_date(date_str):
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Invalid date format. Use YYYY-MM-DD.")

def convert_dates_to_strings(data):
    if isinstance(data, list):
        return [convert_dates_to_strings(item) for item in data]
    elif isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, (datetime, date)):
                data[key] = value.strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(value, (list, dict)):
                data[key] = convert_dates_to_strings(value)
            elif isinstance(value, Decimal):
                data[key] = float(value)
    return data