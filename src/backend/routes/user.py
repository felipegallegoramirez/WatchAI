# * Base de datos y API
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from config.db import conn

# * Usuarios
from models.user import users
from schema.userschema import User


# * Importacion del midleware para verificar auth
from middlewares.verifyauth import VerifyTokenRoute


# * Importaciones para encrpitar
from cryptography.fernet import Fernet
key= Fernet.generate_key()
f=Fernet(key)


# ! A las rutas le agregamos el midleware que verifica el token
user = APIRouter(route_class=VerifyTokenRoute)

# TODO: Consulta de todos los usuarios para mostrarlos en la consola del backend
@user.get("/users")
def get_user():
    try:
        data =  conn.execute(users.select()).fetchall()
        print(data)
        return JSONResponse(content={"message": "Mostrado"}, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)


# TODO: Consulta de un usuario en particular
@user.get("/user/{id}")
def create_user(id):
    try:
        a=conn.execute(users.select().where(users.c.id==id)).first()
        if a is None:
            return JSONResponse(content={"message": "Error"}, status_code=400)
        return JSONResponse(content={"email": a.email}, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)


# TODO: Modifica las partes de un usuario
@user.put("/user/{id}")
def update_user(user:User,id):
    try:
        a=conn.execute(users.select().where(users.c.id==id)).first()
        if(user.password==""):
            # Si el campo esta vacio, es decir el usuario no cambio la contraseña, se deja la actual
            user.password=a.password.encode("utf-8")
        conn.execute(
            users.update()
            .values(email=user.email, password=f.encrypt(user.password.encode("utf-8")))
            .where(users.c.id == id)
        )
        return JSONResponse(content={"message": "Listo"}, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)