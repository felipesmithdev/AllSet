import psutil  

class Computador:
    
    def getEnderecoMAC():
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
    
    def getCPU():
        porcentagemCPU = psutil.cpu_percent(interval=1)
        
        return porcentagemCPU
    
    def getBateria():
        porcentagemBateria = psutil.sensors_battery()

        return porcentagemBateria

    def 

    # Pegar o IPV4 tbm
    # Pegar os processos