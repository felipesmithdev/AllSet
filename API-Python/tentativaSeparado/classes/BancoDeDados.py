from mysql.connector import connection, errorcode, Error

class BancoDeDados:
    host="localhost"
    user = None
    password = None
    database="allset"
    conexaoEstabelecida = False

    @classmethod
    def getHost(cls):
        return cls.host

    @classmethod
    def setHost(cls, host):
        cls.host = host
 
    @classmethod
    def setUsuario(cls, tipo):

        if tipo == "Select":
            cls.user = "selectAllSet"
            cls.password = "Select123"
        
        elif tipo == "Insert":
            cls.user = "insertAllSet"
            cls.password = "Insert123"
    
    @classmethod
    def getConexao(cls):
        
        mydb = connection.MySQLConnection ( 
        host = cls.host,
        user = cls.user,
        password = cls.password,
        database = cls.database
            )
        
        cls.conexaoEstabelecida = True

        print("Database insert - connection made!")

        return(mydb)

    @classmethod
    def fecharConexao(cls, mydb):
        mydb.close()

        cls.conexaoEstabelecida = False

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
        sql = 'SELECT %s FROM %s WHERE enderecoMac = %s;'

        mycursor.execute(sql,valores)
        resultados = mycursor.fetchall()
        mycursor.close()
        mydb.commit()

        return resultados

# Transformar em pacote Pythoh?
# Ver a piscina
    