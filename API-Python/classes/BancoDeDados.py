from mysql.connector import connection, errorcode, Error

class BancoDeDados:
    host="localhost"
    user = None
    password = None
    database="allset"
    conexaoEstabelecida = False

    def getHost():
        return host

    def setHost(host):
        host = host

    def setUsuario(tipo):

        if tipo == "Select":
            user = "selectAllSet"
            password = "Select123"
        
        elif tipo == "Insert":
            user = "insertAllSet"
            password = "Insert123"
    
    def getConexao():
        
        mydb = connection.MySQLConnection ( 
        host = host,
        user = user,
        password = password,
        database = database
            )
        
        conexaoEstabelecida = True

        print("Database insert - connection made!")

        return(mydb)
    
    @staticmethod
    def fecharConexao(mydb):
        mydb.close()

        conexaoEstabelecida = False

    @staticmethod
    def insert(valores, mydb):
        
        mycursor = mydb.cursor()

        sql = "INSERT INTO leitura (fkConfiguracao, valor) VALUES %s"

        try:
            mycursor.execute(sql, valores)
            mydb.commit()
            print("Dados inseridos com sucesso!")
        except Error as e:
            print(f"Erro ao inserir dados: {e}")

    @staticmethod
    def select(valores, mydb):

        mycursor = mydb.cursor()
        sql = 'SELECT %s FROM %s;'

        mycursor.execute(sql,valores)
        resultados = mycursor.fetchall()
        mycursor.close()
        mydb.commit()

        return resultados

# Transformar em pacote Pythoh?
# Ver a piscina
    