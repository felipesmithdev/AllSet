from mysql.connector import connection, errorcode, Error

class BancoDeDados:
    host="localhost"
    user = None
    password = None
    database="allset"
    conexaoEstabelecida = False

    def getHost(self):
        return self.host

    def setHost(self,host):
        self.host = host

    def setUsuario(self,tipo):

        if tipo == "Select":
            self.user = "selectAllSet"
            self.password = "Select123"
        
        elif tipo == "Insert":
            self.user = "insertAllSet"
            self.password = "Insert123"
    
    def getConexao(self):
        
        mydb = connection.MySQLConnection ( 
        host = self.host,
        user = self.user,
        password = self.password,
        database = self.database
            )
        
        self.conexaoEstabelecida = True

        print("Database insert - connection made!")

        return(mydb)
    
    def fecharConexao(self, mydb):
        mydb.close()

        self.conexaoEstabelecida = False
        
    def insert(valores, mydb):
        
        mycursor = mydb.cursor()

        sql = "INSERT INTO leitura (fkConfiguracao, valor) VALUES %s"

        mycursor.execute(sql,valores)
        mycursor.close()
        mydb.commit()

    def select(valores, mydb):

        mycursor = mydb.cursor()
        sql = 'SELECT %s FROM %s;'

        mycursor.execute(sql,valores)
        resultados = mycursor.fetchall()
        mycursor.close()
        mydb.commit()

        return resultados

# Adicionar como uma função o Select?
# Transformar em pacote Pythoh?
# Ver a piscina
    