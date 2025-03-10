import psutil  
from mysql.connector import connection, errorcode, Error
import time

print("Bom dia, bem vindo a API da AllSet")

def converter_bytes(bytes):
    if(bytes <= 0):
        return 0
    conversao = round(float((bytes)/ (1024 ** 3)), 2)
    return conversao

def iniciacao():
        
        while True:
            try:
                oQueFazer = int(input("Deseja salvar apenas uma vez (1) ou rodar o programa infinitamente (2)? Caso deseje cancelar, digite 0: \n"))
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

def qualCarro():
    
    informacaoNet = psutil.net_if_addrs()
        # Informações relacionadas a dados da Net, por exemplo IPV4, o que queremos nesse caso é o endereço MAC

    for interface, enderecos in informacaoNet.items():
        # Está buscando os endereços
        for endereco in enderecos:
            if endereco.family == psutil.AF_LINK:  # AF_LINK representa o MAC Address
                # Aqui é o que tem que mudar pra pegar o MAC, pra pegar o IPV4 por exemplo seria: psutil.AF_INET ou colocando o 6 no final para pegar o IPV6
                return endereco.address
    
    return 'NadaEncontrado'

def conecao(tipo):

    if (tipo == 'Select'):
         
        mydb = connection.MySQLConnection ( 
        host="localhost",
        user="selectAllSet",
        password="Select123",
        database="allset")
                
        print("Database select - connection made!")

        return(mydb)

    elif (tipo == 'Insert'):

        mydb = connection.MySQLConnection ( 
        host="localhost",
        user="insertAllSet",
        password="Insert123",
        database="allset")

        print("Database insert - connection made!")

        return(mydb)

def bancoDeDados(infinito):

    mydb = conecao('Select')
    mycursor = mydb.cursor()

    informacaoCarro = qualCarro()
    
    sql = "SELECT nome, medida, limiarAlerta FROM componente WHERE fkCarro = %s;"
    valores = (
        informacaoCarro,
            )

    mycursor.execute()

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