import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetail from './PokemonDetail';
import logo from '../assets/logo.png'
import pokeball from '../assets/pokeball.png';

const Pokemon = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [currentpage, setCurrentpage] = useState(1);
    const [pokemonDetailData, setPokemonDetailData] = useState([]);
    const [searchList, setSearchList] = useState();
    const pokemonPerPage = 20;
    const totalPokemon = 151;
    const [searchPokemonLenght, setSearchPokemonLenght] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const view = document.querySelector('.pokemonDetail');
    
    //포켓몬 api
    useEffect(() => {
        const fetchData = async()=>{
            const allPokemonData = [];
            for (let i = 1; i <= Math.min(currentpage * pokemonPerPage, totalPokemon) ; i++) {
                
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
                const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
                const koreanGenera = speciesResponse.data.genera.find(name => name.language.name === 'ko').genus;
                const koreanFlavor = speciesResponse.data.flavor_text_entries.find(name => name.language.name === 'ko').flavor_text;
                
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
                    flavor : koreanFlavor
                });
            }
            setPokemonData(allPokemonData);
        };
        fetchData();
    },[currentpage])
 
    const fetchMoerData = ()=> {
        setCurrentpage((prevPage) => prevPage + 1);
    };
    
    const onPokemonDataliData = (idx, item)=> {
        
        var items = document.querySelectorAll('.listUl .item');
        
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('on');
        };
        
        idx.parentNode.classList.add('on');
        view.classList.add('on');
        setPokemonDetailData([item]); 

    };
    
    const onCloseView = ()=> {
        view.classList.remove('on');
    };

    //포켓몬 검색
    const search = (e) =>{
    
        setSearchInput(e.target.value);
        
        if(searchInput.length >= 0) {
            var searchDataList = pokemonData.filter((item)=>{
                    return item.korean_name.toLowerCase().includes(searchInput?.toLowerCase());
                    
            })
            
            setSearchList(searchDataList);
            setSearchPokemonLenght(searchDataList.length);
        }
        
    }
    
    return (
        <div className="content">
            
            <input type="search" name="" id="search" placeholder='Search..' value={searchInput} onChange={(e)=>search(e)}/>
          
            <div className="pokemonList">
             
                <InfiniteScroll
                    height={'100%'}
                    dataLength={searchInput.length <= 0 ? pokemonData.length : searchPokemonLenght.length}
                    next={searchInput.length <= 0 ? fetchMoerData : ''}
                    hasMore={searchInput.length <= 0 ? currentpage * pokemonPerPage < 151 : ''}
                    loader={<div className="loading"><img src={pokeball} alt="loading"/></div>}
                    className="container"
                >
                    <ul className="listUl">
                        {
                            searchInput.length <= 0 
                            ? pokemonData.map((item)=>{
                            return <li key={item.data.id} className="item">
                                    <button onClick={(e)=>onPokemonDataliData(e.target,item)}>
                                        <img src={item.data.sprites.front_default} alt={item.korean_name} />
                                        <p>{item.korean_name}</p>
                                        <div className="types">
                                            {
                                                item.type.map(({type}, idx)=>{
                                                    return <span key={idx} className={type.name}>
                                                                {type.korean_name}
                                                            </span>
                                                })
                                            }
                                        </div>
                                    </button>
                                </li>
                            })
                            : searchList.map((item)=>{
                            return <li key={item.data.id} className="item">
                                    <button onClick={(e)=>onPokemonDataliData(e.target,item)}>
                                        <img src={item.data.sprites.front_default} alt={item.korean_name} />
                                        <p>{item.korean_name}</p>
                                        <div className="types">
                                            {
                                                item.type.map(({type}, idx)=>{
                                                    return <span key={idx} className={type.name}>
                                                                {type.korean_name}
                                                            </span>
                                                })
                                            }
                                        </div>
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                </InfiniteScroll>
                      
            </div>
            
            <div className="pokemonDetail">
                <button className="closeView" onClick={()=>onCloseView()}></button>
                {
                    pokemonDetailData.length === 0
                    ? <div className="listDefault"><img src={logo} alt="포켓몬 로고" className='logo' /></div>
                    : <PokemonDetail pokemon={pokemonDetailData[0]}/>
                }
            </div>
            
        </div>
    )
}

export default Pokemon;