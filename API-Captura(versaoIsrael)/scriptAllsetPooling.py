import psutil
import time
from datetime import datetime
from mysql.connector import pooling, Error
from statistics import mean

dbconfig = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "MyAdmin@Israel11",
    "database": "allsetPython"
}
cnxpool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

def capturarVelocidadeDoWifi(interface):
    statusRede = psutil.net_if_stats().get(interface)
    if statusRede and statusRede.isup:
        return statusRede.speed
    return 0

def capturarEspacoArmazenamento(diretorio):
    discoUso = psutil.disk_usage(diretorio)
    armTotal = discoUso.total / 1024**3
    armUsado = discoUso.used / 1024**3
    armUsadoPercent = discoUso.percent
    armLivre = discoUso.free / 1024**3
    armLivrePercent = 100 - discoUso.percent
    return armTotal, armUsado, armUsadoPercent, armLivre, armLivrePercent

def capturarRAM():
    memoriaVirtual = psutil.virtual_memory()
    RAMtotal = memoriaVirtual.total / 1024**3
    RAMusado = memoriaVirtual.used / 1024**3
    RAMusadoPercent = memoriaVirtual.percent
    RAMdisponivel = memoriaVirtual.available / 1024**3
    return RAMtotal, RAMusado, RAMusadoPercent, RAMdisponivel

def capturarCPU(intervalo):
    cpuPercent = psutil.cpu_percent(interval=intervalo)
    tempoCPU = psutil.cpu_times(percpu=False)
    cpuUserMinuto = tempoCPU.user / 60
    cpuSistemaMinuto = tempoCPU.system / 60
    cpuOciosoMinuto = tempoCPU.idle / 60
    return cpuPercent, cpuUserMinuto, cpuSistemaMinuto, cpuOciosoMinuto

def verificarCriticidade(cpuPercent, RAMusadoPercent, armUsadoPercent, velRede):
    dataHoraAtual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if cpuPercent > 70:
        inserirNoBanco('registrosCriticos', cpuPercent, 'cpu', dataHoraAtual)
    if RAMusadoPercent > 80:
        inserirNoBanco('registrosCriticos', RAMusadoPercent, 'ram', dataHoraAtual)
    if armUsadoPercent > 80:
        inserirNoBanco('registrosCriticos', armUsadoPercent, 'armazenamento', dataHoraAtual)
    if velRede < 100:
        inserirNoBanco('registrosCriticos', velRede, 'rede', dataHoraAtual)

def realizarMediaDosRegistros(listaVelRede, listaArmPercentLivre, listaRAMusadoPercent, listaCPUpercent):
    dataHoraAtual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    mediaVelRede = mean(listaVelRede)
    mediaArmPercentLivre = mean(listaArmPercentLivre)
    mediaRAMusadoPercent = mean(listaRAMusadoPercent)
    mediaCPUpercent = mean(listaCPUpercent)

    inserirNoBanco('mediasRegistros', mediaVelRede, mediaArmPercentLivre, mediaRAMusadoPercent, mediaCPUpercent, dataHoraAtual, tipo='media')

def inserirNoBanco(nomeTabela, valor1, valor2, valor3, valor4=None, dataHora=None, tipo='critico'):
    try:
        connection = cnxpool.get_connection()
        cursor = connection.cursor()
        if tipo == 'critico':
            sql = f"INSERT INTO {nomeTabela} (valor, componente, dataHora) VALUES (%s, %s, %s)"
            val = (valor1, valor2, valor3)
        elif tipo == 'media':
            sql = f"INSERT INTO {nomeTabela} (mediaVelRede, mediaArmPercentLivre, mediaRAMusadoPercent, mediaCPUpercent, dataHora) VALUES (%s, %s, %s, %s, %s)"
            val = (valor1, valor2, valor3, valor4, dataHora)
        cursor.execute(sql, val)
        connection.commit()
        print(f"Dados inseridos com sucesso na tabela {nomeTabela}!")
    except Error as e:
        print(f"Erro ao inserir dado no banco de dados: {e}")
    finally:
        cursor.close()
        connection.close()

def main(intervaloChecagem=10):
    listaVelRede = []
    listaArmPercentLivre = []
    listaRAMusadoPercent = []
    listaCPUpercent = []

    while True:
        velRede = capturarVelocidadeDoWifi("Wi-Fi 3")
        armTotal, armUsado, armUsadoPercent, armLivre, armLivrePercent = capturarEspacoArmazenamento('C:\\')
        RAMtotal, RAMusado, RAMusadoPercent, RAMdisponivel = capturarRAM()
        cpuPercent, cpuUserMinuto, cpuSistemaMinuto, cpuOciosoMinuto = capturarCPU(1)
        
        listaVelRede.append(velRede)
        listaArmPercentLivre.append(armLivrePercent)
        listaRAMusadoPercent.append(RAMusadoPercent)
        listaCPUpercent.append(cpuPercent)

        verificarCriticidade(cpuPercent, RAMusadoPercent, armUsadoPercent, velRede)

        if len(listaVelRede) >= intervaloChecagem:
            realizarMediaDosRegistros(listaVelRede, listaArmPercentLivre, listaRAMusadoPercent, listaCPUpercent)

            listaVelRede.clear()
            listaArmPercentLivre.clear()
            listaRAMusadoPercent.clear()
            listaCPUpercent.clear()

        time.sleep(1)

main()
