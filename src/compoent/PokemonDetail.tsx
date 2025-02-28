import React, { useEffect, useRef, useState } from "react";
import { PokemonDetailType } from './../types/Data';

interface Props {
  pokemon : PokemonDetailType
}

const PokemonDetail:React.FC<Props> = ({pokemon}) => {
  const [moveIdx, setMoveIdx] = useState(0);
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(!viewRef.current) return;

    if(moveIdx === 3) {
      viewRef.current.scrollTo({top : viewRef.current.scrollHeight, behavior:'smooth'});
    } else if(moveIdx === 4 ) {
      viewRef.current.scrollTo({top : 0, behavior:'smooth'});
    }
  },[moveIdx])

  const moveBottom = () => {
    if(!pokemon.move || pokemon.move.length === 0) return;
    setMoveIdx((prevIdx) => (prevIdx + 1) % pokemon.move.length);
  };

  const moveTop = () => {
    if(!pokemon.move || pokemon.move.length === 0) return;
    setMoveIdx((prevIdx) => (prevIdx - 1 + pokemon.move.length) % pokemon.move.length);
  };

  return (
    <div className="detailBox">
      <div className="viewBox" ref={viewRef}>
        <div className="imgBox">
          <img src={pokemon.img} alt={pokemon.korean_name} loading="lazy" />
        </div>
        <div className="txtBox">
          <p className={moveIdx === 0 ? "name item on" : "name item"}>
            이름 : {pokemon.korean_name} [ {pokemon.genera} ]
          </p>

          <div className={moveIdx === 1 ? "types item on" : "types item"}>
            <span>속성 : </span>
            {pokemon.type.map(({ type }, idx) => {
              return (
                <span key={idx}>
                  {type.korean_name}
                  {idx < pokemon.type.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>

          <div className={moveIdx === 2 ? "ability item on" : "ability item"}>
            <span>특성 : </span>
            {pokemon.abilities.map((ability, idx) => {
              return (
                <span key={idx}>
                  {ability.korean_name}
                  {idx < pokemon.abilities.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>

          <p className={moveIdx === 3 ? "name item on" : "name item"}>특징 : {pokemon.flavor}</p>

          <div className={moveIdx === 4 ? "moves item on" : "moves item"}>
            <span>기술 : </span>
            { pokemon.move && pokemon.move.map((move, idx) => (
              <span key={idx}>
                {move.korean_name}
                {idx < pokemon.move.length - 1 ? "," : ''}
              </span>
            ))}
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
        </div>

        <div className="right">
          <div className="gridBox">
            <button className="top" onClick={() => moveTop()}></button>
            <button className="left"></button>
            <button className="center"></button>
            <button className="right"></button>
            <button className="bottom" onClick={() => moveBottom()}></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PokemonDetail);
