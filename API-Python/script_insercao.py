import psutil
import mysql.connector
import time
from datetime import datetime
import pandas as pd
import requests
import json
import boto3
from datetime import timedelta
from jira import JIRA
from config import JIRA_URL, JIRA_TOKEN, JIRA_USER
from config import BANCO_RELACIONAL, BANCO_CAPTURAS
from config import AWS_SECRET_KEY, AWS_KEY_ID, AWS_TOKEN

#carregando o dotenv
def conectar(banco):
    if banco == 'relacional':
        return mysql.connector.connect(
        host= BANCO_RELACIONAL['host'],
        port= int(BANCO_RELACIONAL['port']),
        user= BANCO_RELACIONAL['user'],
        password= BANCO_RELACIONAL['password'],
        database= BANCO_RELACIONAL['database']
    )
    elif banco == 'capturas':
        return mysql.connector.connect(
        host= BANCO_CAPTURAS['host'],
        port= int(BANCO_CAPTURAS['port']),
        user= BANCO_CAPTURAS['user'],
        password= BANCO_CAPTURAS['password'],
        database= BANCO_CAPTURAS['database']
    )

def getEnderecoMAC():
    interfaces = psutil.net_if_addrs()
    stats = psutil.net_if_stats()
    
    for nome_iface, enderecos in interfaces.items():
        if nome_iface in stats and stats[nome_iface].isup:  # Verifica se está ativa
            for endereco in enderecos:
                if endereco.family == psutil.AF_LINK:
                    mac = endereco.address
                    if mac and mac != "00:00:00:00:00:00" and \
                       (":" in mac or "-" in mac):
                        return mac.replace(":", "").replace("-", "")
    
    return 'NadaEncontrado'

lote = 6
mac = getEnderecoMAC()
print(mac)

def inserirSelecionarLoteDoCarro(mac):
    conn = conectar(banco='relacional')
    cursor = conn.cursor()
    query1 = 'SELECT fk_lote FROM carro WHERE macadress = %s'
    cursor.execute(query1, (mac,))
    resultado = cursor.fetchone()
    if resultado:
        lote = resultado[0]
        print("Lote encontrado, Lote: ", lote)
    else:
        query = 'INSERT IGNORE INTO carro(marca, ano, sistema_operacional, macadress, fk_lote) VALUES' \
            '(%s,%s,%s,%s,%s)'
        cursor.execute(query, ("BMW", 2018, "Ubuntu", mac, 6))
        print("Carro cadastrado com sucesso, Lote: 6")
    conn.commit()
    conn.close()

inserirSelecionarLoteDoCarro(mac)



jira = JIRA(
    server= JIRA_URL,
    basic_auth=(JIRA_USER, JIRA_TOKEN)
)

def abrir_chamado(summary_jira, description, priority):
    issue_dict = {
        'project': {'key': 'AL'},
        'summary': f"Limite de {summary_jira} atingido", 
        'description': f"Limite de {summary_jira} atingido, valor da captura: {description}",
        'issuetype': {'name': 'General Request'},
        'priority': {'name': priority},
        'customfield_10091': f"Lote {lote}",
    }
    nova_issue = jira.create_issue(fields=issue_dict)
    print("Chamado aberto: ", [nova_issue.key])
    # prioridade normal, instavel e grave (High, Medium, Low)


#estou criando uma lista vazia, assim consigo armazenar as info.
dados_monitoramento = []

# configurando o boto3
# s3 = boto3.client(
# 's3',
# aws_access_key_id = f'{AWS_KEY_ID}',
# aws_secret_access_key= f'{AWS_SECRET_KEY}',
# aws_session_token= f'{AWS_TOKEN}',
# region_name='us-east-1'  
# )

nome_do_json = f"monitoramento_{mac}_{datetime.now().strftime('%d-%m-%Y_%Hhrs%Mmin%Ss')}.json"

def registrarChamado(summary_jira, valor, prioridade):
    abrir_chamado(summary_jira, valor, prioridade)
    banco = 'relacional'
    conn = conectar(banco)
    cursor = conn.cursor()
    query = "INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES (%s, %s, now(), %s, 1,  %s)"
    cursor.execute(query, (summary_jira, valor, prioridade, mac))
    
    conn.commit()
    cursor.close()
    conn.close()

