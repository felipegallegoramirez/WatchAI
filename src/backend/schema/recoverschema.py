from typing import Optional
from pydantic import BaseModel


# Modelo que manejara la api sobre Recover
class Recover(BaseModel):
    id:Optional[str]
    password:str
    idowner:Optional[str]

    class Config:
        orm_mode = True