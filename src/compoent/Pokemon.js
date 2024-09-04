
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetail from './PokemonDetail';
import logo from '../assets/logo.png'
import pokeball from '../assets/pokeball.png';
import { pokemonFetch } from "../fetchs/pokemonFetch";
import { pokemonAllFetch } from "../fetchs/pokemonAllFetch";

const Pokemon = () => {
   
    const [pokemonData, setPokemonData] = useState([])
    const [serchpokemonData, setSerchPokemonData] = useState([])
    const [pokemonDetailData, setPokemonDetailData] = useState([]);
    const [searchList, setSearchList] = useState();
    const [currentpage, setCurrentpage] = useState(1);
    const [searchPokemonLenght, setSearchPokemonLenght] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const view = document.querySelector('.pokemonDetail');
    const pokemonPerPage = 30;

    
    //포켓몬 api
    useEffect(() => {
        
        pokemonAllFetch(setSerchPokemonData);
        pokemonFetch({setPokemonData, currentpage, pokemonPerPage});
        
    },[currentpage])
    
    const fetchMoerData = ()=> {
        setCurrentpage((prevPage) => prevPage + 1);
        console.log('MORE');
        
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
            var searchDataList = serchpokemonData.filter((item)=> item.korean_name.includes(e.target.value))
            
            setSearchList(searchDataList);
            setSearchPokemonLenght(searchDataList.length);
        }
    }
    
    return (
        <div className="content">
            
            <input className={serchpokemonData.length > 0 ? 'on' : ''} type="search" name="" id="search" placeholder={serchpokemonData.length > 0 ? 'search...' : 'loading..'} value={searchInput} onChange={(e)=>search(e)} disabled={serchpokemonData.length > 0 ? false : true}/>
          
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