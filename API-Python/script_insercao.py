import psutil
import mysql.connector
import time
from datetime import datetime
import pandas as pd
import boto3
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

jira = JIRA(
    server= JIRA_URL,
    basic_auth=(JIRA_USER, JIRA_TOKEN)
)

def abrir_chamado(summary_jira, description, priority):
    issue_dict = {
        'project': {'key': 'AL'},
        'summary': f"Limite de {summary_jira} atingido", 
        'description': f"Limite de {summary_jira} atingido, valor da captura: {description}",
        'issuetype': {'name': 'Tarefa'},
        'priority': {'name': priority},
        'customfield_10058': 'Lote 2025-A',  # esses dois customfield eu nao entendi como configura no jira, usei o default
        'customfield_10059': 'Memória RAM - 16GB', 
    }
    nova_issue = jira.create_issue(fields=issue_dict)
    print("Chamado aberto: ", [nova_issue.key])
    # prioridade normal, instavel e grave (High, Medium, Low)


#estou criando uma lista vazia, assim consigo armazenar as info.
dados_monitoramento = []

def getEnderecoMAC():
    informacaoNet = psutil.net_if_addrs()
    
    for nome_iface, lista_enderecos in informacaoNet.items():
        for endereco in lista_enderecos:
            if endereco.family == psutil.AF_LINK:
                if ":" in endereco.address:
                    return endereco.address.replace(":", "")
                elif "-" in endereco.address:
                    return endereco.address.replace("-", "")
    
    return 'NadaEncontrado'

#configurando o boto3
# s3 = boto3.client(
# 's3',
# aws_access_key_id = f'{AWS_KEY_ID}',
# aws_secret_access_key= f'{AWS_SECRET_KEY}',
# aws_session_token= f'{AWS_TOKEN}',
# region_name='us-east-1'  
# )

#usando uma variável mac
mac = getEnderecoMAC()
nome_do_json = f"monitoramento_{mac}_{datetime.now().strftime('%d-%m-%Y_%Hhrs%Mmin%Ss')}.json"

def registrarChamado(summary_jira, valor, prioridade):
        abrir_chamado(summary_jira, valor, prioridade)
        banco = 'relacional'
        conn = conectar(banco)
        cursor = conn.cursor()
        query = "INSERT INTO alerta (componente, valor, dt_registro, fk_carro_macadress) VALUES (%s, %s, now(), %s)"
        cursor.execute(query, (summary_jira, valor, mac))
        
        conn.commit()
        cursor.close()
        conn.close()

i = 0
while True:
    discoUso = psutil.disk_usage("/").used
    porcentagemDisco = psutil.disk_usage("/").percent
    porcentagemCpu = psutil.cpu_percent(interval=0, percpu=False)
    ramUso = psutil.virtual_memory().used
    porcentagemRam = psutil.virtual_memory().percent
    hrCaptura = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    # for processos in psutil.process_iter(['name']):
    #     if 'python' in processos.name().lower():
    #         print('Processo encontrado:',processos.name())

# abrir chamado cpu
    if porcentagemCpu >= 50 and porcentagemCpu <= 65:
        summary_jira = "cpu"
        priority = "Low"
        registrarChamado(summary_jira, porcentagemCpu, priority)
    elif porcentagemCpu >= 66 and porcentagemCpu <= 80:
        summary_jira = "cpu"
        priority = "Medium"
        registrarChamado(summary_jira, porcentagemCpu, priority)
    elif porcentagemCpu >= 81 and porcentagemCpu <= 100:
        summary_jira = "cpu"
        priority = "High"
        registrarChamado(summary_jira, porcentagemCpu, priority)
    
# abrir chamado ram
    if porcentagemRam >= 60 and porcentagemRam <= 70:
        summary_jira = "ram"
        priority = "Low"
        registrarChamado(summary_jira, porcentagemRam, priority)
    elif porcentagemRam >= 71 and porcentagemRam <= 80:
        summary_jira = "ram"
        priority = "Medium"
        registrarChamado(summary_jira, porcentagemRam, priority)
    elif porcentagemRam >= 81 and porcentagemRam <= 100:
        summary_jira = "ram"
        priority = "High"
        registrarChamado(summary_jira, porcentagemRam, priority)

# abrir chamado disco
    if porcentagemDisco >= 70 and porcentagemDisco <= 80:
        summary_jira = "disco"
        priority = "Low"
        registrarChamado(summary_jira, porcentagemDisco, priority)
    elif porcentagemDisco >= 81 and porcentagemDisco <= 90:
        summary_jira = "disco"
        priority = "Medium"
        registrarChamado(summary_jira, porcentagemDisco, priority)
    elif porcentagemDisco >= 91 and porcentagemDisco <= 100:
        summary_jira = "disco"
        priority = "High"
        registrarChamado(summary_jira, porcentagemDisco, priority)

# ENVIANDO PARA O BANCO DE CAPTURAS (BANCO QUE O JOÃO IRÁ USAR)
    try:
        banco = 'capturas'
        conn = conectar(banco)
        cursor = conn.cursor()
        query = (
            "INSERT INTO captura (lote, componente, valor, dt_captura) VALUES "
            "(1, 'cpu', %s, NOW()), "
            "(1, 'ram', %s, NOW()), "
            "(1, 'disco', %s, NOW())"
        )
        cursor.execute(query, (porcentagemCpu, porcentagemRam, porcentagemDisco))
        conn.commit()
        cursor.close()
        conn.close()
        print("ENVIANDO PARA O BANCO DE CAPTURA (pelo amor de deus funciona agora)")
    except Exception as e:
        print(f"Erro ao inserir no banco: {e}")

    #agora vou adicionar um dicionário com os dados coletados na lista que eu criei no começo do codigo
    #ele não esta retornando nada, só modificando a lista original e acumulando os dados
    dados_monitoramento.append({
        "discoUso": discoUso,
        "porcentagemDisco": porcentagemDisco,
        "porcentagemCpu": porcentagemCpu,
        "ramUso": ramUso,
        "porcentagemRam": porcentagemRam,
        "hrCaptura": hrCaptura
    })
   
    print(porcentagemDisco, porcentagemCpu, porcentagemRam, hrCaptura)

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