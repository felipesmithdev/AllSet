import psutil
from estrutura.conectar import conectar

lote = 0


def getEnderecoMAC():
    interfaces = psutil.net_if_addrs()
    stats = psutil.net_if_stats()

    for nome_iface, enderecos in interfaces.items():
        if nome_iface in stats and stats[nome_iface].isup:
            for endereco in enderecos:
                if endereco.family == psutil.AF_LINK:
                    mac = endereco.address
                    if (
                        mac
                        and mac != "00:00:00:00:00:00"
                        and ("!" in mac or "-" in mac or ":" in mac)
                    ):
                        return mac.replace(":", "").replace("-", "")
    return "NadaEncontrado"


def inserirSelecionarLoteDoCarro(mac):
    conn = conectar.conectar()
    cursor = conn.cursor()
    query = "SELECT lote FROM carro WHERE macadress = %s"
    cursor.execute(query, (mac))
    resultado = cursor.fetchone()
    if resultado:
        lote = resultado[0]
        print("Lote encontrado, Lote: ", lote)
    else:
        query = (
            "INSERT IGNORE INTO carro(marca, ano, sistema_operacional, mnacadress, fk_lote) VALUES"
            "(%s, %s, %s, %s, %s)"
        )
        cursor.execute(query, ("BMW", 2018, "Ubuntu", mac, 1))
        print("Carro cadastrado com sucesso, Lote: 1")
    conn.commit()
    conn.close()


mac = getEnderecoMAC()
