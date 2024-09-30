import json
import falcon
import mysql.connector
import logging

class ExerciciosResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, id=None):
        """Handles GET requests"""
        try:
            cursor = self.db_connection.cursor(dictionary=True)

            if id is not None:
                query = "SELECT * FROM Exercicios WHERE idExercicios = %s"
                cursor.execute(query, (id,))
            else:
                query = "SELECT * FROM Exercicios"
                cursor.execute(query)

            data = cursor.fetchall()
            if data:
                resp.media = data
            else:
                resp.status = falcon.HTTP_404
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_put(self, req, resp, id=None):
        """Handles PUT requests"""
        try:
            data = json.load(req.bounded_stream)
            cursor = self.db_connection.cursor()
            query = """
            INSERT INTO exercicios (id_exercicio, JSON)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE
            JSON = VALUES(JSON)
            """
            cursor.execute(query, (id, json.dumps(data)))
            self.db_connection.commit()
            resp.status = falcon.HTTP_201  # Created
        except (ValueError, mysql.connector.Error) as e:
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(e), 'id_exercicio': id}

    def on_post(self, req, resp):
        """Handles POST requests"""
        try:
            data = json.load(req.bounded_stream)
            # Process the data and save it to the database
            cursor = self.db_connection.cursor()
            query = """
            INSERT INTO exercicios (JSON)
            VALUES (%s)
            """
            cursor.execute(query, (json.dumps(data),))
            self.db_connection.commit()
            resp.status = falcon.HTTP_201  # Created
        except (ValueError, mysql.connector.Error) as e:
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(e)}

    def on_options(self, req, resp):
        """Handles OPTIONS requests"""
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        resp.status = falcon.HTTP_200

class ListExerciciosResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp):
        """Handles GET requests"""
        try:
            logging.debug("Fetching all exercises")
            cursor = self.db_connection.cursor(dictionary=True)
            query = "SELECT id_exercicio, JSON FROM exercicios"
            cursor.execute(query)
            data = cursor.fetchall()
            if data:
                resp.media = [{'id_exercicio': item['id_exercicio'], 'JSON': json.loads(item['JSON'])} for item in data]
            else:
                resp.status = falcon.HTTP_404
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}