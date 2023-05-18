from jwt import encode, decode
from os import getenv
from fastapi.responses import JSONResponse



def write_token(data: dict):
    try:
        #" Con los datos que se le pasa que por lo general es el correo + El salt se egenera el code en H256"
        token = encode(payload={**data}, key=getenv("salt"), algorithm="HS256")
        return token
    except:
        return JSONResponse(content={"error": "Error"}, status_code=400)


def validate_token(token, output=False):
    try:
        if output:
            return decode(token, key=getenv("salt"), algorithms=["HS256"])
        decode(token, key=getenv("salt"), algorithms=["HS256"])
    except:
        return JSONResponse(content={"error": "Error en permisos"}, status_code=401)