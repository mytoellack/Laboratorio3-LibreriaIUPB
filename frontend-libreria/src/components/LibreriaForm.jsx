import { useState } from "react";

// Convierte a número solo si el texto es numérico (el Backend valida el resto)
const aValor = (t) => (t.trim() !== "" && !isNaN(t) ? Number(t) : t);

export default function LibreriaForm({ onIngresar, onModificar }) {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const armar = () => ({ IdLibreria: aValor(id), NombreLibreria: nombre });

  return (
    <section className="card">
      <h2>Ingreso / Modificación</h2>
      <label>IdLibreria
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Ej: 2" />
      </label>
      <label>NombreLibreria
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Librería Central" />
      </label>
      <div className="row">
        <button onClick={() => onIngresar(armar())}>Ingresar (POST)</button>
        <button className="sec" onClick={() => onModificar(id, armar())}>Modificar (PUT)</button>
      </div>
    </section>
  );
}