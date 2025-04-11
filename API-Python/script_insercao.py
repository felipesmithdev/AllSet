import psutil
import mysql.connector
import time

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="urubu100",
        database="allSet"
    )

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
   
    print(i, discoUso, porcentagemDisco, porcentagemCpu, frequenciaCpu, ramUso, porcentagemRam, porcentagemBateria)

    time.sleep(3.5)
    conn.commit()
        
