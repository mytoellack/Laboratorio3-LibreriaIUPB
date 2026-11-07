from fastapi import APIRouter, HTTPException
from domain.entitylibreria import Libreria

router = APIRouter(prefix="/api/librerias", tags=["Librerias"])

# Almacenamiento temporal en memoria
librerias: list[Libreria] = [Libreria(IdLibreria=1, NombreLibreria="Librería IUPB")]


def buscar(id: int) -> Libreria:
    for lib in librerias:
        if lib.IdLibreria == id:
            return lib
    raise HTTPException(status_code=404, detail="Librería no encontrada")


@router.get("")
def consultar():
    return librerias


@router.get("/{id}")
def consultar_por_id(id: int):
    return buscar(id)


@router.post("", status_code=201)
def ingresar(libreria: Libreria):
    if any(l.IdLibreria == libreria.IdLibreria for l in librerias):
        raise HTTPException(status_code=409, detail="Ya existe una librería con ese Id")
    librerias.append(libreria)
    return {"mensaje": "Ingreso realizado", "libreria": libreria}


@router.put("/{id}")
def modificar(id: int, libreria: Libreria):
    actual = buscar(id)
    actual.NombreLibreria = libreria.NombreLibreria
    return {"mensaje": "Modificación realizada", "libreria": actual}


@router.delete("/{id}")
def retirar(id: int):
    librerias.remove(buscar(id))
    return {"mensaje": "Eliminación realizada"}