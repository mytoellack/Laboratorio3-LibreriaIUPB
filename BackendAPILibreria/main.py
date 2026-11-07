import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from presentation.webapilibreria import router

app = FastAPI(title="LibreriaIUPB - Backend API")

# Permite que el Frontend React (Vite) consuma la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=7000)