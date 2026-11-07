export default function LibreriaList({ librerias, onConsultar }) {
  return (
    <section className="card">
      <h2>Consulta general</h2>
      <button onClick={onConsultar}>Consultar (GET)</button>
      {librerias && (
        <table>
          <thead><tr><th>IdLibreria</th><th>NombreLibreria</th></tr></thead>
          <tbody>
            {librerias.length === 0 && <tr><td colSpan="2">Sin registros</td></tr>}
            {librerias.map((l) => (
              <tr key={l.IdLibreria}><td>{l.IdLibreria}</td><td>{l.NombreLibreria}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}