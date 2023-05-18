import openai
from os import getenv





def chat(trans:str):
    try:
        openai.api_key = getenv("openai")

        # Promt con el que se generara la respuesta acorde
        promt="""Al siguiente texto es la transcripcion de un video generale un resumen, cuales fueron los 2 temas claves y una descripcion complementaria, revisa los  conectores explica recomendaciones sobre los conectores y genera recomendaciones, genera preguntas que puedan surgir y por ultimo crea una critica como si fueras un profesor pero no lo bases solo en los conectores, califica la redaccion y coherencia y la respuesta generalo como un json y para las comillas que no son del json utiliza ' ' y no respondas nada fuera del json y la calificacion final que solo sea del 0 al 10 ejemplo "7/10" y solo limitate a responder lo siguiente:
    {
    "resumen":"...",
    "temas":"...",
    "critica_conectores":"...",
    "preguntas:"...",
    "critica:"...",
    "calificacion_final":"..."
    }
        
        
        """
        # Une el promt y la transcripcion
        content=promt+trans
        # Hace la peticion
        response=openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=[{"role":"user","content":content}])

        return response.choices[0].message.content
    except NameError as e:
        print(e)
        return False