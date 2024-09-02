
import './App.scss';
import Pokemon from './compoent/Pokemon';
import logo from './assets/logo.png'

function App() {

  return (
    <div className="wrap">
      
      <main>
        
        <header>
          
          <img src={logo} alt="포켓몬 로고" className='logo' />
          
          <div className='ico'>
            <span></span>
          </div>
          
        </header>
        
        <Pokemon/>
        
      </main>
    </div>
  );
}

export default App;
