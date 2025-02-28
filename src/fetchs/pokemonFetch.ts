import axios from "axios";
import { Pokemon, PokemonDetailType } from "../types/Data";

//포켓몬 데이터 받아오기
export const fetchPokemonData = async (id:number): Promise<Pokemon> =>{
  try {
    const [pokemonResponses, speciesResponse] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
  
    const pokemon = pokemonResponses.data;
    const species = speciesResponse.data;
  
    const koreanName = species.names.find((name:any) => name.language.name === "ko")?.name
  
    const typesWithKoreanNames = await Promise.all(
      pokemon.types.map(async (type : any) => {
        const typeResponse = await axios.get(type.type.url);
        const koreanTypeName = typeResponse.data.names.find(
          (name : any) => name.language.name === "ko"
        ).name;
        return { type: { ...type.type, korean_name: koreanTypeName } };
      })
    );
  
    //최종 데이터
    return {
      id: species.id,
      korean_name: koreanName,
      img: pokemon.sprites.other["official-artwork"].front_default,
      type: typesWithKoreanNames,
    };

  } catch(err) {
    console.log('에러발생', err);
   
    return {
      id,
      korean_name : '',
      img : '',
      type: [],
    };
  }
}

export const fetchAllpokemonData = async (): Promise<Pokemon[]> => {
  try {
    const pokemonData = await Promise.all(
      Array.from({length:151},(_,i)=> fetchPokemonData(i + 1))
    );
    return pokemonData;
  } catch (err) {
    console.log('에러발생', err);
    return [];
  }
}


//디테일 내용 가져오기
export const pokemonDetailFetch = async ({
  id,
  name,
  type,
  setPokemonDetailData,
} : {
  id:number;
  name : string;
  type : {type : {name:string; korean_name : string }}[];
  setPokemonDetailData : (data:PokemonDetailType[]) => void
}) => {
  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const pokemon = pokemonResponse.data;
    const species = speciesResponse.data;

    const imageGif = pokemon.sprites.other.showdown.front_default;
    const koreanGenera = species.genera.find((genus: any) => genus.language.name === "ko")?.genus;
    const koreanFlavor = species.flavor_text_entries.find((flavor : any) => flavor.language.name === "ko")?.flavor_text;

    //포켓몬 기술 한국어 이름 가져오기
    const abilitiesWithKoreanNames = await Promise.all(
      pokemon.abilities.map(async (ability : any) => {
        const abilityResponse = await axios.get(ability.ability.url);
        const koreanAbilityName = abilityResponse.data.names.find( (name : any) => name.language.name === "ko")?.name;
        return { korean_name: koreanAbilityName };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      pokemon.moves.slice(0, 5).map(async (move : any) => {
        const moveResponse = await axios.get(move.move.url);
        const koreanMoveName = moveResponse.data.names.find( (name : any) => name.language.name === "ko")?.name;
        return { korean_name: koreanMoveName };
      })
    );

    //최종 데이터
    setPokemonDetailData([{
      korean_name: name,
      img: imageGif,
      type,
      abilities: abilitiesWithKoreanNames,
      move: movesWithKoreanNames,
      genera: koreanGenera,
      flavor: koreanFlavor
    }]);
  } catch (error) {
    console.log('에러 발생', error);
    
  }
};

