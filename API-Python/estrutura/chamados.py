from estrutura.conectar import conectarJira
from estrutura.conectar import conectar
from estrutura.getMacLote import lote
from estrutura.config import AWS_KEY_ID, AWS_SECRET_KEY, AWS_TOKEN
import boto3


def abrir_chamado(summary_jira, description, priority):
    jira = conectarJira()
    issue_dict = {
        "project": {"key": "AS"},
        "summary": f"Limite de {summary_jira} atingido",
        "description": f"Limite de {summary_jira} atingido, valor da captura: {description}",
        "issuetype": {"name": "General Request"},
        "priority": {"name": priority},
        "customfield_10056": f"Lote {lote}",
    }
    nova_issue = jira.create_issue(fields=issue_dict)
    print("Chamado aberto: ", [nova_issue.key])


def registrarChamado(summary_jira, valor, prioridade, mac):
    print(mac)
    abrir_chamado(summary_jira, valor, prioridade)
    conn = conectar()
    cursor = conn.cursor()
    query = "INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES (%s, %s, now(), %s, 1,  %s)"
    cursor.execute(query, (summary_jira, valor, prioridade, mac))

    conn.commit()
    cursor.close()
    conn.close()


# Cliente S3
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_KEY,
    aws_session_token=AWS_TOKEN,
    region_name="us-east-1",
)


def enviar_para_s3(nome_arquivo_local, bucket, nome_no_s3):
    try:
        s3.upload_file(nome_arquivo_local, bucket, nome_no_s3)
        print(
            f"Arquivo '{nome_arquivo_local}' enviado com sucesso para S3 em '{nome_no_s3}'"
        )
    except Exception as e:
        print(f"Erro ao enviar para o S3: {e}")
