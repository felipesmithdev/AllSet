import psutil
import time
from mysql.connector import (connection)
from datetime import datetime

cnx = connection.MySQLConnection(
    host="10.18.32.97",
    user="insertAllSet  ",
    password="Insert123",
    database="allsetpython"
)

cur = cnx.cursor()

dataRegistro = datetime.now()
sql = "INSERT INTO registrosCriticos VALUES (default, 1, 'abc', %s)"
valores = [dataRegistro]
cur.execute(sql, valores)
cnx.commit()
print(cur.rowcount, "Inserido. \n \n")

