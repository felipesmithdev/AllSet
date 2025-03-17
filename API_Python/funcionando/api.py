import psutil  
from mysql.connector import connection, errorcode, Error
import time

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
        porcentagemBateria = psutil.sensors_battery().percent
        return porcentagemBateria

    @staticmethod
    def getRAM():
        memoriaVirtual = psutil.virtual_memory()
        RAMusado = Computador.converter_bytes(memoriaVirtual.used)
        
        return RAMusado

    @staticmethod
    def getDisco():
        discoTotal = psutil.disk_usage('C:\\')
        # Não funciona no Linux, pois no Linux é necessário ser o '/' no lugar, pois o armazenamento dele está lá, mas a nível de simulação, por todos notebooks serem windows, optamos por manter o padrão de Windows

        armUsado = Computador.converter_bytes(discoTotal.free)

        return armUsado
    
    @staticmethod
    def getRede():
         
        pass 

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
        cls.host = host
 
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
        sql = 'SELECT %s FROM %s WHERE enderecoMac = %s;'

        mycursor.execute(sql,valores)
        resultados = mycursor.fetchall()
        mycursor.close()
        mydb.commit()

        return resultados

print("""
      
.:       .::      .::        .:: ::  .::::::::.::: .::::::
.: ::     .::      .::      .::    .::.::           .::
.:  .::    .::      .::       .::      .::           .::
.::   .::   .::      .::         .::    .::::::       .::
.:::::: .::  .::      .::            .:: .::           .::
.::       .:: .::      .::      .::    .::.::           .::
.::         .::.::::::::.::::::::  .:: ::  .::::::::     .:: 
    
Seja bem vindo a nossa API de Python 
Aqui poderá monitorar em tempo real ou selecionar os dados salvos em nosso banco de dados
""")

def iniciacao():
    hostAtual = BancoDeDados.getHost()
        
    while True:
        try:
            oQueFazer = int(input("Deseja alterar o host atual (" + hostAtual + ")? \n 1 - Sim \n 2 - Não \n 0 - Cancelar \n Resposta:"))
            if oQueFazer in [0, 1, 2]:
                break
            else:
                print("Opção inválida! Digite 0, 1 ou 2.")
        except ValueError:
            print("Entrada inválida! Digite um número válido.")

    if oQueFazer == 0:
        return

    elif oQueFazer == 1:
        while True:
            novoHost = str(input("Digite o novo host para substituir o " + hostAtual + "(Seguindo esse padrão: 000.000.000.000)  \n Digite 1 para cancelar a troca do host e seguir para o próximo passo ou 0 para cancelar, caso contrário, prosseguir com o novo host \n Resposta:"))

            if novoHost == '0':
                return 

            elif novoHost == '1':
                break 

            elif len(novoHost) == 15:
                BancoDeDados.setHost(novoHost)
                print("Novo host " + novoHost + " cadastrado com sucesso!")
                break
            else:
                print("Cadastro não realizado, siga o padrão 000.000.000.000 \n Exemplos: 023.234.222.123 ou 012.034.024.019")

    while True:
        try:
            oQueFazer = int(input("Deseja iniciar qual funcionalidade? \n 1 - Monitoria em tempo real \n 2 - Inserção de dados \n 0 - Cancelar \n Resposta:"))
            if oQueFazer in [0, 1, 2]:
                break
            else:
                print("Opção inválida! Digite 0, 1 ou 2.")
        except ValueError:
            print("Entrada inválida! Digite um número válido.")

    if oQueFazer == 0:
        return

    elif oQueFazer == 1:
        programaMonitoria() 

    elif oQueFazer == 2:
        programaInsercao()


def programaInsercao():

    CPU = False
    RAM = False
    disco = False
    bateria = False
    velocidadeDaRede = False

    BancoDeDados.setUsuario('Select')
    mydb = BancoDeDados.getConexao()

    informacaoCarro = Computador.getEnderecoMAC()    
    
    colunas = 'idConfiguracao, fkComponente, valorLimiteAlerta'
    FROM = 'configuracao JOIN carro ON fkCarro = idCarro'

    valores = (
        colunas,
        FROM,
        informacaoCarro
            )

    resultados = BancoDeDados.select(valores,mydb)
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

def programaMonitoria():

    while True:
        
        try:
            oQueFazer = int(input("Gostaria de verificar por um tempo determinado ou rodar indeterminadamente: \n 1 - Inderterminadamente \n 2 - Definir tempo \n 0 - Cancelar \n Resposta:"))    
            if oQueFazer in [0, 1, 2]:
                break
            else:
                print("Opção inválida! Digite 0, 1 ou 2.")
        except ValueError:
            print("Entrada inválida! Digite um número válido.")

    if oQueFazer == 1:
        monitorar(True)
    
    elif oQueFazer == 2:
        
        while True:
        
            try:
                tempo = int(input("Insira quantos minutos gostaria: (caso queira cancelar, só escolher 0 e caso tenha decidido rodar indeterminadamente, digite -1 )\n Resposta:"))
            
                if tempo >= (-1):
                    break
                else:
                    print("Opção inválida, digite uma das opções ou um valor sem ser negativo")
            except ValueError:
                print("Entrada inválida! Digite um número válido.")

        if tempo == -1:
            monitorar(True)
        
        elif tempo == 0:
            return
        
        elif tempo > 0:
            tempo = tempo * 60
            monitorar(tempo)

    elif oQueFazer == 0:
        return

def monitorar(tempo):

    if tempo == True:
        
        while True:
            cpu = Computador.getCPU()
            ram = Computador.getRAM()
            disco = Computador.getDisco()
            bateria = Computador.getBateria()

            print('CPU utilizada: ' + str(cpu) + '% RAM utilizada: ' + str(ram) + '% Disco restante: ' + str(disco) + ' Bateria restante: ' + str(bateria) + '%')

            time.sleep(5)

    else:

        cont = 0
        tempo /= 5

        while cont <= tempo:

            cpu = Computador.getCPU()
            ram = Computador.getRAM()
            disco = Computador.getDisco()
            bateria = Computador.getBateria()

            print('CPU: ' + cpu + ' RAM: ' + ram + ' Disco: ' + disco + ' Bateria: '+ bateria)

            time.sleep(5)
            cont += 1

iniciacao()