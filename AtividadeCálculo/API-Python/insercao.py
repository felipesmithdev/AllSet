import psutil  
import mysql.connector
import time
from mysql.connector import errorcode

print("Bom dia, bem vindo a API da AllSet")

def iniciacao():
        
        while True:
            try:
                oQueFazer = int(input("Deseja salvar apenas uma vez (1) ou rodar o programa indefinidamente (2)? Caso deseje cancelar, digite 0: \n"))
                if oQueFazer in [0, 1, 2]:
                    break
                else:
                    print("Opção inválida! Digite 0, 1 ou 2.")
            except ValueError:
                print("Entrada inválida! Digite um número válido.")

        if oQueFazer == 0:
            return
        elif oQueFazer == 1:
            bancoDeDados(False)
        elif oQueFazer == 2:
            bancoDeDados(True)

def bancoDeDados(infinito):

    mydb = mysql.connector.connect(
        host="localhost",
        user="selectAllSet",
        password="select123",
        database="allSetPython"
    )

    mycursor = mydb.cursor()

    print("Database connection made!")

    while True:

        porcentagem = psutil.cpu_percent(interval=1)
        discoUso = psutil.disk_usage('C:\\')
        armTotal = discoUso.total / 1000000000
        armUsado = discoUso.used / 1000000000
        memoriaVirtual = psutil.virtual_memory()
        RAMtotal = memoriaVirtual.total / 1000000000
        RAMusado = memoriaVirtual.used / 1000000000
        bateriaSensor = psutil.sensors_battery()

        novaMetrica = (
            "INSERT INTO medicao "
            "(cpuPercentual, memoria1Bytes, memoria1Percentual, ramPercentual, ramBytes, bateriaPercentual, dtHora)" 
            "VALUES ( %(numero)s, %(armTotal)s, %(armUsado)s, %(RAMtotal)s, %(RAMusado)s, %(bateriaSensor)s, NOW() );"
        )

        dadosMetrica = {
        'numero': porcentagem,
        'armTotal': armTotal,
        'armUsado': armUsado,
        'RAMtotal': RAMtotal,
        'RAMusado': RAMusado,
        'bateriaSensor': bateriaSensor.percent
        }

        try:
            mycursor.execute(novaMetrica, dadosMetrica)
            mydb.commit()
            print("Dados inseridos com sucesso!")
        except:
            print(f"Erro ao inserir dados")
        
        if infinito == False:
            break
    
        time.sleep(5)

iniciacao()