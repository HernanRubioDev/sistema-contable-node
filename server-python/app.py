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
from decimal import Decimal

def conection():
    host =  DB_CONFIG['host']
    database = DB_CONFIG['database']
    user = DB_CONFIG['user']
    password = DB_CONFIG['password']

    conn = connect(host=host,port=5432,dbname=database,user=user,password=password)
    return conn

############## Asientos Contables ############
@app.post('/movements')
def done_move ():

    try:
        #Traigo los datos del json que recibo 
        asiento = request.json
        #Abro conexion con la base de datos para hacer selects de los datos que necesito
        # 1: Necesito hacer una busqueda de la cuenta para obtener el id
        conn = conection()
        conn.set_session(autocommit=False)
        cur = conn.cursor(cursor_factory=extras.RealDictCursor)
        lineas_asiento = asiento["rows"]
        asiento_balanceado = True #Inicializo variable para ver tema balanceo
        move_insert = 0
        id_asiento = 0
        if len(lineas_asiento) < 2: 
            return jsonify({
                    "status":400,
                    "title":"Error",
                    "body":'Cantidad de lineas menor a 2',
                    "success":False
                    })
        for linea in lineas_asiento:
            date = linea.get('date')
            account = linea.get('account')
            monto = linea.get('ammount')
            type = linea.get('type')
            id_usr  = linea.get('id_user')
            move_number = asiento.get('moveNum')
            id_user = asiento.get('id_user')
            description = asiento.get('description')
            date = datetime.strptime(date, '%Y-%m-%d').date() #Datetime para comparar despues
            #Busco el id de la cuenta 
            cur.execute("SELECT id_account,credit,code from accounts where name = %s",(account,))
            try:
                row = cur.fetchone()
                id_account = row['id_account']
                credito_cuenta = row['credit']  
                # Me traigo el tipo de cuenta
                tipo_cuenta = row['code']
                #Me fijo por codigo que tipo de cuenta es
                if tipo_cuenta[0] == '1':
                    tipo_cuenta = 'activo'
                
                if tipo_cuenta[0] == '2':
                    tipo_cuenta = 'pasivo'
                
                if tipo_cuenta[0] == '3':
                    tipo_cuenta = 'patrimonio'

                if tipo_cuenta[0] == '4':
                    tipo_cuenta = 'r+'

                if tipo_cuenta[0] == '5':
                    tipo_cuenta = 'r-'
                
                # Si es activo y el tipo de linea es 'HABER' tiene que restar el saldo

                if type == 'haber' and tipo_cuenta == 'activo':
                    total = credito_cuenta - Decimal(monto)
                    if total <  0:
                        mensaje = 'El saldo de la cuenta {} es menor al monto a insertar en la línea'.format(account)
                        return jsonify({
                            "status":400,
                            "title":"Error",
                            "body": mensaje,
                            "success":False
                        })
                    #cur.execute("Update FROM accounts set credit=%s where id_account = %s",(total,id_account)) #Aca se hace la resta...
                    
                #Si es pasivo y el tipo es DEBE resta
                if type == 'debe' and tipo_cuenta == 'pasivo':
                    total = credito_cuenta - Decimal(monto)
                    if total <  0: 
                        mensaje = 'El saldo de la cuenta {} es menor al monto a insertar en la línea'.format(account)
                        return jsonify({
                            "status":400,
                            "title":"Error",
                            "body": mensaje,
                            "success":False
                        })


            except:
                mensaje = "La cuenta {} no existe".format(account)
                return jsonify({
                    "status":400,
                    "title":"Error",
                    "body": mensaje,
                    "success": False
                })
            #Monto no puede ser menor que 0
            if float(monto) <= 0 : 
                return jsonify({
                    "status":400,
                    "title":"Error",
                    "body":'El monto debe ser mayor',
                    "success":False
                })
            
            #Credit & debit
            debe = 0
            haber = 0
            if type == 'debe' :debe+=float(monto)
            if type == 'haber': haber += float(monto)
            #Obtengo la ultima fecha del asiento

            cur.execute("SELECT MAX(move_date) from accounts_moves") #Me traigo la fecha mas alta que es la que voy a necesitar para los asientos
            
            fecha_ultimo = cur.fetchone()['max']
            # Restriccion/validacion 1 : fecha del asiento no puede ser menor a la del ultimo asiento
            if fecha_ultimo is not None:
                if fecha_ultimo > date : 
                    return jsonify({
                        "status":400,
                        "title":"Error",
                        "error":'Fecha erronea',
                        "body":'El monto debe ser mayor',
                        "success":False
                    })
            
            else:
                fecha_ultimo = None
            
            #Validacion de saldos de cuentas
           #import pdb; pdb.set_trace()
            if not validar_balance(lineas_asiento):
                print("asiento no valanciado")
                asiento_balanceado = False
                break
            
            elif validar_balance(lineas_asiento) : #Asiento balanceado y no se realizo insercion
                if move_insert == 0:
                    try:
                        cur.execute("INSERT into accounts_moves(move_date,description, id_user) values (%s,%s,%s) RETURNING id_move",(date, description, id_user))
                        
                        if cur.rowcount == 1:
                            move_insert += 1
                            print('Insercion exitosa')
                            id_insertado = cur.fetchone()['id_move']
                            id_asiento = id_insertado
                            #Insercion primera linea
                            cur.execute("INSERT into accounts_moves_lines(id_move,id_account,date,debit,credit) values (%s,%s,%s,%s,%s)",(int(id_asiento),int(id_account),date,debe,haber))
                            #import pdb; pdb.set_trace()
                            if type == 'haber' and (tipo_cuenta == 'activo' or tipo_cuenta == 'r-'): 
                                total = credito_cuenta - Decimal(monto) #Tengo que restar el saldo
                            elif type == 'debe' and (tipo_cuenta == 'activo' or tipo_cuenta == 'r-' ) :
                                total = credito_cuenta + Decimal(monto)
                            elif type == 'debe' and (tipo_cuenta == 'pasivo' or tipo_cuenta == 'r+' or tipo_cuenta == 'patrimonio'):
                                total = credito_cuenta - Decimal(monto) #Tengo que restar el saldo
                            elif type == 'haber' and (tipo_cuenta == 'pasivo' or tipo_cuenta == 'r+' or tipo_cuenta == 'patrimonio'):
                                total = credito_cuenta + Decimal(monto)

                            #Hago la actualizacion en la base
                            cur.execute("Update accounts set credit= %s where id_account = %s",(total,id_account))

                    except:
                        return jsonify({
                            "status":400,
                            "title":"Error",
                            "body":'No fue posible insertar el asiento',
                            "success":False
                        })
                else:
                    #Insercion de linea
                    try:
                        cur.execute("INSERT into accounts_moves_lines(id_move,id_account,date,debit,credit) values (%s,%s,%s,%s,%s)",(int(id_asiento),int(id_account),date,debe,haber))
                        #Update de saldo de cuenta
                        if type == 'haber' and (tipo_cuenta == 'activo' or tipo_cuenta == 'r-' ): 
                            total = credito_cuenta - Decimal(monto) #Tengo que restar el saldo
                        elif type == 'debe' and (tipo_cuenta == 'activo' or tipo_cuenta == 'r-' ) :
                            total = credito_cuenta + Decimal(monto)
                        elif type == 'debe' and (tipo_cuenta == 'pasivo' or tipo_cuenta == 'r+' or tipo_cuenta == 'patrimonio' ):
                            total = credito_cuenta - Decimal(monto) #Tengo que restar el saldo
                        elif type == 'haber' and (tipo_cuenta == 'pasivo' or tipo_cuenta == 'r+' or tipo_cuenta == 'patrimonio'):
                            total = credito_cuenta + Decimal(monto)

                        #Hago la actualizacion en la base
                        cur.execute("Update accounts set credit= %s where id_account = %s",(total,id_account))
                    except:
                        return jsonify({
                            "status":400,
                            "title":"Error",
                            "body":'No fue posible insertar las lineas correspondientes al asiento',
                            "success":False
                        })
        conn.commit()

        if asiento_balanceado: 
            print('Asiento Balanceado')
            return jsonify({
                "status" : 201,
                "title": "Agregado",
                "body": 'El asiento se inserto correctamente',
                "success":True
            })
        else:
            return jsonify({
                "status": 400,
                "title":"Error",
                "body": 'El asiento no está balanceado.',
                "success":False
            })
    except Exception as e:
        # En caso de un error, revertir la transacción
        conn.rollback()
        print("Error:", e)
        return jsonify({
            "status": 400,
            "title": "Error",
            "body": 'Ocurrió un error al procesar el asiento.',
            "success": False
        })
    finally:
        # Restablecer la configuración de autocommit
        # Cerrar el cursor y la conexión
        cur.close()
        conn.close()



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
    else:
        print("entro") 
        return False


#MAIN 

if __name__=='__main__' :
    app.run(debug=True)
