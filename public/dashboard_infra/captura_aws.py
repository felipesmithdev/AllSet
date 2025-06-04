import boto3
import pandas as pd
import json
from datetime import date, timedelta

# Cliente Cost Explorer
client = boto3.client('ce')

start_date = '2025-05-20'
data_atual = date.today()
data_anterior = data_atual - timedelta(days=1)
end_date = data_anterior.strftime('%Y-%m-%d')


# Coleta dos custos
result = client.get_cost_and_usage(
    TimePeriod={
        'Start': start_date,
        'End': end_date
    },
    Granularity='DAILY',
    Metrics=['BlendedCost'],
    GroupBy=[{
        'Type': 'DIMENSION',
        'Key': 'SERVICE'
    }]
)


df = pd.json_normalize(result['ResultsByTime'], sep='_')


nome_arquivo = "custos_total.json"
bucket = "raw-allset"
caminho_s3 = f"custos/{nome_arquivo}"


df.to_json(nome_arquivo, orient="records", indent=4)


s3 = boto3.client('s3')

try:
    s3.upload_file(nome_arquivo, bucket, caminho_s3)
    print(f"Arquivo enviado com sucesso para S3: {bucket}/{caminho_s3}")
except Exception as e:
    print(f"Erro ao enviar para o S3: {e}")
