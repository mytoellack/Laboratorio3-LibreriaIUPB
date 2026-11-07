import { useState } from "react";

export default function LibreriaSearch({ onConsultarId, onRetirar }) {
  const [id, setId] = useState("");
  return (
    <section className="card">
      <h2>Consulta por ID / Retiro</h2>
      <label>IdLibreria
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Ej: 1" />
      </label>
      <div className="row">
        <button onClick={() => onConsultarId(id)}>Consultar por ID (GET)</button>
        <button className="danger" onClick={() => onRetirar(id)}>Eliminar (DELETE)</button>
      </div>
    </section>
  );
}