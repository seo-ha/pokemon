
function PokemonDetail({pokemon}) {
    
  return (
    <div>
      {pokemon.korean_name}<br/><br/>
    
       {
            pokemon.type.map(({type}, idx)=>{
                return <span key={idx}>
                            {type.korean_name}
                        </span>
            })
        }<br/><br/>
       { pokemon.genera }<br/><br/>
       { pokemon.flavor }<br/><br/>
       {
            pokemon.type.map(({type}, idx)=>{
                return <span key={idx}>
                            {type.korean_name}
                        </span>
            })
        }<br/><br/>
       {
            pokemon.abilities.map(({ability}, idx)=>{
                return <span key={idx}>
                            {ability.korean_name}
                        </span>
            })
        } <br/><br/>
       {
            pokemon.move.map(({move}, idx)=>{
                return <span key={idx}>
                            {
                              move.korean_name === undefined
                              ? ''
                              
                              :  move.korean_name.name
                              }
                        </span>
            })
        }
    </div>
  )
}

export default PokemonDetail
