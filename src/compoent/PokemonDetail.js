import React from "react";

function PokemonDetail({pokemon}) {

  let moveIdx = 0;
  
  const moveTop = () => {
    
    let txts = document.querySelectorAll('.light');
    if (moveIdx > txts.length ) {
      moveIdx = 0;
    }
    for (let i = 0; i < txts.length; i++) {
      
      if(i === moveIdx) {
        txts[i].classList.add('on')
      } else {
        txts[i].classList.remove('on')
      }
      
    }
    moveIdx ++ ;
    
  }
  
  const moveBottom = () => {
    let txts = document.querySelectorAll('.light');
    
    if (moveIdx < 0) {
      moveIdx = txts.length - 1;
    }
    for (let i = 0; i < txts.length; i++) {
      
      if(i === moveIdx) {
        txts[i]?.classList.add('on')
      } else {
        txts[i]?.classList.remove('on')
      }
    }
    
    moveIdx -- ;
  }
  
  return (
    <div className="detailBox">
      
      <div className="viewBox">
        <div className="imgBox">
          <img src={pokemon.img} alt={pokemon.korean_name}  loading="lazy"/>
        </div>
        <div className="txtBox">
        
          <p className="name light">이름 : {pokemon.korean_name} [ { pokemon.genera } ]</p>
        
          <div className="types marginTop light">
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
        
          <div className="ability marginTop light">
            <span>특성 : </span>
            {
                pokemon.abilities.map((ability, idx)=>{
                    return <span key={idx}>
                                {ability.korean_name}
                                {idx < pokemon.abilities.length - 1 ? ', ' : ''}
                            </span>
                })
            }
          </div>
        
          <p className="name marginTop light">특징 : {pokemon.flavor}</p>
        
          <div className="moves marginTop light">
            <span>기술 : </span>
            {
                pokemon.move.map((move, idx)=>{
                  return <span key={idx}>
                              {
                                move.korean_name === undefined
                                ? ''
                                :  move.korean_name.name
                                }
                                {idx < 4 ? ', ' : ''}
                          </span>
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
            
            <div className="flexBox mHide">
              <button className="wid30 bg2"></button>
              <button className="wid70 bg3"></button>
            </div>
            
          </div>
          
          <div className="right">
              <div className="gridBox">
                <button className="top" onClick={() => moveBottom()}></button>
                <button className="left"></button>
                <button className="center"></button>
                <button className="right"></button>
                <button className="bottom"onClick={() => moveTop()}></button>
              </div>
          </div>
          
      </div>
    </div>
  )
}

export default React.memo(PokemonDetail)
