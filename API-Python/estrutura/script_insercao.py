import psutil
import time
import pandas as pd
import requests
import json
from datetime import datetime
from datetime import timedelta
from estrutura.chamados import registrarChamado, enviar_para_s3
from estrutura.getMacLote import getEnderecoMAC, lote
from estrutura.config import BANCO_RELACIONAL


def iniciarMonitoramento():
    mac = getEnderecoMAC()
    dados_monitoramento = []
    nome_do_json = f"monitoramento_{mac}_lote_7_data_{datetime.now().strftime('%d-%m-%Y_%Hhrs%Mmin%Ss')}.json"
    i = 0
    while True:
        discoUso = psutil.disk_usage("/").used
        porcentagemDisco = psutil.disk_usage("/").percent
        porcentagemCpu = psutil.cpu_percent(interval=0, percpu=False)
        ramUso = psutil.virtual_memory().used
        porcentagemRam = psutil.virtual_memory().percent
        hrCaptura = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        for processos in psutil.process_iter(["name"]):
            if "python" in processos.name().lower():
                print("Processo encontrado:", processos.name())

        # ALERTAS CPU
        if 50 <= porcentagemCpu <= 84:
            summary_jira = "cpu"
            priority = "Medium"
            registrarChamado(summary_jira, porcentagemCpu, priority, mac)
        elif 85 <= porcentagemCpu <= 100:
            summary_jira = "cpu"
            priority = "High"
            registrarChamado(summary_jira, porcentagemCpu, priority, mac)

        # ALERTAS RAM
        if 70 <= porcentagemRam <= 84:
            summary_jira = "ram"
            priority = "Medium"
            registrarChamado(summary_jira, porcentagemRam, priority, mac)
        elif 85 <= porcentagemRam <= 100:
            summary_jira = "ram"
            priority = "High"
            registrarChamado(summary_jira, porcentagemRam, priority, mac)

        # ALERTAS DISCO
        if 70 <= porcentagemDisco <= 84:
            summary_jira = "disco"
            priority = "Medium"
            registrarChamado(summary_jira, porcentagemDisco, priority, mac)
        elif 85 <= porcentagemDisco <= 100:
            summary_jira = "disco"
            priority = "High"
            registrarChamado(summary_jira, porcentagemDisco, priority, mac)

        # Adicionar dados de monitoramento à lista
        dados_monitoramento.append(
            {
                "discoUso": discoUso,
                "porcentagemDisco": porcentagemDisco,
                "porcentagemCpu": porcentagemCpu,
                "ramUso": ramUso,
                "porcentagemRam": porcentagemRam,
                "hrCaptura": hrCaptura,
                "macAdress": mac,
                "Lote": lote,
            }
        )

        # Dados para mandar em tempo real para a requisição do node
        dados = {
            "macadress": mac,
            "dadosCaptura": {
                "percentual_disco": porcentagemDisco,
                "percentual_cpu": porcentagemCpu,
                "percentual_ram": porcentagemRam,
                "dataHora": hrCaptura,
            },
        }

        try:
            res = requests.post(
                f"http://{BANCO_RELACIONAL['host']}:8080/seguranca/cadastrar/dados/{mac}",
                data=json.dumps(dados),
                headers={"Content-Type": "application/json"},
            )
            print("Status:", res.status_code)
            # print("Resposta:", res.text)
        except Exception as e:
            print("Erro ao enviar dados:", e)

        print(
            "\n",
            "Percentual do disco: ",
            porcentagemDisco,
            "\n",
            "Percentual da cpu: ",
            porcentagemCpu,
            "\n",
            "Percentual da ram: ",
            porcentagemRam,
            "\n",
            "DataHora da captura: ",
            hrCaptura,
            "\n",
        )

        nome_bucket = "raw-allset"
        nome_no_s3 = f"{nome_do_json}"

        if i != 0 and i % 100 == 0:
            df = pd.DataFrame(dados_monitoramento)
            df.to_json(nome_do_json, orient="records", indent=4)
            print(f"Salvo em {nome_do_json}")

            try:
                enviar_para_s3(nome_do_json, nome_bucket, nome_no_s3)
            except Exception as e:
                print(f"Erro ao enviar para o S3: {e}")

            break

        time.sleep(10)
        i += 1
