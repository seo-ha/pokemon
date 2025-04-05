import React, { createContext, useCallback, useEffect, useState } from "react";

import { fetchAllpokemonData, pokemonDetailFetch } from "../fetchs/pokemonFetch";
import { Pokemon, PokemonDetailType } from "../types/Data";

import PokemonList from "./PokemonList";
import PokemonDetailPage from "./PokemonDetailPage";

const pokemonPerPage = 20;

export const MainContext = createContext({
  searchInput : '' as string,
  searchList : [] as Pokemon[],
  pokemonData : [] as Pokemon[],
  scrollData : [] as Pokemon[],
  fetchMoerData : () =>{},
  onPokemonDataliData : (id: number, name: string, type: any) =>{},
  srollPageCount : pokemonPerPage as number,
  pokemonDetailData : null as PokemonDetailType | null,
  setPokemonDetailData : (() =>{}) as React.Dispatch<React.SetStateAction<PokemonDetailType | null>>,
});

const PokemonContainer:React.FC = () => {
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
    <MainContext.Provider value={{  
      searchInput, searchList ,pokemonData, scrollData, 
      fetchMoerData, onPokemonDataliData, srollPageCount, 
      pokemonDetailData, setPokemonDetailData
      }}>
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

        <PokemonList/>

        <PokemonDetailPage/>
      </div>
    </MainContext.Provider>
  );
};

export default React.memo(PokemonContainer);
