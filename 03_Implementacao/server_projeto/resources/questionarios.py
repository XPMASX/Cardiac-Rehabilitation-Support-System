import json
import falcon
import logging
import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class QuestionariosResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, id):
        try:
            cursor = self.db_connection.cursor()
            cursor.execute("SELECT DadosQuests FROM Questionario WHERE idQuestionario = %s", (id,))
            result = cursor.fetchone()
            cursor.close()

            if result:
                data = result[0]
                resp.media = data
                resp.status = falcon.HTTP_200
            else:
                resp.status = falcon.HTTP_404
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_post(self, req, resp, id):
        """Handles POST requests to create a new questionnaire"""
        try:
            data = json.load(req.bounded_stream)
            cursor = self.db_connection.cursor()
            cursor.execute(
                "INSERT INTO Questionario (idQuestionario, DadosQuests) VALUES (%s, %s)",
                (id, json.dumps(data))
            )
            self.db_connection.commit()
            cursor.close()
            resp.status = falcon.HTTP_201
        except Exception as e:
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(e)}

    def on_put(self, req, resp, id):
        try:
            data = json.load(req.bounded_stream)
            cursor = self.db_connection.cursor()
            cursor.execute(
                "INSERT INTO Questionario (idQuestionario, DadosQuests) VALUES (%s, %s) "
                "ON DUPLICATE KEY UPDATE DadosQuests = VALUES(DadosQuests)",
                (id, json.dumps(data))
            )
            self.db_connection.commit()
            cursor.close()
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(e), 'id do questionario': id}

    def on_delete(self, req, resp, id):
        try:
            cursor = self.db_connection.cursor()
            deletion_time = datetime.datetime.utcnow()
            cursor.execute(
                "UPDATE Questionario SET deleted_at = %s WHERE idQuestionario = %s AND deleted_at IS NULL",
                (deletion_time, id)
            )
            self.db_connection.commit()

            if cursor.rowcount > 0:
                resp.status = falcon.HTTP_200
            else:
                resp.status = falcon.HTTP_404
            cursor.close()
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_options(self, req, resp, id=None):
        """Handles OPTIONS requests"""
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_200

class ListQuestionariosResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp):
        try:
            logging.debug("Fetching all questionnaires")
            cursor = self.db_connection.cursor()
            cursor.execute("SELECT idQuestionario, DadosQuests FROM Questionario WHERE deleted_at IS NULL")
            result = cursor.fetchall()
            cursor.close()

            questionnaires = []
            for row in result:
                questionnaire_id, data_json = row
                try:
                    data = json.loads(data_json)
                    #logging.debug(f"Parsed data: {data}")
                    if isinstance(data, dict):
                        title = data.get('title', 'Untitled')
                        description = data.get('description', 'No description')
                        questionnaires.append({'id': questionnaire_id, 'title': title, 'description': description})
                    else:
                        logging.error(f"Unexpected data format: {data}")
                except json.JSONDecodeError as e:
                    logging.error(f"Error decoding JSON: {e}")
                    continue

            logging.debug(f"Final list of questionnaires: {questionnaires}")
            resp.media = questionnaires
            resp.status = falcon.HTTP_200
        except Exception as e:
            logging.error(f"Error fetching questionnaires: {e}")
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_options(self, req, resp):
        """Handles OPTIONS requests"""
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_200


class AssignedQuestionnairesResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, paciente_num_utente_saude):
        try:
            cursor = self.db_connection.cursor()
            query = """
                SELECT Q.idQuestionario, Q.DadosQuests
                FROM Questionario Q
                JOIN AtribuicaoQuestionario AQ ON Q.idQuestionario = AQ.idQuestionario
                WHERE AQ.PacienteNumUtenteSaude = %s
            """
            cursor.execute(query, (paciente_num_utente_saude,))
            result = cursor.fetchall()
            cursor.close()

            questionnaires = []
            for row in result:
                questionnaire_id, data_json = row
                try:
                    data = json.loads(data_json)
                    if isinstance(data, dict):
                        title = data.get('title', 'Untitled')
                        description = data.get('description', 'No description')
                        questionnaires.append({'id': questionnaire_id, 'title': title, 'description': description})
                except json.JSONDecodeError as e:
                    logging.error(f"Error decoding JSON: {e}")
                    continue

            resp.media = questionnaires
            resp.status = falcon.HTTP_200
        except Exception as e:
            logging.error(f"Error fetching assigned questionnaires: {e}")
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}

    def on_post(self, req, resp):
        try:
            data = json.load(req.bounded_stream)
            num_utente_saude = data.get('numUtenteSaude')
            id_questionario = data.get('dadosPlano')

            if not num_utente_saude or not id_questionario:
                raise ValueError("Missing numUtenteSaude or dadosPlano")

            result = self.atribuir_questionario(num_utente_saude, id_questionario)
            if result['status'] == 'success':
                resp.media = {'status': 'success', 'idAtribuicao': result['idAtribuicao']}
                resp.status = falcon.HTTP_201
            else:
                resp.media = {'status': 'error', 'message': result['message']}
                resp.status = falcon.HTTP_500
        except ValueError as e:
            resp.media = {'status': 'error', 'message': str(e)}
            resp.status = falcon.HTTP_400
        except Exception as e:
            logging.error(f"Error in on_post: {e}")
            resp.media = {'status': 'error', 'message': str(e)}
            resp.status = falcon.HTTP_500

    def atribuir_questionario(self, num_utente_saude, id_questionario):
        try:
            cursor = self.db_connection.cursor()
            
            query = """
                INSERT INTO AtribuicaoQuestionario (idQuestionario, PacienteNumUtenteSaude)
                VALUES (%s, %s)
            """
            cursor.execute(query, (id_questionario, num_utente_saude))
            self.db_connection.commit()
            
            id_atribuicao = cursor.lastrowid
            cursor.close()

            return {'status': 'success', 'idAtribuicao': id_atribuicao}
        except Exception as e:
            logging.error(f"Error assigning questionnaire: {e}")
            return {'status': 'error', 'message': str(e)}


class UploadQuestionarioPreenchidoResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_post(self, req, resp, id):
        try:
            data = json.load(req.bounded_stream)
            id_questionario = id
            dados_quests = json.dumps(data['DadosQuests'])
            paciente_num_utente_saude = data['PacienteNumUtenteSaude']

            cursor = self.db_connection.cursor()
            cursor.execute(
                """INSERT INTO QuestionarioPreenchido (idQuestionario, DadosQuests, PacienteNumUtenteSaude) VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE DadosQuests = VALUES(DadosQuests)""",
                (id_questionario, dados_quests, paciente_num_utente_saude)
            )
            self.db_connection.commit()
            cursor.close()

            resp.status = falcon.HTTP_201
        except Exception as e:
            logging.error(f"Error submitting filled questionnaire: {e}")
            resp.status = falcon.HTTP_400
            resp.media = {'error': str(e)}

 

class FilledQuestionnaireResource:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def on_get(self, req, resp, paciente_num_utente_saude):
        try:
            cursor = self.db_connection.cursor()
            cursor.execute("""
                SELECT idQuestionario, DadosQuests 
                FROM QuestionarioPreenchido 
                WHERE PacienteNumUtenteSaude = %s
            """, (paciente_num_utente_saude,))
            result = cursor.fetchall()
            cursor.close()

            filled_forms = []
            for row in result:
                idQuestionario, dadosQuests = row
                filled_forms.append({
                    'idQuestionario': idQuestionario,
                    'DadosQuests': json.loads(dadosQuests)
                })
                logging.debug(json.loads(dadosQuests))

            resp.media = filled_forms
            resp.status = falcon.HTTP_200
        except Exception as e:
            logging.error(f"Error fetching filled forms: {e}")
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(e)}
