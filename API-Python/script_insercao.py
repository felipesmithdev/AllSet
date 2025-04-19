import psutil
import mysql.connector
import time
import pandas as pd
import boto3

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="urubu100",
        database="allSet"
    )

#estou criando uma lista vazia, assim consigo armazenar as info.
dados_monitoramento = []

def getEnderecoMAC():
    informacaoNet = psutil.net_if_addrs()
    for enderecos in informacaoNet.items():

        for endereco in enderecos:
            if endereco.family == psutil.AF_LINK:
           
                if ":" in endereco.address:
                    macArrumado = endereco.address.replace(":", "")
                elif "-" in endereco.address:
                    macArrumado = endereco.address.replace("-", "")
                return macArrumado
   
    return 'NadaEncontrado'

#usando uma variável mac
mac = getEnderecoMAC()
nome_do_csv = f"monitoramento_{mac}.csv"

conn = conectar()
cursor = conn.cursor()
   
i = 0;
while True:
    discoUso = psutil.disk_usage("/").used
    porcentagemDisco = psutil.disk_usage("/").percent
    porcentagemCpu = psutil.cpu_percent(interval=0, percpu=False)
    frequenciaCpu = psutil.cpu_freq().current
    ramUso = psutil.virtual_memory().used
    porcentagemRam = psutil.virtual_memory().percent
    porcentagemBateria = psutil.sensors_battery().percent

    try:
        cursor.execute(
            "INSERT INTO carro_123456789ABC (discoUso, porcentagemDisco, porcentagemCpu, frequenciaCpu, ramUso, porcentagemRam, porcentagemBateria) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (discoUso, porcentagemDisco, porcentagemCpu, frequenciaCpu, ramUso, porcentagemRam, porcentagemBateria)
        )

    except Exception as e:
        print(f"Erro ao inserir no banco: {e}")

    #agora vou adicionar um dicionário com os dados coletados na lista que eu criei no começo do codigo
    #ele não esta retornando nada, só modificando a lista original e acumulando os dados
    dados_monitoramento.append({
        "discoUso": discoUso,
        "porcentagemDisco": porcentagemDisco,
        "porcentagemCpu": porcentagemCpu,
        "frequenciaCpu": frequenciaCpu,
        "ramUso": ramUso,
        "porcentagemRam": porcentagemRam,
        "porcentagemBateria": porcentagemBateria
    })
   
    print(i, discoUso, porcentagemDisco, porcentagemCpu, frequenciaCpu, ramUso, porcentagemRam, porcentagemBateria)

    #salvando o csv a cada interação
    df = pd.DataFrame(dados_monitoramento)
    df.to_csv(nome_do_csv, index=False)

    print(f"Salvo em {nome_arquivo}")

    time.sleep(3.5)
    conn.commit()
        
