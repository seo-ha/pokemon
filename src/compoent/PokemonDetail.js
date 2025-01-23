import React, { useState } from "react";

function PokemonDetail({ pokemon }) {
  const [moveIdx, setMoveIdx] = useState(0);
  const viewHight = document.querySelector(".viewBox");

  const moveBottom = () => {
    setMoveIdx((prevIdx) => (prevIdx + 1) % pokemon.move.length);

    if (moveIdx === 3) {
      viewHight.scrollTo({ top: viewHight.scrollHeight, behavior: "smooth" });
    } else if (moveIdx === 4) {
      viewHight.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const moveTop = () => {
    setMoveIdx((prevIdx) => (prevIdx - 1 + pokemon.move.length) % pokemon.move.length);

    if (moveIdx === 0) {
      viewHight.scrollTo({ top: viewHight.scrollHeight, behavior: "smooth" });
    } else if (moveIdx === 1) {
      viewHight.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="detailBox">
      <div className="viewBox">
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
            {pokemon.move.map((move, idx) => {
              return (
                <span key={idx}>
                  {move.korean_name && move.korean_name.name ? move.korean_name.name : ""}
                  {idx < pokemon.move.length - 1 ? ", " : ""}
                </span>
              );
            })}
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
