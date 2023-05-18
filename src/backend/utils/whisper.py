import openai
from os import getenv




# TODO: Le pasa el audio a whisper para que genere la transcripcion
def whisper(route):
    try:
        openai.api_key = getenv("openai")

        audio_file = open(route, "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        return transcript.text
    except NameError as e:
        print(e)
        return False