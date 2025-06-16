import mysql.connector
from estrutura.config import BANCO_RELACIONAL
from estrutura.config import JIRA_URL, JIRA_TOKEN, JIRA_USER
from jira import JIRA


# conectando com o banco de dados
def conectar():
    return mysql.connector.connect(
        host=BANCO_RELACIONAL["host"],
        port=int(BANCO_RELACIONAL["port"]),
        user=BANCO_RELACIONAL["user"],
        password=BANCO_RELACIONAL["password"],
        database=BANCO_RELACIONAL["database"],
    )


def conectarJira():
    jira = JIRA(server=JIRA_URL, basic_auth=(JIRA_USER, JIRA_TOKEN))
    return jira
