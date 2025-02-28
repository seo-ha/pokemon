import "./App.scss";
import Pokemon from "./compoent/Pokemon";

function App() {
  return (
    <div className="wrap">
      <main>
        <header>
          <img src="/assets/logo.png" alt="포켓몬 로고" className="logo" />

          <div className="ico">
            <span></span>
          </div>
        </header>

        <Pokemon />
      </main>
    </div>
  );
}

export default App;
