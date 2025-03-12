from mysql.connector import connection, errorcode, Error

class BancoDeDados:
    host="localhost"
    user = None
    password = None
    database="allset"

    def novoHost(self,host):
        self.host = host

    def usuario(self,tipo):

        if tipo == "Select":
            self.user = "selectAllSet"
            self.password = "Select123"
        
        elif tipo == "Insert":
            self.user = "insertAllSet"
            self.password = "Insert123"
    
    def conexao(self):
        
        mydb = connection.MySQLConnection ( 
        host = self.host,
        user = self.user,
        password = self.password,
        database = self.database
            )

        print("Database insert - connection made!")

        return(mydb)
    
    def fechandoConexao(mydb):
        mydb.commit()

    