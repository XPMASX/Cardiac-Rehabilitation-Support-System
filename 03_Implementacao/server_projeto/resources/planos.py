import json
import falcon
import mysql.connector
import logging


class PlanosResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, id=None):
        """Handles GET requests"""
        try:
            active = req.get_param_as_bool('active', default=True)  # Default to True to fetch only active plans
            cursor = self.db_connection.cursor(dictionary=True)

            if id is not None:
                query = "SELECT * FROM Plano WHERE idPlano = %s AND Active = %s"
                cursor.execute(query, (id, active))
                data = cursor.fetchone()
                if data:
                    resp.media = data
                else:
                    resp.status = falcon.HTTP_404
                    resp.media = {"error": "Plano not found"}
            else:
                query = "SELECT * FROM Plano WHERE Active = %s"
                cursor.execute(query, (active,))
                data = cursor.fetchall()
                if data:
                    resp.media = data
                else:
                    resp.status = falcon.HTTP_404
                    resp.media = {"error": "No planos found"}
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_delete(self, req, resp, id):
        """Handles DELETE requests by soft-deleting a plan"""
        try:
            cursor = self.db_connection.cursor()
            query = "UPDATE Plano SET Active = 0 WHERE idPlano = %s"
            cursor.execute(query, (id,))
            self.db_connection.commit()

            resp.status = falcon.HTTP_200
            resp.media = {"message": "Plano deleted successfully!"}
        except mysql.connector.Error as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_options(self, req, resp, id=None):
        """Handles OPTIONS requests"""
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
        resp.status = falcon.HTTP_200

    def on_put(self, req, resp, id=None, active=1):
        """Handles PUT requests"""
        try:
            data = json.load(req.bounded_stream)
            cursor = self.db_connection.cursor()

            if id is not None:
                query = """
                    UPDATE plano 
                    SET DadosPlano = %s, active = %s
                    WHERE idPlano = %s
                    """
                cursor.execute(query, (json.dumps(data), active, id))
            else:
                # Creating a new plan
                query = """
                    INSERT INTO plano (DadosPlano, active)
                    VALUES (%s, %s)
                    ON DUPLICATE KEY UPDATE
                    DadosPlano = VALUES(DadosPlano), active = VALUES(active)
                    """
                cursor.execute(query, (json.dumps(data), active))

            self.db_connection.commit()

            resp.status = falcon.HTTP_200
            resp.media = {"message": "Plano salvo com sucesso!"}
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}


# class ListPlanosResource:
#     def __init__(self, db_connection):
#         self.db_connection = db_connection
#
#     def on_get(self, req, resp):
#         """Handles GET requests"""
#         try:
#             logging.debug("Fetching all plans")
#             cursor = self.db_connection.cursor(dictionary=True)
#             query = "SELECT * FROM Plano"
#             cursor.execute(query)
#             data = cursor.fetchone()
#             if data:
#                 resp.media = data
#             else:
#                 resp.status = falcon.HTTP_404
#         except mysql.connector.Error as e:
#             resp.status = falcon.HTTP_500
#             resp.media = {'error': str(e)}