# Dicionário para armazenar o horário do último alerta por componente
ultimo_alerta_por_componente = {
    "cpu": None,
    "ram": None,
    "disco": None
}

def pode_enviar_alerta(componente):
    agora = datetime.now()
    ultimo_alerta = ultimo_alerta_por_componente[componente]

    if ultimo_alerta is None:
        return True
    elif agora - ultimo_alerta >= timedelta(minutes=1):  # Espera de 1 minuto
        return True
    return False

def atualizar_tempo_alerta(componente):
    ultimo_alerta_por_componente[componente] = datetime.now()

i = 0
while True:
    discoUso = psutil.disk_usage("/").used
    porcentagemDisco = psutil.disk_usage("/").percent
    porcentagemCpu = psutil.cpu_percent(interval=0, percpu=False)
    ramUso = psutil.virtual_memory().used
    porcentagemRam = psutil.virtual_memory().percent
    hrCaptura = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    
    for processos in psutil.process_iter(['name']):
        if 'python' in processos.name().lower():
            print('Processo encontrado:', processos.name())

    # ALERTAS CPU
    if 70 <= porcentagemCpu <= 84:
        summary_jira = "cpu"
        priority = "Medium"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemCpu, priority)
            atualizar_tempo_alerta(summary_jira)
    elif 85 <= porcentagemCpu <= 100:
        summary_jira = "cpu"
        priority = "High"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemCpu, priority)
            atualizar_tempo_alerta(summary_jira)

    # ALERTAS RAM
    if 70 <= porcentagemRam <= 84:
        summary_jira = "ram"
        priority = "Medium"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemRam, priority)
            atualizar_tempo_alerta(summary_jira)
    elif 85 <= porcentagemRam <= 100:
        summary_jira = "ram"
        priority = "High"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemRam, priority)
            atualizar_tempo_alerta(summary_jira)

    # ALERTAS DISCO
    if 70 <= porcentagemDisco <= 84:
        summary_jira = "disco"
        priority = "Medium"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemDisco, priority)
            atualizar_tempo_alerta(summary_jira)
    elif 85 <= porcentagemDisco <= 100:
        summary_jira = "disco"
        priority = "High"
        if pode_enviar_alerta(summary_jira):
            registrarChamado(summary_jira, porcentagemDisco, priority)
            atualizar_tempo_alerta(summary_jira)

    # Adicionar dados de monitoramento à lista
    dados_monitoramento.append({
        "discoUso": discoUso,
        "porcentagemDisco": porcentagemDisco,
        "porcentagemCpu": porcentagemCpu,
        "ramUso": ramUso,
        "porcentagemRam": porcentagemRam,
        "hrCaptura": hrCaptura,
        "macAdress": mac,
        "Lote": lote
    })

    # Dados para mandar em tempo real para a requisição do node
    dados = {
        "macadress": mac,
        "dadosCaptura": {
            "percentual_disco": porcentagemDisco,
            "percentual_cpu": porcentagemCpu,
            "percentual_ram": porcentagemRam,
            "dataHora": hrCaptura
        }
    }


    try:
        res = requests.post(
            f"http://localhost:8080/seguranca/cadastrar/dados/{mac}",
            data=json.dumps(dados),
            headers={'Content-Type': 'application/json'}
        )
        print("Status:", res.status_code)
        # print("Resposta:", res.text)
    except Exception as e:
        print("Erro ao enviar dados:", e)



    print("\n", "Percentual do disco: ", porcentagemDisco, "\n", 
          "Percentual da cpu: ", porcentagemCpu, "\n", 
          "Percentual da ram: ", porcentagemRam, "\n", 
          "DataHora da captura: ", hrCaptura, "\n")

    # nome_bucket = 'raw-allset'
    # nome_no_s3 = f"{nome_do_json}"

    # if i != 0 and i % 100 == 0:
    #     df = pd.DataFrame(dados_monitoramento)
    #     df.to_json(nome_do_json, orient="records", indent=4)
    #     print(f"Salvo em {nome_do_json}")

    #     try:
    #         s3.upload_file(nome_do_json, nome_bucket, nome_no_s3)
    #         print(f"Arquivo '{nome_do_json}' enviado com sucesso para S3 em '{nome_no_s3}'")
    #     except Exception as e:
    #         print(f"Erro ao enviar para o S3: {e}")

    #     break
            

    time.sleep(10)
    i += 1