import boto3
import json

def lambda_handler(event, context):
    s3 = boto3.client('s3')

    
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    response = s3.get_object(Bucket=bucket, Key=key)
    raw_data = json.loads(response['Body'].read())

    trusted_data = []

    
    for day in raw_data:
        date = day.get("TimePeriod_Start", "N/A")

        total = 0.0
        lambda_cost = ec2_cost = s3_cost = 0.0

        for group in day.get("Groups", []):
            service = group["Keys"][0]
            cost = float(group["Metrics"]["BlendedCost"]["Amount"])
            total += cost

            if "Lambda" in service:
                lambda_cost += cost
            elif "EC2" in service or "Elastic Block Store" in service:
                ec2_cost += cost
            elif "Simple Storage Service" in service:
                s3_cost += cost

        trusted_data.append({
            "data": date,
            "lambda_custo": round(lambda_cost, 4) + 4.0,
            "ec2_custo": round(ec2_cost, 4) + 3.0,
            "s3_custo": round(s3_cost, 4) + 6.0,
            "total_custo": round(total, 4) + 5.0
        })

    
    caminho_json = "/tmp/custos_filtrados.json"
    with open(caminho_json, "w") as f:
        json.dump(trusted_data, f, indent=2)

    
    trusted_bucket = "bucket-teste-trusted-captura"
    trusted_key = "custos/custos_filtrados.json"

    try:
        s3.upload_file(caminho_json, trusted_bucket, trusted_key)
        print(f"Arquivo JSON enviado com sucesso para {trusted_bucket}/{trusted_key}")
    except Exception as e:
        print(f"Erro ao enviar JSON para o S3: {e}")

    return {
        'statusCode': 200,
        'body': f'JSON salvo em {trusted_bucket}/{trusted_key}'
    }
