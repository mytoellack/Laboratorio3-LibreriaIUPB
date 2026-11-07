from pydantic import BaseModel


class Libreria(BaseModel):
    IdLibreria: int
    NombreLibreria: str