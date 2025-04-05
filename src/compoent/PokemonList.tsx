import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { MainContext } from './Pokemon';
import { TiStarOutline, TiStarFullOutline  } from "react-icons/ti";

const StarIcon = TiStarOutline as unknown as React.FC;
const StarFullIcon = TiStarFullOutline  as unknown as React.FC;

const PokemonList:React.FC = () => {

  const {searchInput, searchList ,pokemonData, scrollData, fetchMoerData, onPokemonDataliData, srollPageCount} = useContext(MainContext);
  const [star, setStar] = useState<number[]>([])
  const [changeList, setChangeList] = useState<boolean>(false)
  
  const clickStarList = pokemonData.filter( (item) => star.includes(item.id))
  
  const onClickStar = (id:number)=>{
    setStar((prev) => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  }

  const onClickStarList = () =>{
    setChangeList(!changeList);
  }
  
  useEffect(()=>{
    const saved = localStorage.getItem('star');
    
    if(saved) {
      setStar(JSON.parse(saved))
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem('star', JSON.stringify(star));
  },[star])

  return (
    <div className="pokemonList">

        <button className='change-list' onClick={()=> onClickStarList()}>
          {changeList ? <StarFullIcon/> : <StarIcon/>}
        </button>

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
            !changeList ?
            <div className="loading">
              <img src={`${process.env.PUBLIC_URL}/assets/pokeball.png`} alt="loading" />
            </div>
            : ''
          }
          className="container"
        >
          <ul className="listUl">
            {(searchInput.length === 0 ? changeList ? clickStarList : scrollData : searchList).map((item) => (
              <li key={item.id} className="item">
                <button className={`star ${ star.includes(item.id) ? 'on' : ''}`} onClick={()=>onClickStar(item.id)}>{ star.includes(item.id) ? <StarFullIcon /> : <StarIcon />}</button>
                <button className='link' onClick={()=>onPokemonDataliData(item.id, item.korean_name, item.type)}>
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
  )
}

export default PokemonList