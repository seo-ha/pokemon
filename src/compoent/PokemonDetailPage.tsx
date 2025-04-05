import React, { useContext } from 'react'
import PokemonDetail from "./PokemonDetail";
import { MainContext } from './Pokemon';

const PokemonDetailPage:React.FC = () => {

  const {pokemonDetailData, setPokemonDetailData} = useContext(MainContext)

  return (
    <div className={`pokemonDetail ${pokemonDetailData ? 'on' : ''}`}>
      <button className="closeView" onClick={() => setPokemonDetailData(null)}></button>
      {!pokemonDetailData ? (
        <div className="listDefault">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="포켓몬 로고" className="logo" />
        </div>
      ) : (
        <PokemonDetail pokemon={pokemonDetailData} />
      )}
    </div>
  )
}

export default PokemonDetailPage