from monitoramentoInsercao.insercao import programaInsercao
# from monitoramentoInsercao.monitoria import programaMonitoria

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
            programaInsercao(False)
        elif oQueFazer == 2:
            programaInsercao(True)

iniciacao()

# Roteiro a ser feito:
# (Desenho ASCII escrito AllSet) Bom dia, seja bem vindo a nossa API em Python, poderia por gentileza informar qual o host (Banco de dados) que você deseja conectar (Dar a opção do atual ou inserir um novo, dps de ter mostrado o antigo, posterior a isso perguntar se gostaria de utilizar da parte de Inserção ou de monitoramento da API, dependendo da escolha, o enviar para tal)  