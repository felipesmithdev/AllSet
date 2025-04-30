import psutil
import mysql.connector
import time
from datetime import datetime
import pandas as pd
import boto3

def conectar():
    return mysql.connector.connect(
        host="",
        port= 3306,
        user="root",
        password="urubu100",
        database="allset"
    )

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
s3 = boto3.client(
's3',
aws_access_key_id='',
aws_secret_access_key='',
aws_session_token='',
region_name='us-east-1'  
)

#usando uma variável mac
mac = getEnderecoMAC()
nome_do_json = f"monitoramento_{mac}_{datetime.now().strftime("%d-%m-%Y_%Hhrs%Mmin%Ss")}.json"

conn = conectar()
cursor = conn.cursor()

cursor.execute(
"INSERT INTO pedido_captura (fk_componente, fk_carro, dt_pedido, limite)"
"VALUES (1, 1, ""now()"", 50.0), (2, 1, ""now()"", 50.0), (3, 1, ""now()"", 50.0), (4, 1, ""now()"", 50.0), (5, 1, ""now()"", 50.0), (6, 1, ""now()"", 50.0)"
)
   
cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 1 ORDER BY id_pedido DESC LIMIT 1;")
pedido_cpu = cursor.fetchone()[0]

cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 2 ORDER BY id_pedido DESC LIMIT 1;")
pedido_ramPorcentagem = cursor.fetchone()[0]

cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 3 ORDER BY id_pedido DESC LIMIT 1;")
pedido_ramBytes = cursor.fetchone()[0]

cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 4 ORDER BY id_pedido DESC LIMIT 1;")
pedido_discoPorcentagem = cursor.fetchone()[0]

cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 5 ORDER BY id_pedido DESC LIMIT 1;")
pedido_discoBytes = cursor.fetchone()[0]

cursor.execute("SELECT id_pedido FROM pedido_captura WHERE fk_componente = 6 ORDER BY id_pedido DESC LIMIT 1;")
pedido_bateria = cursor.fetchone()[0]


i = 0;
while True:
    discoUso = psutil.disk_usage("/").used
    porcentagemDisco = psutil.disk_usage("/").percent
    porcentagemCpu = psutil.cpu_percent(interval=0, percpu=False)
    ramUso = psutil.virtual_memory().used
    porcentagemRam = psutil.virtual_memory().percent
    porcentagemBateria = psutil.sensors_battery().percent
    hrCaptura = datetime.now().strftime("%d-%m-%Y %H:%M:%S");
    for processos in psutil.process_iter(['name']):
        if 'python' in processos.name().lower():
            print('Processo encontrado:',processos.name())

    try:
        cursor.execute(
        "INSERT INTO captura_componente_n (valor, dt_captura, fk_pedido) "
        "VALUES (%s, ""now()"", %s), (%s, ""now()"", %s), (%s, ""now()"", %s), (%s, ""now()"", %s), (%s, ""now()"", %s), (%s, ""now()"", %s);",
        (porcentagemCpu, pedido_cpu, porcentagemRam, pedido_ramPorcentagem, ramUso, pedido_ramBytes, porcentagemDisco, pedido_discoPorcentagem, discoUso, pedido_discoBytes, porcentagemBateria, pedido_bateria)
        )

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
        "porcentagemBateria": porcentagemBateria,
        "hrCaptura": hrCaptura
    })
   
    print(i, discoUso, porcentagemDisco, porcentagemCpu, ramUso, porcentagemRam, porcentagemBateria, hrCaptura)

    nome_bucket = 'raw-allset'
    nome_no_s3 = f"{nome_do_json}"

    if i != 0 and i % 100 == 0:
        df = pd.DataFrame(dados_monitoramento)
        df.to_json(nome_do_json, orient="records", indent=4)
        print(f"Salvo em {nome_do_json}")

        try:
            s3.upload_file(nome_do_json, nome_bucket, nome_no_s3)
            print(f"Arquivo '{nome_do_json}' enviado com sucesso para S3 em '{nome_no_s3}'")
        except Exception as e:
            print(f"Erro ao enviar para o S3: {e}")

        break
            

    time.sleep(0)
    conn.commit()
    i += 1