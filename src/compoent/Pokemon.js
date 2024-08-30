import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetail from './PokemonDetail';
import pokeball from '../assets/pokeball.png';

const Pokemon = () => {
    
    const [pokemonData, setPokemonData] = useState([])
    const [currentpage, setCurrentpage] = useState(1);
    const [pokemonDetailData, setPokemonDetailData] = useState([]);
    const pokemonPerPage = 10;
    const totalPokemon = 151
    
    useEffect(() => {
        const fetchData = async()=>{
            const allPokemonData = [];
            for (let i = 1; i <= Math.min(currentpage * pokemonPerPage, totalPokemon) ; i++) {
                
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
                const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
                const koreanGenera = speciesResponse.data.genera.find(name => name.language.name === 'ko').genus;
                const koreanReFlavor = speciesResponse.data.flavor_text_entries.find(name => name.language.name === 'ko').flavor_text
                
                
                const typesWithKoreanNames = await Promise.all(
                    response.data.types.map(async (type) => {
                      const typeResponse = await axios.get(type.type.url);
                      const koreanTypeName = typeResponse.data.names.find(
                        (name) => name.language.name === 'ko'
                      ).name;
                      return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
                    })
                );
                
                const abilitiesWithKoreanNames = await Promise.all(
                    response.data.abilities.map(async (ability)=>{
                        const abilityResponse = await axios.get(ability.ability.url)
                        const koreanAbilityName = abilityResponse.data.names.find(
                            (name) => name.language.name === 'ko'
                        ).name;
                        return { ...ability, ability: { ...ability.ability, korean_name: koreanAbilityName } };
                        
                    })
                )
                
                const movesWithKoreanNames = await Promise.all(
                    response.data.moves.map(async (move) => {
                      const moveResponse = await axios.get(move.move.url);
                      const koreanMoveName = moveResponse.data.names.find(
                        (name) => name.language.name === 'ko'
                    );
                      
                    return { ...move, move: { ...move.move, korean_name: koreanMoveName} };

                    })
                );
                
                //최종 데이터
                allPokemonData.push({ 
                    ...response,
                    korean_name: koreanName.name, 
                    type : typesWithKoreanNames,
                    abilities : abilitiesWithKoreanNames,
                    move : movesWithKoreanNames,
                    genera : koreanGenera,
                    flavor : koreanReFlavor
                });
            }
            setPokemonData(allPokemonData);
        };
        fetchData()
    },[currentpage])
    
    
    const fetchMoerData = ()=> {
        setCurrentpage((prevPage) => prevPage + 1)
    }
    
    
    const onPokemonDataliData = (item)=> {
        
        setPokemonDetailData([item]) 
        
    }
    
    return (
        <div className="content">
            <div className="pokemonList">
                <InfiniteScroll
                    dataLength={pokemonData.length}
                    next={fetchMoerData}
                    hasMore={currentpage * pokemonPerPage < 151}
                    loader={<div className="loading"><img src={pokeball} alt=""/></div>}
                    className="container"
                >
                <ul>
                    {
                        pokemonData.map((item)=>{
                            return <li key={item.data.id} className="item">
                
                                    <img src={item.data.sprites.front_default} alt="" />
                                    <p>{item.korean_name}</p>
                                    <button type="button" onClick={()=>onPokemonDataliData(item)}>qjxms</button>
                            </li>
                        })
                    }
                </ul>
                </InfiniteScroll>
            </div>
            
            <div className="pokemonDetail">
                {
                    pokemonDetailData.length === 0
                    ? <div>리스트 djqt음</div>
                    : <PokemonDetail pokemon={pokemonDetailData[0]}/>
                }
            </div>
            
        </div>
    )
}

export default Pokemon;