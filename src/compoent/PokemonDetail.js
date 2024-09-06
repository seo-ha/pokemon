
function PokemonDetail({pokemon}) {

  const txts = document.querySelectorAll('.light');
  
  let moveIdx = 0;
  
  const moveTop = () => {
    if (moveIdx > 4 ) {
      moveIdx = 0;
    }
    for (let i = 0; i < 5; i++) {
      
      var targetClass = txts[i];
  
      if(i === moveIdx) {
        targetClass.classList.add('on')
      } else {
        targetClass.classList.remove('on')
      }
      
      // console.log(txts[i].classList);
      
      
    }
    moveIdx ++ ;
  }
  
  const moveBottom = () => {
    if (moveIdx < 0) {
      moveIdx = 4;
    }
    for (let i = 0; i < 5; i++) {
      
      var targetClass = txts[i];
      
      if(i === moveIdx) {
        targetClass.classList.add('on')
      } else {
        targetClass.classList.remove('on')
      }
    }
    
    moveIdx -- ;
  }
    
  return (
    <div className="detailBox">
      
      <div className="viewBox">
        <div className="imgBox">
          <img src={pokemon[0].data.sprites.other.showdown.front_default} alt={pokemon[0].korean_name} />
        </div>
        <div className="txtBox">
        
          <p className="name light">이름 : {pokemon[0].korean_name} [ { pokemon[0].genera } ]</p>
        
          <div className="types marginTop light">
            <span>속성 : </span>
            {
                pokemon[0].type.map(({type}, idx)=>{
                    return <span key={idx}>
                                {type.korean_name}
                                {idx < pokemon[0].type.length - 1 ? ', ' : ''}
                            </span>
                })
            }
          </div>
        
          <div className="ability marginTop light">
            <span>특성 : </span>
            {
                pokemon[0].abilities.map(({ability}, idx)=>{
                    return <span key={idx}>
                                {ability.korean_name}
                                {idx < pokemon[0].abilities.length - 1 ? ', ' : ''}
                            </span>
                })
            }
          </div>
        
          <p className="name marginTop light">특징 : {pokemon[0].flavor}</p>
        
          <div className="moves marginTop light">
            <span>기술 : </span>
            {
                pokemon[0].move.map(({move}, idx)=>{
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
            
            <div className="flexBox mHide">
              <button className="wid30 bg2"></button>
              <button className="wid70 bg3"></button>
            </div>
            
          </div>
          
          <div className="right">
              <div className="gridBox">
                <button className="top" onClick={moveBottom}></button>
                <button className="left"></button>
                <button className="center"></button>
                <button className="right"></button>
                <button className="bottom"onClick={moveTop}></button>
              </div>
          </div>
          
      </div>
    </div>
  )
}

export default PokemonDetail
