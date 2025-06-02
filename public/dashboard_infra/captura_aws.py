import boto3
import pandas as pd
import json

# Cliente Cost Explorer
client = boto3.client('ce')

# Coleta dos custos
result = client.get_cost_and_usage(
    TimePeriod={
        'Start': '2025-05-20',
        'End': '2025-06-01'
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
