import "../css/Cards.css";

export default function Nav() {
  return (
    <body id="CardPage">
      <div class="container">
        <div class="card">
          <div class="box">
            <div class="content">
              <h3>Inscripciones</h3>
              <a href="/Inscripciones">Click aqui</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <h3>Materias</h3>
              <a href="/Materias">Click aqui</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <h3>Carreras</h3>
              <a href="/Carreras">Click aqui</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <h3>Alumnos</h3>
              <a href="/Alumnos">Click aqui</a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
