import json
import mysql.connector
from datetime import datetime

# Database connection
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="project_db"
)

def create_table():
    cursor = db_connection.cursor()
    create_table_query = """
    CREATE TABLE IF NOT EXISTS DadosDeSaudeWearable (
        NumUtenteSaude INT NOT NULL,
        Data DATETIME NOT NULL,
        BatCardiaco INT NOT NULL,
        PRIMARY KEY (NumUtenteSaude, Data)
    );
    """
    cursor.execute(create_table_query)
    cursor.close()

def convert_Data(ts):
    # Convert the ISO 8601 Data to MySQL DATETIME format
    if isinstance(ts, str):
        return datetime.fromisoformat(ts.rstrip('Z')).strftime('%Y-%m-%d %H:%M:%S')
    else:
        raise ValueError("Data should be a string")

def save_hr_data(json_file_path):
    # Read JSON file
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Debug: print the loaded data structure
    print("Loaded data:", type(data))

    # Ensure data is a list
    if not isinstance(data, list):
        print("Error: Expected a JSON list at the root")
        return

    # Extract HR and TS values
    NumUtenteSaude = 1  # ID for the same user
    hr_values = []

    for item in data:
        if 'records' in item:
            for record in item['records']:
                for entry in record['data']:
                    if entry['dtype'] in ('HR', 'PPI'):
                        values = json.loads(entry['values'])
                        columns = entry['columns']

                        try:
                            ts_index = columns.index('ts')
                            hr_index = columns.index('value') if 'value' in columns else columns.index('hr')

                            ts_value = values[ts_index]
                            if isinstance(ts_value, str):
                                ts = convert_Data(ts_value)
                                BatCardiaco = values[hr_index]
                                hr_values.append((NumUtenteSaude, ts, BatCardiaco))
                            else:
                                print(f"Skipping entry with non-string Data: {values}")
                        except ValueError as e:
                            print(f"Error: {e}. Columns: {columns}")

    # Debug: print extracted HR values
    # print("Extracted HR values:", hr_values)

    # Insert extracted data into the database with ON DUPLICATE KEY UPDATE
    cursor = db_connection.cursor()
    query = """
    INSERT INTO DadosDeSaudeWearable (NumUtenteSaude, Data, BatCardiaco)
    VALUES (%s, %s, %s)
    ON DUPLICATE KEY UPDATE
    BatCardiaco = VALUES(BatCardiaco)
    """
    cursor.executemany(query, hr_values)
    db_connection.commit()
    cursor.close()
    print("BatCardiaco data saved successfully!")

# Create the table if it does not exist
create_table()

# Path to your JSON file
json_file_path = '../dados.json'

# Save HR data to the database
save_hr_data(json_file_path)

# Close the database connection
db_connection.close()
