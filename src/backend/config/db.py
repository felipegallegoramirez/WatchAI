
# *Importacion conexion base de datos
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool


# ! Conexion base de datos mediante url haciendo uso de la libreria psycong2 como intermediario
engine = create_engine("postgresql+psycopg2://root:qEe8dDQFI7jrO6UTsLJsc1OzGRTX1WpV@dpg-chi3av3hp8u7g2djriag-a.oregon-postgres.render.com/watchai", poolclass=QueuePool)
meta = MetaData()
conn = engine.connect()