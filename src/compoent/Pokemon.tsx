import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllpokemonData, pokemonDetailFetch } from "../fetchs/pokemonFetch";
import { Pokemon, PokemonDetailType } from "../types/Data";
import PokemonDetail from "./PokemonDetail";

const pokemonPerPage = 20;

const PokemonList:React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); //전체 포켓몬 데이터
  const [scrollData, setScrollData] = useState<Pokemon[]>([]); //InfiniteScroll 데이터
  const [pokemonDetailData, setPokemonDetailData] = useState<PokemonDetailType | null>(null);
  const [searchList, setSearchList] = useState<Pokemon[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const [srollPageCount, setScrollPageCount] = useState<number>(pokemonPerPage);

  useEffect(() => {
    //포켓몬 데이터 받아오기
    const loadData = async () =>{
      const data = await fetchAllpokemonData();
      setPokemonData(data);
      setScrollData(data.slice(0, pokemonPerPage));
    };
    loadData();
  }, []);

  //스크롤을 내렸을때 페이지 추가하기
  const fetchMoerData = useCallback(() => {
    setScrollPageCount((prev) => Math.min(prev + pokemonPerPage, pokemonData.length));
  },[pokemonData.length]);

  useEffect(() => {
    setScrollData(pokemonData.slice(0, srollPageCount));
  }, [srollPageCount, pokemonData]);

  //포켓몬 디테일 페이지
  const onPokemonDataliData = useCallback((id:number, name:string, type:any) => {
    setPokemonDetailData(null);
    pokemonDetailFetch({ id, name, type, setPokemonDetailData : ([data]) =>{
      setPokemonDetailData(data? {id, ...data} : null)
    } });
  },[]);

  //포켓몬 검색
  const onSearchChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchList(value.length > 0 ? pokemonData.filter((item)=> item.korean_name.includes(value)) : []);
  },[pokemonData]);

  return (
    <div className="content">
      <input
        className={pokemonData.length > 0 ? "on" : ""}
        type="search"
        id="search"
        placeholder={pokemonData.length > 0 ? "search..." : "loading.."}
        value={searchInput}
        onChange={(e) => onSearchChange(e)}
        disabled={pokemonData.length > 0 ? false : true}
      />

      <div className="pokemonList">
        <InfiniteScroll
          height={"100%"}
          dataLength={
            searchInput.length <= 0
              ? scrollData.length
              : searchList.length
          }
          next={searchInput.length === 0 ? fetchMoerData : ()=>{}}
          hasMore={searchInput.length === 0 && srollPageCount < pokemonData.length }
          loader={
            <div className="loading">
              <img src='/assets/pokeball.png' alt="loading" />
            </div>
          }
          className="container"
        >
          <ul className="listUl">
            {(searchInput.length === 0 ? scrollData : searchList).map((item) => (
              <li key={item.id} className="item">
                <button onClick={()=>onPokemonDataliData(item.id, item.korean_name, item.type)}>
                  <img src={item.img} alt={item.korean_name} loading="lazy" />
                  <p>{item.korean_name}</p>
                  <div className="types">
                    {item.type.map(({type}, idx) => (
                      <span key={idx} className={type.name}>{type.korean_name}</span>
                    ))}
                  </div>
                </button>
              </li>
            ))}
              
          </ul>
        </InfiniteScroll>
      </div>

      <div className={`pokemonDetali ${pokemonDetailData ? 'on' : ''}`}>
        <button className="closeView" onClick={() => setPokemonDetailData(null)}></button>
        {!pokemonDetailData ? (
          <div className="listDefault">
            <img src='/assets/logo.png' alt="포켓몬 로고" className="logo" />
          </div>
        ) : (
          <PokemonDetail pokemon={pokemonDetailData} />
        )}
      </div>
    </div>
  );
};

export default React.memo(PokemonList);
