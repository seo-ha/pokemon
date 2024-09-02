
function PokemonDetail({pokemon}) {
    
  return (
    <div className="detailBox">
      
      <div className="viewBox">
        <div className="imgBox">
          <img src={pokemon.data.sprites.front_default} alt={pokemon.korean_name} />
        </div>
        <div className="txtBox">
        
          <p className="name">이름 : {pokemon.korean_name} [ { pokemon.genera } ]</p>
        
          <div className="types marginTop">
            <span>속성 : </span>
            {
                pokemon.type.map(({type}, idx)=>{
                    return <span key={idx}>
                                {type.korean_name}
                                {idx < pokemon.type.length - 1 ? ', ' : ''}
                            </span>
                })
            }
          </div>
        
          <div className="ability marginTop">
            <span>특성 : </span>
            {
                pokemon.abilities.map(({ability}, idx)=>{
                    return <span key={idx}>
                                {ability.korean_name}
                                {idx < pokemon.abilities.length - 1 ? ', ' : ''}
                            </span>
                })
            }
          </div>
        
          <p className="name marginTop">특징 : {pokemon.flavor}</p>
        
          <div className="moves marginTop">
            <span>기술 : </span>
            {
                pokemon.move.map(({move}, idx)=>{
                  if (idx < 5) {
                    return <span key={idx}>
                                {
                                  move.korean_name === undefined
                                  ? ''
        
                                  :  move.korean_name.name
                                  }
                                  {idx < 4 ? ', ' : ''}
                            </span>
                  } else {
                    return false;
                  }
                })
            }
          </div>
        
        </div>
      </div>
      
      <div className="btns">
        
          <div className="left">
            
            <div className="flexBox">
              <button className="wid30 bg1"></button>
              <button className="wid70 bg2"></button>
            </div>
            
            <div className="flexBox">
              <button className="wid70 bg3"></button>
              <button className="wid30 bg2"></button>
            </div>
            
            <div className="flexBox">
              <button className="wid100 bg1"></button>
            </div>
            
            <div className="flexBox">
              <button className="wid30 bg2"></button>
              <button className="wid70 bg3"></button>
            </div>
            
          </div>
          
          <div className="right">
              <div className="gridBox">
                <button className="top"></button>
                <button className="left"></button>
                <button className="center"></button>
                <button className="right"></button>
                <button className="bottom"></button>
              </div>
          </div>
          
      </div>
    </div>
  )
}

export default PokemonDetail
