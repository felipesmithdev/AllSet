import psutil  
from classes.BancoDeDados import BancoDeDados
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
                oQueFazer = int(input("Deseja verificar apenas uma vez (1) ou rodar o programa infinitamente (2)? Caso deseje cancelar, digite 0: \n"))
                if oQueFazer in [0, 1, 2]:
                    break
                else:
                    print("Opção inválida! Digite 0, 1 ou 2.")
            except ValueError:
                print("Entrada inválida! Digite um número válido.")

        if oQueFazer == 0:
            return
        elif oQueFazer == 1:
            programaMonitoria(False)
        elif oQueFazer == 2:
            programaMonitoria(True)

def qualCarro():
    
    informacaoNet = psutil.net_if_addrs()
        # Informações relacionadas a dados da Net, por exemplo IPV4, o que queremos nesse caso é o endereço MAC

    for interface, enderecos in informacaoNet.items():
        # Está buscando os endereços
        for endereco in enderecos:
            if endereco.family == psutil.AF_LINK:  # AF_LINK representa o MAC Address
                # Aqui é o que tem que mudar pra pegar o MAC, pra pegar o IPV4 por exemplo seria: psutil.AF_INET ou colocando o 6 no final para pegar o IPV6
                
                macArrumado = endereco.address.replace()(":", "")
                
                return macArrumado
    
    return 'NadaEncontrado'

def programaMonitoria(infinito):

    BancoDeDados.setUsuario('Select')
    mydb = BancoDeDados.getConexao()

    informacaoCarro = qualCarro()    
    
    colunas = 'fkCarro, fkComponente, valorLimiteAlerta'
    FROM = 'configuracao JOIN carro ON fkCarro = idCarro WHERE identificador = ' + informacaoCarro

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
        componentes = linha[1]
        limiarAlerta = linha[2]

    qtdComponentes = len(componentes)
    cont = 0

    while qtdComponentes > cont:
        componenteAtual = componentes[cont] 

        if componenteAtual == 1:
            # CPU
            
        elif componenteAtual == 2:
            # RAM
            # Processos que tá gostando mais RAM (Quando a RAM estiver alta)

        elif componenteAtual == 3: 
            # Disco

        elif componenteAtual == 4:    
            # Bateria

        elif componenteAtual == 5:
            # Velocidade da rede    

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

# Adicionar uma pergunta se gostaria de mudar o host do BD e exibir qual o host atual