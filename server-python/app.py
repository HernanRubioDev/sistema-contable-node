from flask import Flask, request, jsonify, send_file 
import psycopg2 
from psycopg2 import connect, extras
from cryptography.fernet import Fernet
import uuid
from flask_cors import CORS 
app = Flask(__name__)
CORS(app, resources={"/user/login": {"origins": "http://127.0.0.1:5173"}})
key = Fernet.generate_key()
from config import DB_CONFIG
from datetime import datetime

def conection():
    host =  DB_CONFIG['host']
    database = DB_CONFIG['database']
    user = DB_CONFIG['user']
    password = DB_CONFIG['password']

    conn = connect(host=host,port=5432,dbname=database,user=user,password=password)
    return conn


#END POINTS 
@app.get('/api/users')
def get_users():
    return 'getting users'

@app.post('/api/new_users')
def create_users():
    #Tomo datos del json
    new_user = request.get_json()
    username = new_user['username']
    name = new_user['name']
    surname = new_user['surname']
    pwd = Fernet(key).encrypt(bytes(new_user['password'],'utf-8'))
    #Abro conexion
    import pdb; pdb.set_trace()
    conn = conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute("insert into users (name,surname,username,password) VALUES (%s,%s,%s,%s) RETURNING *",(name,surname,username,pwd)) #Inserto nuevo usuario
    
    new_created_user = cur.fetchone()

    conn.commit()
    #Cierro conexiones
    cur.close()
    conn.close()

    return jsonify(new_created_user)

@app.delete('/api/users/<id>')
def delete_users(id):
    conn = conection()  #Llamo a funcion conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('DELETE FROM users wherer id=%s RETURNING *',(id))
    user = cur.fetchone()

    if user is None:  #Si no hay usuario
        return jsonify({'message':'User NOT Found'}),404

    return jsonify(user)

@app.put('/api/users/<id>')
def update_users(id):
    #Tomo datos del json
    new_user = request.get_json()
    username = new_user['username']
    name = new_user['name']
    surname = new_user['surname']
    pwd = Fernet(key).encrypt(bytes(new_user['password'],'utf-8'))
    #Abro conexion
    conn = conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute("update users set username=%s, name=%s, password=%s  where id = %s RETURNING *",(username,name,pwd,id)) #Inserto nuevo usuario
    user = cur.fetchone()


    conn.commit()
    #Cierro conexiones
    cur.close()
    conn.close()

    return jsonify(user)

@app.get('/api/users/<id>')
def get_user(id):
    conn = conection()  #Llamo a funcion conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor) 

    cur.execute('SELECT * FROM users where id= %s',(id))
    user = cur.fetchone()
    if user is None:  #Si no hay usuario
        return jsonify({'message':'User NOT Found'}),404
    
    return jsonify(user)




@app.post('/user/login')
def login():
    #import pdb; pdb.set_trace()
    conn = conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    username = request.json.get("username",None)
    pwd = request.json.get("password",None)
    #Consulta de user + pwd a base de datos
    cur.execute("SELECT * FROM users where username=%s and password = %s",(username,pwd))
    account = cur.fetchone()
    print(account)
    if account:
        id = account['id_user'] #Traigo el id del user
        auth_token = str(uuid.uuid4()) #Creo uuid
        cur.execute("update users set auth_token=%s where id_user=%s ",(auth_token,id))
        conn.commit()  #Confirmo cambios 
        return jsonify({
            "status":201,
            "auth_token":auth_token}) #Retorno tkn
    else:
        return jsonify ({"status":403,
                         "auth_token":None})
    

############## Asientos Contables ############
@app.post('/movements')
def done_move ():
    import pdb; pdb.set_trace()
    #Traigo los datos del json que recibo 
    lineas_asiento = request.json

    #Abro conexion con la base de datos para hacer selects de los datos que necesito
    # 1: Necesito hacer una busqueda de la cuenta para obtener el id
    conn = conection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    asiento_balanceado = True #Inicializo variable para ver tema balanceo
    move_insert = 0
    id_asiento = 0 
    for linea in lineas_asiento:
        date = linea.get('date')
        description = linea.get('description')
        account = linea.get('account')
        monto = linea.get('ammount')
        type = linea.get('type')
        id_cpny  = linea.get('id_company')
        date = datetime.strptime(date, '%Y-%m-%d').date() #Datetime para comparar despues
        #Busco el id de la cuenta 
        cur.execute("SELECT id_account from accounts where name = %s",(account,))
        id_account = cur.fetchone()['id_account']
        
        #Monto no puede ser menor que 0
        if float(monto) <= 0 : 
            return jsonify({
                "status":400,
                "error":'El monto debe ser mayor'
            })
        
        #Credit & debit
        debe = 0
        haber = 0
        if type == 'debe' :debe+=float(monto)
        if type == 'haber': haber += float(monto)
        #Obtengo la ultima fecha del asiento

        cur.execute("SELECT MAX(date) from account_moves") #Me traigo la fecha mas alta que es la que voy a necesitar para los asientos
        
        fecha_ultimo = cur.fetchone()['max']
        # Restriccion/validacion 1 : fecha del asiento no puede ser menor a la del ultimo asiento
        if fecha_ultimo > date : 
            return jsonify({
                "status":400,
                "error":'Fecha erronea'
            })
        
        if not validar_balance(lineas_asiento):
            asiento_balanceado = False
            break
        
        elif validar_balance(lineas_asiento) : #Asiento balanceado y no se realizo insercion
            if move_insert == 0: 
                try:
                    cur.execute("INSERT into account_moves(date,description,id_company) values (%s,%s,%s) RETURNING id_move",(date,description,id_cpny))
                    conn.commit()
                    if cur.rowcount == 1:
                        move_insert += 1
                        print('Insercion exitosa')
                        id_insertado = cur.fetchone()['id_move']
                        id_asiento = id_insertado
                        import pdb; pdb.set_trace()
                        #Insercion primera linea
                        cur.execute("INSERT into account_move_lines(id_move,id_account,debit,credit) values (%s,%s,%s,%s) RETURNING id_line",(int(id_asiento),int(id_account),debe,haber))
                        conn.commit()
                except:
                    return jsonify({
                        "status":400,
                        "error":'No fue posible insertar el asiento'
                    })
            else:
                #Insercion de linea
                try:
                    cur.execute("INSERT into account_move_lines(id_move,id_account,debit,credit) values (%s,%s,%s,%s) RETURNING id_line",(int(id_asiento),int(id_account),debe,haber))
                    conn.commit()
                except:
                    return jsonify({
                        "status":400,
                        "error":'No fue posible insertar las lineas correspondientes al asiento'
                    })

    if asiento_balanceado: 
        print('Asiento Balanceado')
    else:
        import pdb; pdb.set_trace()
        return jsonify({
            "status": 400,
            "error": 'El asiento no está balanceado.'
        })


#Funcion para validar asientos
        
def validar_balance(lineas_asiento):
    suma_haber = 0 
    suma_debe = 0 

    for linea in lineas_asiento:
        monto = float(linea.get('ammount',0))
        tipo = linea.get('type', '').strip().lower()

        if tipo == 'debe' :suma_debe+=monto
        if tipo == 'haber': suma_haber += monto

    if round(suma_debe,2) == round(suma_haber,2):
        return True
    else: return False


#MAIN 

if __name__=='__main__' :
    app.run(debug=True)
