from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer
from config.db import meta, engine

# Creacion y definicion de la tabla para recuperar cuenta
recovers = Table("recover", meta ,
    Column("id", Integer, primary_key=True), 
    Column("idowner",Integer))


meta.create_all(engine)