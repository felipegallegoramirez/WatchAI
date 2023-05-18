
# * Basico python
import random

# * Base de datos y API
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from config.db import conn


# * Usuarios
from models.user import users
from schema.userschema import User


# * Recuperar contraseña
from models.recover import recovers
from schema.recoverschema import Recover


# * Importaciones para encrpitar
from cryptography.fernet import Fernet
key= Fernet.generate_key()
f=Fernet(key)


# * Importacion para generar token
from utils.auth import write_token

# * Importacion para enviar correo en la recuperacion de la cuenta
from utils.email import recoverpassword




auth = APIRouter()


# TODO: Funcion para hacer el register, si ya existe una cuenta asociada procede al login
@auth.post("/login")
def login(user: User):
    try:
        # Busca si ya existe la cuenta 
        a=conn.execute(users.select().where(users.c.email==user.email)).first()
        info={"email":user.email}

        # Si no encontro nada procede al registro
        if a == None:
            data = {"email":user.email}
            # Encripta la contraseña
            data["password"]=f.encrypt(user.password.encode("utf-8"))
            result = conn.execute(users.insert().values(data))
            return JSONResponse(content={"code": write_token(info), "id":result.lastrowid}, status_code=200)
        else:
            #Des Encripta la contraseña para comparar la de la base de datos
            enc=f.decrypt(a.password.encode("utf-8"))
            if user.password.encode("utf-8") == enc:
                return JSONResponse(content={"code": write_token(info),"id":a.id}, status_code=200)
            else:
                return JSONResponse(content={"message": "Contraseña incorrecta"}, status_code=400)
    except:
        return JSONResponse(content={"message": "error"}, status_code=400)
        
# Todo: Con el codigo generado en "recover_send", se verifica que si corresponda el de la bd
@auth.post("/recover/{id}")
def recover(id,recover:Recover):
    try:
        # Busca en la bd
        a=conn.execute(recovers.select().where(recovers.c.id==id)).first()
        b=conn.execute(users.select().where(users.c.id==a.idowner)).first()

        # Actualiza la contraseña con la proporcionada en la recuperacion
        conn.execute(
            users.update()
            .values(email=b.email, password=f.encrypt(recover.password.encode("utf-8")))
            .where(users.c.id == b.id)
        )
        return JSONResponse(content={"message": "Exito"}, status_code=200)
    except:
        return JSONResponse(content={"message": "error"}, status_code=400)


# Todo: Genera, registra y envia el codigo de recuperacion
@auth.get("/recover/{email}")
def recover_send(email):
    try:
        # Crea la instancia para recuperar en la bd
        b=conn.execute(users.select().where(users.c.email==email)).first()
        number=random.randint(0, 9999999)
        data={
            "id":number,
            "idowner":b.id
        }
        result = conn.execute(recovers.insert().values(data))

        # Envia el correo con el id y el email
        recoverpassword(data["id"],email)
        return JSONResponse(content={"message": "Exito"}, status_code=200)
    except:
        return JSONResponse(content={"message": "error"}, status_code=400)



# Todo: Comprueba si el correo existe
@auth.post("/exist/")
def exist(email:str):
    try:
        b=conn.execute(users.select().where(users.c.email==email)).first()
        response=False
        if(b != None ):
            response=True
        return JSONResponse(content={"exist": response}, status_code=200)
    except:
        return JSONResponse(content={"message": "error"}, status_code=400)
