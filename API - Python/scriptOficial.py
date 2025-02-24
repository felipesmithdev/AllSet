import psutil
import time
from mysql.connector import pooling, Error, connection

cnx = connection.MySQLConnection(
    host="localhost",
    user="allSetinho",
    password="Allset@Inserir",
    database="Allset"
)

cnxpool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **cnx)
connection = cnxpool.get_connection()

cursor = cnx.cursor()

def inserir():
    try:
        while True:
            cpuPercent = psutil.cpu_percent(interval=1)
            cpuTimes = psutil.cpu_times(percpu=False)
            bateriaSensor = psutil.sensors_battery()
            discoUso = psutil.disk_usage('C:\\')
            memoriaVirtual = psutil.virtual_memory()

            cpuUserMinuto = cpuTimes.user / 60
            cpuSistemaMinuto = cpuTimes.system / 60
            cpuOciosoMinuto = cpuTimes.idle / 60

            tempoDescarregar = bateriaSensor.secsleft
            computadorPlugado = 0
            if tempoDescarregar < 0:
                computadorPlugado = 1

            armTotal = discoUso.total / 1000000000
            armUsado = discoUso.used / 1000000000
            armLivre = discoUso.free / 1000000000
            RAMtotal = memoriaVirtual.total / 1000000000
            RAMusado = memoriaVirtual.used / 1000000000
            RAMusadoPercent = memoriaVirtual.percent
            RAMdisponivel = memoriaVirtual.available / 1000000000

            query = """
            INSERT INTO registrosCapturados (
                cpuUsersMin, 
                cpuOciosaMin, 
                pctgBateria,
                pcPlugTomada,
                qtdTotalEspacoDisco,
                qtdUsadaEspacoDisco,
                qtdLivreEspacoDisco,
                ramTotal,
                ramUsada,
                ramUsadaPctg,
                ramDisponivel,
                pctgCpuUsada
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
            """
            data = (
                cpuUserMinuto,
                cpuOciosoMinuto,
                bateriaSensor.percent,
                computadorPlugado,
                armTotal,
                armUsado,
                armLivre,
                RAMtotal,
                RAMusado,
                RAMusadoPercent,
                RAMdisponivel,
                cpuPercent
            )

            cursor.execute(query, data)
            connection.commit()
            cursor.close()
            connection.close()

            print(
                f"Tempo gasto pelo usuário: {cpuUserMinuto:.2f} minutos\n"
                f"Tempo gasto pelo sistema: {cpuSistemaMinuto:.2f} minutos \n"
                f"Tempo de CPU ociosa: {cpuOciosoMinuto:.2f} minutos\n"
                f"Porcentagem da bateria: {bateriaSensor.percent}%\n"
                f"Computador está conectado na tomada? {'sim' if computadorPlugado else 'não'}\n"
                f"Quantidade total de espaço no disco: {armTotal:.2f} GB\n"
                f"Quantidade de espaço utilizado no disco: {armUsado:.2f} GB\n"
                f"Quantidade de espaço livre no disco: {armLivre:.2f} GB\n"
                f"Quantidade de memória RAM total: {RAMtotal:.1f} GB\n"
                f"Quantidade de memória RAM utilizada: {RAMusado:.1f} | {RAMusadoPercent:.1f}% \n"
                f"Quantidade de memória RAM disponível: {RAMdisponivel:.1f} GB\n"
                f"Porcentagem de utilização da CPU: {cpuPercent}%\n"
            )

            time.sleep(2)
    except Error as e:
        print(f"Erro no banco de dados: {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

inserir()