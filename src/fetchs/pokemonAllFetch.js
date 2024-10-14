import axios from "axios";
const totalPokemon = 151;

export const pokemonAllFetch = (setSerchPokemonData) => {
    
    const allPokemonData = [];
    
    const fetchData = async()=>{
        for (let i = 1; i <= totalPokemon ; i++) {
            
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
            allPokemonData.push({ 
                id : response.data.id,
                img : response.data.sprites.other["official-artwork"].front_default,
                korean_name: koreanName.name, 
                type : typesWithKoreanNames,
            });
        }
        setSerchPokemonData(allPokemonData);
       
    };
    
    fetchData()
}

