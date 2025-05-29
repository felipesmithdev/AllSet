import boto3
import mysql.connector
import pandas as pd
import io
import re

s3 = boto3.client('s3')

def conectar():
    return mysql.connector.connect(
        host="localhost",
        port= 3306,
        user="root",
        password="urubu100",
        database="allset"
    )

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    nomeArquivo = event['Records'][0]['s3']['object']['key']

    objeto = s3.get_object(Bucket=bucket, Key=nomeArquivo)
    conteudo = objeto['Body'].read().decode('utf-8')

    match = re.search(r"_data_(\d{4}-\d{2}-\d{2})", nomeArquivo)
    data = match.group(1)

    df = pd.read_csv(io.StringIO(conteudo), sep=";")
    dfFinal = df.to_dict(orient='records')
    
    conn = conectar()
    cursor = conn.cursor()

    numComponente = {
        'cpu': 1,
        'ram': 2,
        'disco': 3
    }

    query = f"INSERT INTO historicoQtdPorCategoria (tipo, categoria, qtd) VALUES (%s, %s, %s, %s)"

    for i in dfFinal:
        tipo = numComponente[i['componente']]
        cursor.execute(query, (tipo, 'critico', i['critico'], data))
        cursor.execute(query, (tipo, 'moderado', i['moderado'], data))
        cursor.execute(query, (tipo, 'normal', i['normal'], data))

    conn.commit()
    cursor.close()
    conn.close()

def teste_arquivo():
    with open('C:/Users/João/Documents/github/AllSet/lambdas/lambda-s3-para-sql/teste_data_2025-05-29.csv', 'r', encoding='utf-8') as f:
        conteudo = f.read()

    nomeArquivo = "teste_data_2025-05-29.csv"

    match = re.search(r"_data_(\d{4}-\d{2}-\d{2})", nomeArquivo)
    data = match.group(1)

    df = pd.read_csv(io.StringIO(conteudo), sep=";")
    dfFinal = df.to_dict(orient='records')

    conn = conectar()
    cursor = conn.cursor()

    numComponente = {
        'cpu': 1,
        'ram': 2,
        'disco': 3
    }

    query = "INSERT INTO historicoQtdPorCategoria (tipo, categoria, qtd, data) VALUES (%s, %s, %s, %s)"

    for i in dfFinal:
        tipo = numComponente[i['componente']]
        cursor.execute(query, (tipo, 'critico', i['critico'], data))
        cursor.execute(query, (tipo, 'moderado', i['moderado'], data))
        cursor.execute(query, (tipo, 'normal', i['normal'], data))

    conn.commit()
    cursor.close()
    conn.close()

    return

teste_arquivo()


