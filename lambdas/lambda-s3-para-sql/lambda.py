import boto3
import mysql.connector
import pandas as pd
import io
import re

s3 = boto3.client('s3')

def conectar():
    return mysql.connector.connect(
        host="3.210.239.227",
        port=3306,
        user="root",
        password="urubu100",
        database="allset"
    )

def lambda_handler(event, context):
    print("Lambda iniciada")
    try:
        bucket = event['Records'][0]['s3']['bucket']['name']
        nome_arquivo = event['Records'][0]['s3']['object']['key']
        print(f"Bucket: {bucket}, Arquivo: {nome_arquivo}")

        objeto = s3.get_object(Bucket=bucket, Key=nome_arquivo)
        conteudo = objeto['Body'].read().decode('utf-8')
        print("Arquivo carregado do S3")

        match_data = re.search(r"_data_(\d{4}-\d{2}-\d{2})", nome_arquivo)
        if not match_data:
            msg = "Data não encontrada no nome do arquivo"
            print(msg)
            return {"statusCode": 400, "body": msg}
        data = match_data.group(1)
        print(f"Data extraída: {data}")

        match_lote = re.search(r"lote_(\d+)", nome_arquivo)
        if not match_lote:
            msg = "Lote não encontrado no nome do arquivo"
            print(msg)
            return {"statusCode": 400, "body": msg}
        lote = int(match_lote.group(1))
        print(f"Lote extraído: {lote}")

        df = pd.read_csv(io.StringIO(conteudo), sep=";")
        registros = df.to_dict(orient='records')
        print(f"{len(registros)} registros carregados do CSV")

        conn = conectar()
        cursor = conn.cursor()
        print("Conectado ao banco de dados")

        query = """
            INSERT INTO historicoQtdPorCategoria 
            (tipo, critico, moderado, normal, data, lote)
            VALUES (%s, %s, %s, %s, %s, %s)
        """

        for registro in registros:
            tipo = registro.get('componente')
            if not tipo:
                print("Componente não especificado, pulando...")
                continue

            critico = registro.get('critico', 0)
            moderado = registro.get('moderado', 0)
            normal = registro.get('normal', 0)

            cursor.execute(query, (tipo, critico, moderado, normal, data, lote))
            print(f"Inserido: tipo={tipo}, critico={critico}, moderado={moderado}, normal={normal}, data={data}, lote={lote}")

        conn.commit()
        print("Transação confirmada")

        cursor.close()
        conn.close()
        print("Conexão com banco encerrada")

        return {"statusCode": 200, "body": f"{len(registros)} registros inseridos com sucesso."}

    except Exception as e:
        print("Erro na execução:", str(e))
        return {"statusCode": 500, "body": f"Erro: {str(e)}"}
