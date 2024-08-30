
import './App.scss';
import Pokemon from './compoent/Pokemon';
import logo from './assets/logo.png'

function App() {
 
  return (
    <div className="wrap">
      
      <main>
        
        <header>
          
          <img src={logo} alt="포켓몬 로고" className='logo' />
          
          <h1>포켓몬 도감</h1>
          
        </header>
        
        <Pokemon/>
        
      </main>
    </div>
  );
}

export default App;
