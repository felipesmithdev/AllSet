import mysql.connector
from mysql.connector import errorcode

print("Seja bem vindo a API - AllSet \n")

def iniciacao():
    
    while True:
        try:
            oQueFazer = int(input("Qual computador gostaria de verificar dessa vez? (0 para cancelar, 1 - Diniz, 2 - Amanda, 3 - Israel, 4 - Guilherme, 5 - Servidor (Robert)): \n"))
            if oQueFazer in [0, 1, 2, 3, 4, 5]:  
                break
            else:
                print("Opção inválida! Digite uma das opções válidas")
        except ValueError: 
            print("Entrada inválida! Digite um número válido.")

    if oQueFazer == 0:
        return
    else:
        metricas(oQueFazer)

def metricas(computador):

    while True:

        try:
            oQueFazer = int(input("Qual componente gostaria de verificar hoje? (0 para cancelar, 1 - Disco, 2 - CPU, 3 - RAM, 4 - Bateria, 5 - Todos): \n"))
            if oQueFazer in [0, 1, 2, 3, 4, 5]:  
                break
            else:
                print("Opção inválida! Digite uma das opções válidas")
        except ValueError: 
            print("Entrada inválida! Digite um número válido.")
    
    if oQueFazer == 0:
        return

    metrica = tipoDado()    
    if metrica == "Parar":
        return

    medida = tipoMedida()
    if medida == "Parar":
        return
    
    if oQueFazer == 1:
        componente = "memoria1"
    elif oQueFazer == 2:
        metrica = "Percentual"
        componente = "cpu"
    elif oQueFazer == 3:
        componente = "ram"
    elif oQueFazer == 4:        
        metrica = "Percentual"
        componente = "bateria"
    elif oQueFazer == 5:
        componente = "todos"

    puxarDados(computador,componente, metrica, medida)

def tipoDado():

    while True:

        try: 
            oQueVerificar = int(input("Qual métrica gostaria de verificar hoje? (0 para cancelar, 1 - Percentual, 2 - Byte): \n"))
            if oQueVerificar in [0, 1, 2]:  
                break
            else:
                print("Opção inválida! Digite uma das opções válidas")
        except ValueError: 
            print("Entrada inválida! Digite um número válido.")
        
    if oQueVerificar == 0:
        return 'Parar'
    elif oQueVerificar == 1:
        return 'Percentual'
    else:
        return 'Byte'

def tipoMedida():

    while True:

        try:
            oQueFazer = int(input("Qual medida gostaria de verificar hoje? (0 para cancelar, 1 - Média dessa máquina, 2 - Média total \n"))
            if oQueFazer in [0, 1, 2]:  
                break
            else:
                print("Opção inválida! Digite uma das opções válidas")
        except ValueError: 
            print("Entrada inválida! Digite um número válido.")

    if oQueFazer == 0:
        return 'Parar'
    elif oQueFazer == 1:
        return 'máquinaAtual'
    elif oQueFazer == 2:
        return 'total' 
    
def puxarDados(computador, componente, metrica, medida):

    mydb = mysql.connector.connect(
        host="localhost",
        user="admin",
        password="14042005",
        database="allSetPython"
    )

    mycursor = mydb.cursor()


    if(metrica == "Percentual"):

        if(componente == "todos"):

            if(medida == "máquinaAtual"):
                sql = "SELECT AVG(cpuPercentual), AVG(ramPercentual), AVG(bateriaPorcentagem), AVG(memoria1Percentual) FROM medicao WHERE fkComputador = %s;"
                valores = (
                    computador,
                )
            else:
                    sql = "SELECT AVG(cpuPercentual), AVG(ramPercentual), AVG(bateriaPorcentagem), AVG(memoria1Percentual) FROM medicao group by fkComputador;"

        else :
            coluna = componente + metrica

            if(medida == "máquinaAtual"):

                sql = "SELECT AVG(%s) FROM medicao WHERE fkComputador = %s;"
                
                valores = (
                    coluna,
                    computador,
                )

            else:
                sql = "SELECT AVG(%s) FROM medicao GROUP BY fkComputador;" % (coluna,)
    else:

        if(componente == "todos"):

            if(medida == "máquinaAtual"):
                sql = "SELECT AVG(ramBytes), AVG(memoria1Bytes) FROM medicao WHERE fkComputador = %s;"
                valores = (
                    computador,
                )
            else:
                sql = "SELECT AVG(ramBytes), AVG(memoria1Bytes) FROM medicao group by fkComputador;"

        else :
            coluna = componente + metrica

            if(medida == "máquinaAtual"):

                sql = "SELECT AVG(%s) FROM medicao WHERE fkComputador = %s;"
                
                valores = (
                    coluna,
                    computador,
                )

            else:
                sql = "SELECT AVG(%s) FROM medicao GROUP BY fkComputador;" % (coluna,)
    
    mycursor.execute(sql, valores)
    resultados = mycursor.fetchall() 
    for linha in resultados:
        print(linha)
    
    mydb.commit()


    mycursor.close()
    mydb.close()

    iniciacao()

iniciacao()