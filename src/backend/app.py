from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

#Rutas
from routes.user import user
from routes.auth import auth
from routes.video import video,watchvideo



app = FastAPI()


# ! Rutas permitidas para la peticion
origins = ["*"]


# ! Configuracion de los 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ! Incluye las rutas
app.include_router(user)
app.include_router(auth)
app.include_router(video)
app.include_router(watchvideo)



load_dotenv()