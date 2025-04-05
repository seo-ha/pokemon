import "./App.scss";
import PokemonContainer from "./compoent/Pokemon";

function App() {
  return (
    <div className="wrap">
      <main>
        <header style={{'--header' : `url(${process.env.PUBLIC_URL}/assets/header.svg)`}}>
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="포켓몬 로고" className="logo" />

          <div className="ico">
            <span></span>
          </div>
        </header>

        <PokemonContainer />
      </main>
    </div>
  );
}

export default App;
