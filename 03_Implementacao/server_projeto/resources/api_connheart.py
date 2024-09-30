import requests
import falcon
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class RoleResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp):
        logging.debug(f"Received headers: {req.headers}")

        # Get the token from the request headers
        token = req.get_header('AUTH-TOKEN-AWS')

        logging.debug(token)
        if not token:
            resp.status = falcon.HTTP_400
            resp.media = {"error": "AUTH-TOKEN-AWS header is missing"}
            return

        api_response = self.fazer_pedido(token)
        if 'error' in api_response:
            resp.status = falcon.HTTP_500
        else:
            resp.status = falcon.HTTP_200

        resp.media = api_response

    def fazer_pedido(self, token):
        url = "http://localhost:7000/cheart/user"
        headers = {"AUTH-TOKEN-AWS": token}

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            logging.debug(response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {e}")
            return {"error": str(e)}
