import falcon
import mysql.connector
from falcon_cors import CORS

from resources.exercicios import ExerciciosResource
from resources.paciente import PacienteResource
from resources.planoCliente import PlanoClienteResource
from resources.planos import PlanosResource
from resources.questionarios import AssignedQuestionnairesResource, UploadQuestionarioPreenchidoResource
from resources.questionarios import QuestionariosResource, ListQuestionariosResource
from resources.api_connheart import RoleResource
from resources.sinais import SinaisResource
from resources.questionarios import AssignedQuestionnairesResource, UploadQuestionarioPreenchidoResource
from resources.api_connheart import RoleResource

# MySQL database connection
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="project_db"
)

# CORS middleware configuration
cors = CORS(
    allow_all_origins=True,
    allow_all_methods=True,
    allow_all_headers=True,
    allow_headers_list=['Content-Type']
)

# Falcon API instance
app = falcon.App(middleware=[cors.middleware])

# Routes
app.add_route('/planos', PlanosResource(db_connection=db_connection))
app.add_route('/planos/{id}', PlanosResource(db_connection=db_connection))
app.add_route('/exercises', ExerciciosResource(db_connection=db_connection))
app.add_route('/questionarios/{id}', QuestionariosResource(db_connection=db_connection))
app.add_route('/questionarios', ListQuestionariosResource(db_connection=db_connection))

app.add_route('/planoCliente', PlanoClienteResource(db_connection=db_connection))
app.add_route('/planoCliente/{NumUtenteSaude}', PlanoClienteResource(db_connection=db_connection))
app.add_route('/updateExerciseStatus/{id}', PlanoClienteResource(db_connection=db_connection))
app.add_route('/pacientes', PacienteResource(db_connection=db_connection))
app.add_route('/assign-plan', PlanoClienteResource(db_connection=db_connection))

app.add_route('/questionarios-atribuidos/{paciente_num_utente_saude}', AssignedQuestionnairesResource(db_connection=db_connection))
app.add_route('/guardar-preenchido/{id}', UploadQuestionarioPreenchidoResource(db_connection=db_connection))

app.add_route('/sinais/{id}', SinaisResource(db_connection=db_connection))
app.add_route('/role', RoleResource(db_connection=db_connection))
app.add_route('/atrbuir-questionario', AssignedQuestionnairesResource(db_connection=db_connection))
app.add_route('/role', RoleResource(db_connection=db_connection))

# class TesteResource:
#     def on_get(self, req, resp):
#         resp.media = {"message": "VIM DA API FALCON!!!"}
#
# app.add_route('/teste', TesteResource())
#


# #######VER A ROLE#########
# from resources.api_connheart import fazer_pedido
#
# class Role:
#     def on_get(self, req, resp):
#         api_response = fazer_pedido()
#         resp.media = {"message": api_response}
#         resp.set_header('Access-Control-Allow-Origin', '*')
#
# app.add_route('/role', Role())

if __name__ == '__main__':
    from wsgiref import simple_server
    httpd = simple_server.make_server('0.0.0.0', 8000, app)
    httpd.serve_forever()
