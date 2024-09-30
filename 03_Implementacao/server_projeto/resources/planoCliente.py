import json
import falcon
import mysql.connector

class PlanoClienteResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp):
        """Handles GET requests"""
        try:
            NumUtenteSaude = req.get_param('NumUtenteSaude', default=None)

            cursor = self.db_connection.cursor(dictionary=True)

            if NumUtenteSaude is not None:
                query = "SELECT * FROM PlanoCliente WHERE NumUtenteSaude = %s"
                cursor.execute(query, (NumUtenteSaude,))
            else:
                query = "SELECT * FROM PlanoCliente"
                cursor.execute(query)

            data = cursor.fetchall()
            if data:
                resp.media = data
            else:
                resp.status = falcon.HTTP_404
                resp.media = {"error": "No planos found"}
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_put(self, req, resp, id):
        try:
            data = json.load(req.bounded_stream)
            exercise_id = data.get('exerciseId')
            status = data.get('status')

            if not exercise_id or not status:
                raise ValueError("Missing required fields: 'exerciseId' or 'status'")

            cursor = self.db_connection.cursor()
            query = "SELECT DadosPlano FROM PlanoCliente WHERE id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchone()

            if result:
                # Safely load and update the JSON data
                dados_plano = json.loads(result[0])
                updated = False
                for plano in dados_plano:
                    for exercise in plano.get('exercisesList', []):
                        if exercise.get('selectedExercise') == exercise_id:
                            exercise['exercicioFeito'] = status
                            updated = True
                            break
                    if updated:
                        break

                if updated:
                    # Update the database with the new JSON data
                    update_dados_plano_query = "UPDATE PlanoCliente SET DadosPlano = %s WHERE id = %s"
                    cursor.execute(update_dados_plano_query, (json.dumps(dados_plano), id))
                    self.db_connection.commit()

                    resp.status = falcon.HTTP_200
                    resp.media = dados_plano
                else:
                    resp.status = falcon.HTTP_404
                    resp.media = {"error": "Exercise not found in the plan"}
            else:
                resp.status = falcon.HTTP_404
                resp.media = {"error": f"Plan with id {id} not found"}

        except ValueError as ve:
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(ve)}


    def on_post(self, req, resp):
        try:
            data = req.media
            print('Request data:', data)

            NumUtenteSaude = data.get('numUtenteSaude')
            DadosPlano = json.loads(
                data.get('dadosPlano'))

            if not NumUtenteSaude or not DadosPlano:
                raise ValueError('Dados de paciente ou plano ausentes na requisição')

            cursor = self.db_connection.cursor()
            insert_query = "INSERT INTO PlanoCliente (NumUtenteSaude, DadosPlano) VALUES (%s, %s)"
            cursor.execute(insert_query, (NumUtenteSaude, json.dumps(DadosPlano)))
            self.db_connection.commit()

            print('Response:', {'message': "PlanoCliente row created successfully"})
            resp.status = falcon.HTTP_201
            resp.media = {"message": "PlanoCliente row created successfully"}

        except ValueError as ve:
            print('Error:', str(ve))
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(ve)}

        except mysql.connector.Error as e:
            print('Error:', str(e))
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

        except Exception as ex:
            print('Error:', str(ex))
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(ex)}