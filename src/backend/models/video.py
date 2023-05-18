from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

# Creacion y definicion de la tabla para los videos
videos = Table("videos", meta ,
    Column("id", Integer, primary_key=True), 
    Column("title",String(255)),
    Column("linkvideo",String(50000)),
    Column("transcription",String(50000)),
    Column("summary",String(50000)),
    Column("topics",String(50000)),
    Column("connectors",String(50000)),
    Column("questions",String(50000)),
    Column("critique",String(50000)),
    Column("final_grading",String(50000)),
    Column("idowner",Integer), 
    )




meta.create_all(engine)