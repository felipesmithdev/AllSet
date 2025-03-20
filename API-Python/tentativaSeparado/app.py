from monitoramentoInsercao.insercao import programaInsercao
from monitoramentoInsercao.monitoria import programaMonitoria
from classes.BancoDeDados import BancoDeDados

# from API_Python import Computador, BancoDeDados 
# Tentei um desses tbm:
# from API_Python.classes.Computador import Computador
# from API_Python import Computador
# from ..classes.BancoDeDados import BancoDeDados
# Por recomendação do professor de SO, mas ainda assim, não foi
# E tbm removi os arquivos Init que enquanto pesquisava, vi recomendação de colocar, mas como não funcionou, removi

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

iniciacao()

# Roteiro a ser feito:
# (Desenho ASCII escrito AllSet) Bom dia, seja bem vindo a nossa API em Python, poderia por gentileza informar qual o host (Banco de dados) que você deseja conectar (Dar a opção do atual ou inserir um novo, dps de ter mostrado o antigo, posterior a isso perguntar se gostaria de utilizar da parte de Inserção ou de monitoramento da API, dependendo da escolha, o enviar para tal)  