# from API_Python.classes.BancoDeDados import BancoDeDados
# from API_Python.classes.Computador import Computador
# from API_Python import Computador, BancoDeDados

import time
import psutil  
from mysql.connector import connection, errorcode, Error

class BancoDeDados:
    host="localhost"
    user = None
    password = None
    database="allset"
    conexaoEstabelecida = False

    @classmethod
    def getHost(cls):
        return cls.host

    @classmethod
    def setHost(cls, host):
        host = host
 
    @classmethod
    def setUsuario(cls, tipo):

        if tipo == "Select":
            cls.user = "selectAllSet"
            cls.password = "Select123"
        
        elif tipo == "Insert":
            cls.user = "insertAllSet"
            cls.password = "Insert123"
    
    @classmethod
    def getConexao(cls):
        
        mydb = connection.MySQLConnection ( 
        host = cls.host,
        user = cls.user,
        password = cls.password,
        database = cls.database
            )
        
        cls.conexaoEstabelecida = True

        print("Database insert - connection made!")

        return(mydb)

    @classmethod
    def fecharConexao(cls, mydb):
        mydb.close()

        cls.conexaoEstabelecida = False

    @staticmethod
    def insert(valores, mydb):
        
        mycursor = mydb.cursor()

        sql = "INSERT INTO leitura (fkConfiguracao, valor) VALUES %s"

        try:
            mycursor.execute(sql, valores)
            mydb.commit()
            print("Dados inseridos com sucesso!")
        except Error as e:
            print(f"Erro ao inserir dados: {e}")

    @staticmethod
    def select(valores, mydb):

        mycursor = mydb.cursor()
        sql = 'SELECT %s FROM %s;'

        mycursor.execute(sql,valores)
        resultados = mycursor.fetchall()
        mycursor.close()
        mydb.commit()

        return resultados

class Computador:
    
    @staticmethod
    def converter_bytes(bytes):
        if(bytes <= 0):
            return 0
        conversao = round(float((bytes)/ (1024 ** 3)), 2)
        return conversao

    @staticmethod
    def getEnderecoMAC():
        informacaoNet = psutil.net_if_addrs()
        # Informações relacionadas a dados da Net, por exemplo IPV4, o que queremos nesse caso é o endereço MAC

        for interface, enderecos in informacaoNet.items():
        # Está buscando os endereços
            for endereco in enderecos:
                if endereco.family == psutil.AF_LINK:  # AF_LINK representa o MAC Address
                    # Aqui é o que tem que mudar pra pegar o MAC, pra pegar o IPV4 por exemplo seria: psutil.AF_INET ou colocando o 6 no final para pegar o IPV6
                
                    if ":" in endereco.address:
                        macArrumado = endereco.address.replace(":", "")
                    elif "-" in endereco.address:
                        macArrumado = endereco.address.replace("-", "")

                    return macArrumado
    
        return 'NadaEncontrado'
    
    @staticmethod
    def getCPU():
        porcentagemCPU = psutil.cpu_percent(interval=1)

        return porcentagemCPU
    
    @staticmethod
    def getBateria():
        porcentagemBateria = psutil.sensors_battery()

        return porcentagemBateria

    @staticmethod
    def getRAM():
        memoriaVirtual = psutil.virtual_memory()
        RAMusado = Computador.converter_bytes(memoriaVirtual.used)
        
        return RAMusado

    @staticmethod
    def getDisco():
        discoUso = psutil.disk_usage('C:\\')
        # Não funciona no Linux, pois no Linux é necessário ser o '/' no lugar, pois o armazenamento dele está lá, mas a nível de simulação, por todos notebooks serem windows, optamos por manter o padrão de Windows

        armUsado = Computador.converter_bytes(discoUso.used)

        return armUsado
    
    @staticmethod
    def getRede():
         
        pass 

CPU = False
RAM = False
disco = False
bateria = False
velocidadeDaRede = False

def programaInsercao():

    BancoDeDados.setUsuario('Select')
    mydb = BancoDeDados.getConexao()

    informacaoCarro = Computador.getEnderecoMAC()    
    
    colunas = 'idConfiguracao, fkComponente, valorLimiteAlerta'
    FROM = 'configuracao JOIN carro ON fkCarro = idCarro WHERE enderecoMac = ' + informacaoCarro

    valores = (
        colunas,
        FROM,
            )

    resultados = BancoDeDados.select(valores)
    BancoDeDados.fecharConexao()
    
    qtdResultados = len(resultados)

    if(qtdResultados == 0):
        print("Nenhum resultado encontrado na nossa base de dados, encerrando opereação")
        return 

    idConfig = resultados[0][0]
    componentes = []
    limiarAlerta = []

    for linha in resultados:
        componentes.append(linha[1])
        limiarAlerta.append(linha[2])

    qtdComponentes = len(componentes)
    cont = 0

    while qtdComponentes > cont:
        componenteAtual = componentes[cont] 

        if componenteAtual == 1:
            # CPU
            CPU = True
            contCPU = cont
            
        elif componenteAtual == 2:
            # RAM
            RAM = True
            contRAM = cont
            # Processos que tá gostando mais RAM (Quando a RAM estiver alta)

        elif componenteAtual == 3: 
            # Disco
            disco = True
            contDisco = cont

        elif componenteAtual == 4:    
            # Bateria
            bateria = True
            contBateria = cont

        elif componenteAtual == 5:
            # Velocidade da rede
            velocidadeDaRede = True
            contRede = cont    

    BancoDeDados.setUsuario('Insert')
    mydb = BancoDeDados.getConexao()

    while True:

        if CPU:
            CPUAtual = Computador.getCPU()

            if CPUAtual >= limiarAlerta[contCPU]:
                
                sql = '(' + idConfig + ',' + CPUAtual + ');'
                BancoDeDados.insert(sql, mydb)
                
        if RAM:
            RAMAtual = Computador.getRAM()

            if RAMAtual >= limiarAlerta[contRAM]:
                
                sql = '(' + idConfig + ',' + RAMAtual + ');'
                BancoDeDados.insert(sql, mydb)
            
        if disco:
            discoAtual = Computador.getDisco()
            
            if discoAtual >= limiarAlerta[contDisco]:
                
                sql = '(' + idConfig + ',' + discoAtual + ');'
                BancoDeDados.insert(sql, mydb)

        if bateria:
            bateriaAtual = Computador.getBateria()

            if bateriaAtual >= limiarAlerta[contBateria]:
                
                sql = '(' + idConfig + ',' + bateriaAtual + ');'
                BancoDeDados.insert(sql, mydb)

        if velocidadeDaRede:
             
            velocidadeDaRedeAtual = Computador.getRede()   

            if velocidadeDaRedeAtual >= limiarAlerta[contCPU]:
                
                sql = '(' + idConfig + ',' + velocidadeDaRedeAtual + ');'
                BancoDeDados.insert(sql, mydb)

        time.sleep(5)

# Adicionar uma mensagem assim que começa o programa informando que está verificando a existência desse veículo no Banco de dados