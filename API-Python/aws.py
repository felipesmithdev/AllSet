import boto3

client = boto3.client('ce')

result = client.get_cost_and_usage(
    TimePeriod={
        'Start': '2025-05-20',
        'End': '2025-05-22'
    },
    Granularity='DAILY',
    Metrics=['BlendedCost'],
    GroupBy=[
        {
            'Type': 'DIMENSION',
            'Key': 'SERVICE'
        }
    ]
)


for day in result["ResultsByTime"]:
    date = day["TimePeriod"]["Start"]
    total_cost = 0.0
    lambda_cost = ec2_cost = s3_cost = 0.0

    for group in day.get("Groups", []):
        service = group["Keys"][0]
        cost = float(group["Metrics"]["BlendedCost"]["Amount"])
        total_cost += cost

        
        if "Lambda" in service:
            lambda_cost += cost
        elif "EC2" in service:
            ec2_cost += cost
        elif "Simple Storage Service" in service:
            s3_cost += cost

    print(f"Data: {date}")
    print(f"  Lambda: {lambda_cost} USD")
    print(f"  EC2:    {ec2_cost} USD")
    print(f"  S3:     {s3_cost} USD")
    print(f"  Total:  {total_cost} USD\n")


