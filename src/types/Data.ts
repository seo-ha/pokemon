export interface Pokemon {
    id : number;
    korean_name : string;
    img : string;
    type : {  type : {
      name : string;
      korean_name : string;
    }}[];
  }
  
export interface PokemonDetailType {
    id? : number,
    korean_name: string;
    img: string;
    type: { type: { name: string; korean_name: string } }[];
    abilities: { korean_name: string }[];
    move: { korean_name: string }[];
    genera: string;
    flavor: string;
  }