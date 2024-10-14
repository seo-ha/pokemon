
import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetail from './PokemonDetail';
import logo from '../assets/logo.png'
import pokeball from '../assets/pokeball.png';
import { pokemonFetch } from "../fetchs/pokemonFetch";
import { pokemonDetailFetch } from "../fetchs/pokemonFetch";
import { pokemonAllFetch } from "../fetchs/pokemonAllFetch";

const Pokemon = () => {
   
    const [pokemonData, setPokemonData] = useState([])
    const [searchPokemonData, setSerchPokemonData] = useState([])
    const [pokemonDetailData, setPokemonDetailData] = useState([]);
    const [searchList, setSearchList] = useState();
    const [currentpage, setCurrentpage] = useState(1);
    const [searchPokemonLenght, setSearchPokemonLenght] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const view = document.querySelector('.pokemonDetail');
    const pokemonPerPage = 20;

    
    //포켓몬 api 받아오기
    
    useEffect(() => {
        pokemonFetch({setPokemonData, currentpage, pokemonPerPage});  
        
    },[pokemonData.length, currentpage,])
    
    
    useMemo(() => pokemonAllFetch(setSerchPokemonData), [searchPokemonData.length])  
 
    
    //스크롤을 내렸을때 페이지 추가하기
    const fetchMoerData = ()=> {
        setCurrentpage((prevPage) => prevPage + 1);
    };
    
    //포켓몬 디테일 페이지 
    const onPokemonDataliData = (idx, id, name, type)=> {
      
        pokemonDetailFetch({id, name, type, setPokemonDetailData});
        
        var items = document.querySelectorAll('.listUl .item');
        const detailTxts = document.querySelectorAll('.light');

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('on');
        };
        
        for (let i = 0; i < detailTxts.length; i++) {
            detailTxts[i].classList.remove('on')
        }
        
        idx.parentNode.classList.add('on');
        view.classList.add('on');
        
    };
    
    //모바일에서 디테일 페이지 닫기 버튼
    const onCloseView = ()=> {
        view.classList.remove('on');
    };

    //포켓몬 검색
    const search = (e) =>{
    
        setSearchInput(e.target.value);
        
        if(searchInput.length >= 0) {
            var searchDataList = searchPokemonData.filter((item)=> item.korean_name.includes(e.target.value))
            
            setSearchList(searchDataList);
            setSearchPokemonLenght(searchDataList.length);
        }
    }
    
    return (
        <div className="content">
            
            <input className={searchPokemonData.length > 0 ? 'on' : ''} type="search" name="" id="search" placeholder={searchPokemonData.length > 0 ? 'search...' : 'loading..'} value={searchInput} onChange={(e)=>search(e)} disabled={searchPokemonData.length > 0 ? false : true}/>
          
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
                                    <button onClick={(e)=> onPokemonDataliData(e.target, item.data.id, item.korean_name, item.type) }>
                                        <img src={item.data.sprites.other["official-artwork"].front_default} alt={item.korean_name} loading="lazy"/>
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
                            return <li key={item.id} className="item">
                                    <button onClick={(e)=>onPokemonDataliData(e.target, item.data.id, item.korean_name, item.type)}>
                                        <img src={item.img} alt={item.korean_name}  loading="lazy"/>
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

export default React.memo(Pokemon);