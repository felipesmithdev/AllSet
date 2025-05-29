import boto3
import pandas as pd
import io
import re

def lambda_handler(event, context):
    nomeBucket = 'client-allset'
    prefixoLote = event.get('lote', '')

    s3 = boto3.client('s3')
    arquivos = s3.list_objects_v2(Bucket=nomeBucket)

    ultimosTrintaDias = []

    for i in arquivos.get('Contents', []):
        nomeArquivo = i['Key']

        if not nomeArquivo.startswith(prefixoLote + "/"):   
            continue

        match = re.search(r"_data_(\d{4}-\d{2}-\d{2})", nomeArquivo)
        dataCapturas = match.group(1)

        retorno = s3.get_object(Bucket=nomeBucket, Key=nomeArquivo)
        conteudo = retorno['Body'].read()

        df = pd.read_csv(io.StringIO(conteudo), sep=";")
        df['data'] = dataCapturas

        ultimosTrintaDias.append(df)

    df_final = pd.concat(ultimosTrintaDias, ignore_index=True)
    return {
        "statusCode": 200,
        "body": df_final.to_json(indent=2, orient='records', force_ascii=False)
    }
