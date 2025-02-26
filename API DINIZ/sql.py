import mysql.connector
import math
import psutil
import time

mydb = mysql.connector.connect(
  host="10.18.32.97",
  user="insertAllSet",
  password="Insert123",
  database="pythonsim"
)

def converter_bytes(bytes):

   if bytes == 0:
       return "0B"
   tamanho = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   potencia = int(math.floor(math.log(bytes, 1000)))    
   divisor = math.pow(1000, potencia)
   simplificado = round(bytes / divisor, 2)
   return "%s %s" % (simplificado, tamanho[potencia])

mycursor = mydb.cursor()

ramTotal = converter_bytes(psutil.virtual_memory().total)
discoTotal = converter_bytes(psutil.disk_usage('/').total)
placa = input('Qual a placa do carro que você deseja monitorar? (7 digitos)')

sql = "INSERT INTO carros VALUES (%s ,%s, %s)"
val = [
  (placa, ramTotal, discoTotal)
  ]
try:
  mycursor.executemany(sql, val)
  mydb.commit()
  print(mycursor.rowcount, "record inserted.")
except:
  print('Placa já registrada.')

while True:
    escolha = input("Selecione quais recursos você deseja monitorar: \n 1 - RAM | 2 - CPU | 3 - Bateria | 4 - Disco \nÉ possível escolher mais de uma opção: \n")
    if all(opcao in '1234' for opcao in escolha):  
        break
    else:
        print("Entrada inválida. Escolha apenas 1, 2, 3 ou 4.")
print('\n')

repeticao = int(input("Por quantos minutos deseja monitorar?"))
cont=int(0)

while True:
    cont+=1
    print("Repetição:",cont)
    cpuUser = psutil.cpu_percent(interval=None)

    bateriaUser = psutil.sensors_battery()
    bateriaAtual = bateriaUser.percent  

    memoriaUser = psutil.virtual_memory()
    memoriaTotal = converter_bytes(memoriaUser.total)
    memoriaPercent = memoriaUser.percent
    memoriaLivre = converter_bytes(memoriaUser.free) 
    memoriaUsada = converter_bytes(memoriaUser.used)

    discoUser = psutil.disk_usage('/')
    discoPercent = discoUser.percent
    discoLivre = converter_bytes(discoUser.free)
    discoUsado = converter_bytes(discoUser.used)

    if '1' in escolha:
        print("Porcentagem de RAM usado: {}% \nRAM Livre: {} \nRAM Ocupada: {}".format(memoriaPercent,memoriaLivre,memoriaUsada))
    if '2' in escolha:
        print("Porcentagem do CPU: {}%".format(cpuUser))
    if '3' in escolha:
        print("Porcentagem da bateria: {}%".format(bateriaAtual))
    if '4' in escolha:
        print("Porcentagem do disco usado: {}% \nDisco Livre: {} \nDisco ocupado: {}".format(discoPercent, discoLivre, discoUsado))              

    sql = "INSERT INTO dados VALUES (default,%s,%s, %s, %s, %s,%s, %s, %s, %s)"
    val = [
  (placa ,bateriaAtual, memoriaPercent, memoriaLivre, memoriaUsada, discoPercent, discoLivre, discoUsado, cpuUser)
  ]

    mycursor.executemany(sql, val)

    mydb.commit()
    print(mycursor.rowcount, "Inserido. \n \n")
    if(cont == (repeticao * 12)):
        print("Programa encerrado")
        break
    time.sleep(5)