from typing import Optional
from pydantic import BaseModel


# Modelo que manejara la api sobre User
class User(BaseModel):
    id:Optional[str]
    email:str
    password:str

    class Config:
        orm_mode = True