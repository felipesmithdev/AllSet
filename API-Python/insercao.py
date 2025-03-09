import psutil  
from mysql.connector import connection
import time
from mysql.connector import errorcode, Error

print("Bom dia, bem vindo a API da AllSet")

def converter_bytes(bytes):
    if(bytes <= 0):
        return 0;
    conversao = round(float((bytes)/ (1024 ** 3)), 2)
    return conversao

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

    mydb = connection.MySQLConnection ( 
        host="10.18.32.182",
        user="insertAllSet",
        password="Insert123",
        database="allset")
    mycursor = mydb.cursor()

    print("Database connection made!")

    while True:

        porcentagem = psutil.cpu_percent(interval=1)
        discoUso = psutil.disk_usage('C:\\')
        armTotal = converter_bytes(discoUso.total)
        armUsado = converter_bytes(discoUso.used)
        memoriaVirtual = psutil.virtual_memory()
        RAMtotal = converter_bytes(memoriaVirtual.total)
        RAMusado = converter_bytes(memoriaVirtual.used)
        bateriaSensor = psutil.sensors_battery()

        novaMetrica = (
            "INSERT INTO medicao "
            "(cpuPercentual, memoria1Bytes, memoria1Percentual, ramPercentual, ramBytes, bateriaPercentual, dtHora, fkComputador)" 
            "VALUES ( %(numero)s, %(armTotal)s, %(armUsado)s, %(RAMtotal)s, %(RAMusado)s, %(bateriaSensor)s, NOW(), 4);"
        )
        
        dadosMetrica = {
        'numero': porcentagem,
        'armTotal': armTotal,
        'armUsado': armUsado,
        'RAMtotal': RAMtotal,
        'RAMusado': RAMusado,
        'bateriaSensor': bateriaSensor.percent
        }
        print(dadosMetrica)
        try:
            mycursor.execute(novaMetrica, dadosMetrica)
            mydb.commit()
            print("Dados inseridos com sucesso!")
        except Error as e:
            print(f"Erro ao inserir dados: {e}")
        
        if infinito == False:
            break
    
        time.sleep(5)

iniciacao()