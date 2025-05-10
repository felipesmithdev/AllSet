from dotenv import load_dotenv
import os
load_dotenv()

# esse trecho aqui vai localizar o .env na nossa pasta raiz do projeto
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '.env'))

# configuração para o banco relacional (só para enviar alertas)
BANCO_RELACIONAL = {
    'host': os.getenv('banco_relacional_HOST'),
    'port': os.getenv('banco_relacional_PORT'),
    'database': os.getenv('banco_relacional_DATABASE'),
    'user': os.getenv('banco_relacional_USER'),
    'password': os.getenv('banco_relacional_PASSWORD')
}

BANCO_CAPTURAS = {
    'host': os.getenv('banco_capturas_HOST'),
    'port': os.getenv('banco_capturas_PORT'),
    'database': os.getenv('banco_capturas_DATABASE'),
    'user': os.getenv('banco_capturas_USER'),
    'password': os.getenv('banco_capturas_PASSWORD')
}

# credenciais do jira
JIRA_URL = os.getenv('JIRA_URL')
JIRA_USER = os.getenv('JIRA_USER')
JIRA_TOKEN = os.getenv('JIRA_TOKEN')

# credenciais da aws
AWS_KEY_ID = os.getenv('AWS_KEY_ID'),
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY'),
AWS_TOKEN = os.getenv('AWS_TOKEN'),


# EXEMPLO DO .ENV QUE PRECISA SER CRIADO ( TO SENDO GENEROSO FAZENDO ISSO)
# Banco relacional (alertas)
# banco_relacional_HOST = 
# banco_relacional_PORT = 
# banco_relacional_DATABASE = 
# banco_relacional_USER = 
# banco_relacional_PASSWORD = 

# # Banco relacional (capturas)
# banco_capturas_HOST = 
# banco_capturas_PORT = 3306
# banco_capturas_DATABASE = 
# banco_capturas_USER = 
# banco_capturas_PASSWORD = 

# # Jira
# JIRA_USER = email jira
# JIRA_TOKEN =  token gira
# JIRA_URL = "https://allsetsupport.atlassian.net"


# # AWS
# AWS_KEY_ID = AWS_KEY_ID
# AWS_SECRET_KEY = AWS_SECRET_KEY
# AWS_TOKEN = AWS_TOKEN