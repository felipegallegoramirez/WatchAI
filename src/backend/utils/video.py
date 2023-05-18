
from moviepy.editor import *

#  TODO: Toma el archivo, le saca el audio y lo coloca en la carpeta correspondiente
def convert_video_to_audio_moviepy(ruta_entrada, name,output_ext="mp3"):
    try:
        clip = AudioFileClip(ruta_entrada)
        clip.write_audiofile(f"{name}.{output_ext}")
        clip.close()
    except:
        return False

# TODO: Toma el archivo y comprueba la duracion
def video_duration(filename):
    try:
        clip = VideoFileClip(filename)
        duration = clip.duration
        clip.close()
        return duration
    except:
        return False