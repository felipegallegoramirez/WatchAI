
# * Basico python
import random
import shutil
import os

# * Importacion del midleware para verificar auth
from middlewares.verifyauth import VerifyTokenRoute

# * Base de datos y API
from config.db import conn
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse,JSONResponse

# * Videos
from schema.videoschema import Videos
from models.video import videos

# * Manejo archivos
from utils.video import convert_video_to_audio_moviepy,video_duration

# * Uso Api OpenAI
from utils.whisper import whisper
from utils.gpt import chat

# ! A las rutas le agregamos el midleware que verifica el token
video = APIRouter(route_class=VerifyTokenRoute)
# ! Peticion del archivo sin auth
watchvideo= APIRouter()

# TODO: Subida y procesamiento del video
@video.post("/uploadfile/{name}/{id}")
async def create_upload_file(name,id,file: UploadFile = File(...)):
    try:
        # Guardamos los datos datos en el stream
        with open(file.filename, "wb") as myfile:
            content = await file.read()
            myfile.write(content)
            myfile.close()

        num = random.randint(0, 999999999999) 
        # Toma el nombre del archivo
        rname, extension = os.path.splitext(file.filename)
        # Verifica que el tamaño del video no supere los 5 minutos
        if(video_duration(file.filename)>300):
            # Esto es porque no me quiero gastar todo lo de openAI
            os.remove(f"{os.getcwd()}/{file.filename}")
            return JSONResponse(content={"message":"Video supera los 5 minutos"}, status_code=400)
        
        # Genera un nuevo nombre para que no hayan problemas por si suben videos iguales
        num = random.randint(0, 999999999999) 

        # Mueve el archivo a la carpeta
        shutil.move(file.filename, f"videos/{num}{extension}")
        # Toma el audio del archivo y lo coloca en la carpeta de audio
        convert_video_to_audio_moviepy(f"videos/{num}{extension}",f"audio/{num}")

        # Saca la transcripcion del audio con whisper
        transcription=whisper(f"audio/{num}.mp3")
        # Genera la respuesta con ChatGpt-Turbo 3.5
        gpt=chat(transcription)
        # ChatGpt devuelve como si fuera json, lo divido por ""
        gpt=gpt.split('"')
        data={
        "title":name,
        "linkvideo":f"{num}{extension}",
        "transcription":transcription,
        "summary":gpt[3],
        "topics":gpt[7],
        "connectors":gpt[11],
        "questions":gpt[15],
        "critique":gpt[19],
        "final_grading":gpt[23],
        "idowner":int(id)
        }

        # Guarda los datos en la bd
        result=conn.execute(videos.insert().values(data))
        response=conn.execute(videos.select().where(videos.c.idowner == id)).fetchall()

        return JSONResponse(content={"id":response[len(response)-1].id}, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)



# TODO: Eliminacion del video y de todos los archivos
@video.delete("/videos/{id}")
async def delete_video(id: str):
    try:
        # Toma los datos para luego poderlos eliminar
        response=conn.execute(videos.select().where(videos.c.id == id)).first()
        # Elimina el registro en la BD
        conn.execute(videos.delete().where(videos.c.id == id))

        # Elimina el video de la carpeta
        os.remove(f"{os.getcwd()}/videos/{response.linkvideo}")
        archi=response.linkvideo.split("/")
        rname, extension = os.path.splitext(archi[1])

        # Elimina el audio de la carpeta
        os.remove(f"{os.getcwd()}/audio/{rname}.mp3")
        return JSONResponse(content={"message":"Eliminado"}, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)



# TODO: Devuelve un video e especifico
@video.get("/video/{id}")
def get_video(id: str):
    try:
        response=conn.execute(videos.select().where(videos.c.id == id)).first()
        data={}
        # Si no encuentra ningun video
        if (response ==None):
            return JSONResponse(content={"message": "error"}, status_code=400)
        data={
            "title":response.title,
            "linkvideo":response.linkvideo,
            "transcription":response.transcription,
            "summary":response.summary,
            "topics":response.topics,
            "connectors":response.connectors,
            "questions":response.questions,
            "critique":response.critique,
            "final_grading":response.final_grading,
            }
        return JSONResponse(content=data, status_code=200)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)


# TODO: Devuelve la lista de videos asociadas a una cuenta
@video.get("/videos/{id}")
def get_videos(id: str):
    response=conn.execute(videos.select().where(videos.c.idowner == id)).fetchall()
    data=[]
    for i in range(0,len(response)):
        data.append({
            "title":response[i].title,
            "id":response[i].id,
        })
    return JSONResponse(content=data, status_code=200)

# Todo: Devuelve el archivo para que sea visibilizado en el frontend
@watchvideo.get("/resource/{filename}")
async def read_videos(filename: str):
    try:
        video_path =f"videos/{filename}"
        return FileResponse(video_path)
    except NameError as e:
        print(e)
        return JSONResponse(content={"message": "error"}, status_code=400)
