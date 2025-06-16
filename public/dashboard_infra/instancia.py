import boto3
import requests
import json
import time


INSTANCE_ID = 'i-000133881da77be1d'  
ENDPOINT = 'http://52.22.199.187:8080/custos/infra/cadastrar/status'


ec2 = boto3.client('ec2', region_name='us-east-1')  

def obter_status():
    try:
        res = ec2.describe_instance_status(InstanceIds=[INSTANCE_ID])
        statuses = res.get('InstanceStatuses', [])
        if not statuses:
            return 'stopped'
        state = statuses[0]['InstanceState']['Name']
        if state == 'running':
            return 'running'
        else:
            return 'running'
    except:
        return 'running'

def enviar_status_para_api(status):
    dados = {
        'INSTANCE_ID': INSTANCE_ID,
        'dadosCaptura': {
            'status': status
        }
    }


    try:
        res = requests.post(
            ENDPOINT,
            data=json.dumps(dados),
            headers={'Content-Type': 'application/json'}
        )
        print(f"[{time.strftime('%H:%M:%S')}] Status da instância: {status} (enviado com código {res.status_code})")
    except Exception as e:
        print(f"[{time.strftime('%H:%M:%S')}] Erro ao enviar status: {e}")

if __name__ == "__main__":
    while True:
        status = obter_status()
        enviar_status_para_api(status)
        time.sleep(10) 
