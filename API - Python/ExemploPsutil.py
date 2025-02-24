import psutil
import time
from mysql.connector import (connection)
from datetime import datetime

cnx = connection.MySQLConnection(
    host="localhost",
    user="root",
    password="",
    database=""
)

cur = cnx.cursor()

while True:
    cpuPercent = psutil.cpu_percent(interval=1)
    cpuTimes = psutil.cpu_times(percpu=False)
    bateriaSensor = psutil.sensors_battery()
    discoUso = psutil.disk_usage('C:\\')
    memoriaVirtual = psutil.virtual_memory()
    cpuUserMinuto = cpuTimes.user / 60
    cpuSistemaMinuto = cpuTimes.system / 60
    cpuOciosoMinuto = cpuTimes.idle / 6
    tempoDescarregar = bateriaSensor.secsleft
    computadorPlugado = 'não'
    armTotal = discoUso.total / 1000000000
    armUsado = discoUso.used / 1000000000
    armLivre = discoUso.free / 1000000000
    RAMtotal = memoriaVirtual.total / 1000000000
    RAMusado = memoriaVirtual.used / 1000000000
    RAMusadoPercent = memoriaVirtual.percent
    RAMdisponivel = memoriaVirtual.available / 100000000
    if tempoDescarregar < 0:
        computadorPlugado = 'sim'
    print(
        f"Tempo gasto pelo usuário: {cpuUserMinuto:.2f} minutos\n"
        f"tempo gasto pelo sistema: {cpuSistemaMinuto:.2f} minutos \n"
        f"Tempo de CPU ociosa: {cpuOciosoMinuto:.2f} minutos\n"
        f"Porcentagem da bateria: {bateriaSensor.percent}%\n"
        f"Computador esta conectado na tomada? {computadorPlugado}\n"
        f"Quantidade total de espaço no disco: {armTotal:.2f} GB\n"
        f"Quantidade de espaço utilizado no disco: {armUsado:.2f} GB\n"
        f"Quantidade de espaço livre no disco: {armLivre:.2f} GB\n"
        f"Quantidade de memoria RAM total: {RAMtotal:.1f} GB\n"
        f"Quantidade de memoria RAM utilizado: {RAMusado:.1f} | {RAMusadoPercent:.1f}% \n"
        f"Quantidade de memoria RAM disponivel: {RAMdisponivel:.1f} GB\n"
        f"Porcentagem de utilização da CPU: {cpuPercent}%\n"
        "\n\n\n")
    dataRegistro = datetime.now()
    sql = "INSERT INTO registros (dataRegistro, utilizacaoCPU_Percent, utilizacaoRAM_Percent, utilizacaoARM_GB, bateria_Percent, fkVeiculo) VALUES (%s, %s,%s,%s,%s,1)"
    valores = [dataRegistro, cpuPercent, RAMusadoPercent, armUsado, bateriaSensor.percent]
    cur.execute(sql, valores)
    cnx.commit()
    time.sleep(2)
