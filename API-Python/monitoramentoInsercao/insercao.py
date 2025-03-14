import psutil  
from classes.BancoDeDados import BancoDeDados
from classes.Computador import Computador
from mysql.connector import connection, errorcode, Error
import time

CPU = False
RAM = False
disco = False
bateria = False
velocidadeDaRede = False

def programaInsercao(infinito):

    BancoDeDados.setUsuario('Select')
    mydb = BancoDeDados.getConexao()

    informacaoCarro = Computador.getEnderecoMAC()    
    
    colunas = 'fkCarro, fkComponente, valorLimiteAlerta'
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

    fkcarro = resultados[0][0]
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

    while True:

        if CPU:
            CPUAtual = Computador.getCPU()

            if CPUAtual == limiarAlerta[contCPU]:
                
                sql = '(' + fkcarro + ',' + CPUAtual + ');'
                
                leitura = (

                )
        
        if RAM:
            RAMAtual = Computador.getRAM()
            
        if disco:
            discoAtual = Computador.getDisco()

        if bateria:
            bateriaAtual = Computador.getBateria()

        if velocidadeDaRede:
             velocidadeDaRedeAtual = Computador.getRede()   

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

# Adicionar uma mensagem assim que começa o programa informando que está verificando a existência desse veículo no Banco de dados