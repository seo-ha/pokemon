import axios from "axios";
import React from "react";
const totalPokemon = 151;

export const pokemonFetch = ({setPokemonData,currentpage,pokemonPerPage}) => {
    
    const pokemonData = [];
    const fetchData = async()=>{
        for (let i = 1; i <= Math.min(currentpage * pokemonPerPage, totalPokemon) ; i++) {
            
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
            const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
            
            const typesWithKoreanNames = await Promise.all(
                response.data.types.map(async (type) => {
                  const typeResponse = await axios.get(type.type.url);
                  const koreanTypeName = typeResponse.data.names.find(
                    (name) => name.language.name === 'ko'
                  ).name;
                  return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
                })
            );
            
            //최종 데이터
            pokemonData.push({
                ...response,
                korean_name: koreanName.name, 
                type : typesWithKoreanNames,
            });
            
        }
        setPokemonData(pokemonData);
       
    };
 
    fetchData()
}

export const pokemonDetailFetch = ({ id, setPokemonDetailData}) => {

    const fetchData = async()=>{
        const allPokemonData = [];
   
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
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
        
       
        setPokemonDetailData([allPokemonData]); 
       
    };
    
    fetchData()
}
