import json
import falcon
import mysql.connector
class PacienteResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp):
        """Handles GET requests"""
        try:
            cursor = self.db_connection.cursor(dictionary=True)

            query = "SELECT * FROM paciente"
            cursor.execute(query)

            data = cursor.fetchall()
            if data:
                resp.media = data
            else:
                resp.status = falcon.HTTP_404
                resp.media = {"error": "No found"}
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_options(self, req, resp):
        """Handles OPTIONS requests"""
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        resp.status = falcon.HTTP_200