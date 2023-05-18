from typing import Optional
from pydantic import BaseModel


# Modelo que manejara la api sobre Videos
class Videos(BaseModel):
    id:Optional[str]
    title:str
    urlvideo:Optional[str]
    transcription:Optional[str]
    summary:Optional[str]
    topics:Optional[str]
    connectors:Optional[str]
    questions:Optional[str]
    critique:Optional[str]
    final_grading:Optional[str]
    idowner:Optional[str]

    class Config:
        orm_mode = True