import { useState } from "react";
import * as svc from "./services/libreriaService";
import LibreriaForm from "./components/LibreriaForm";
import LibreriaSearch from "./components/LibreriaSearch";
import LibreriaList from "./components/LibreriaList";

const ICONOS = { ok: "✓", warn: "⚠", error: "✕" };

export default function App() {
  const [resultado, setResultado] = useState(null);
  const [librerias, setLibrerias] = useState(null);

  // Ejecuta la operación, muestra el resultado y actualiza la tabla si aplica
  const correr = async (operacion, esLista = false) => {
    const r = await operacion();
    setResultado(r);
    if (esLista && r.tipo === "ok") setLibrerias(r.payload);
  };

  return (
    <main>
      <h1>LibreriaIUPB – Frontend Web</h1>
      <p className="sub">React + Vite + Axios · Backend Python en http://127.0.0.1:7000</p>

      <div className="grid">
        <LibreriaForm
          onIngresar={(l) => correr(() => svc.ingresar(l))}
          onModificar={(id, l) => correr(() => svc.modificar(id, l))}
        />
        <LibreriaSearch
          onConsultarId={(id) => correr(() => svc.consultarPorId(id))}
          onRetirar={(id) => correr(() => svc.retirar(id))}
        />
      </div>

      <LibreriaList librerias={librerias} onConsultar={() => correr(svc.consultar, true)} />

      {resultado && (
        <section className={`card resultado ${resultado.tipo}`}>
          <h2>{ICONOS[resultado.tipo]} {resultado.mensaje}</h2>
          {resultado.payload && <pre>{JSON.stringify(resultado.payload, null, 2)}</pre>}
        </section>
      )}
    </main>
  );
}