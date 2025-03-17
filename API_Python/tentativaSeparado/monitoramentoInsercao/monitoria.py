# from API_Python.classes.BancoDeDados import BancoDeDados
# from ..classes.BancoDeDados import BancoDeDados
# from API_Python.classes.Computador import Computador
# from API_Python import Computador
import time

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
            tempo *= 60
            monitorar(tempo)

    elif oQueFazer == 0:
        return

def monitorar(tempo):

    if tempo == True:
        
        while True:
            cpu = Computador.getCPU
            ram = Computador.getRAM
            disco = Computador.getDisco
            bateria = Computador.getBateria

            print('CPU: ' + cpu + ' RAM: ' + ram + ' Disco: ' + disco + ' Bateria: '+ bateria)

            time.sleep(5)

    else:

        cont = 0
        tempo /= 5

        while cont <= tempo:

            cpu = Computador.getCPU
            ram = Computador.getRAM
            disco = Computador.getDisco
            bateria = Computador.getBateria

            print('CPU: ' + cpu + ' RAM: ' + ram + ' Disco: ' + disco + ' Bateria: '+ bateria)

            time.sleep(5)
            
        
programaMonitoria()