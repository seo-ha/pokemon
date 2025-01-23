import axios from "axios";
const totalPokemon = 151;

//20개의 리스트를 가져오고 스크롤시 20개 추가
export const pokemonFetch = ({
  setPokemonData,
  currentpage,
  pokemonPerPage,
}) => {
  const fetchData = async () => {
    const limit = Math.min(currentpage * pokemonPerPage, totalPokemon);

    // 1. 포켓몬 기본 정보 병렬로 가져오기
    const pokemonRequests = Array.from({ length: limit }, (_, i) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
    );

    // 2. 포켓몬 species 정보 병렬로 가져오기
    const speciesRequests = Array.from({ length: limit }, (_, i) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
    );

    try {
      const pokemonResponses = await Promise.all(pokemonRequests);
      const speciesResponses = await Promise.all(speciesRequests);

      // 3. 데이터 변환 및 type 이름 변환 병렬 처리
      const pokemonData = await Promise.all(
        pokemonResponses.map(async (response, i) => {
          const speciesResponse = speciesResponses[i];
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );

          // 타입별 한국어 이름 병렬 처리
          const typesWithKoreanNames = await Promise.all(
            response.data.types.map(async (type) => {
              const typeResponse = await axios.get(type.type.url);
              const koreanTypeName = typeResponse.data.names.find(
                (name) => name.language.name === "ko"
              ).name;
              return { type: { ...type.type, korean_name: koreanTypeName } };
            })
          );

          // 최종 데이터 생성
          return {
            id: speciesResponse.data.id,
            korean_name: koreanName.name, // 한국어 이름이 없을 때 기본값 설정
            img: pokemonResponses[i].data.sprites.other["official-artwork"]
              .front_default,
            type: typesWithKoreanNames,
          };
        })
      );

      setPokemonData(pokemonData);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  fetchData();
};

//디테일 내용 가져오기
export const pokemonDetailFetch = ({
  id,
  name,
  type,
  setPokemonDetailData,
}) => {
  const fetchAllData = async () => {
    try {
      const [response, speciesResponse] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);

      const imageGif = response.data.sprites.other.showdown.front_default;
      const koreanGenera = speciesResponse.data.genera.find(
        (name) => name.language.name === "ko"
      ).genus;
      const koreanFlavor = speciesResponse.data.flavor_text_entries.find(
        (name) => name.language.name === "ko"
      ).flavor_text;

      const abilitiesWithKoreanNames = await Promise.all(
        response.data.abilities.map(async (ability) => {
          const abilityResponse = await axios.get(ability.ability.url);
          const koreanAbilityName = abilityResponse.data.names.find(
            (name) => name.language.name === "ko"
          ).name;
          return { korean_name: koreanAbilityName };
        })
      );

      const movesWithKoreanNames = await Promise.all(
        response.data.moves.slice(0, 5).map(async (move) => {
          const moveResponse = await axios.get(move.move.url);
          const koreanMoveName = moveResponse.data.names.find(
            (name) => name.language.name === "ko"
          );
          return { korean_name: koreanMoveName };
        })
      );

      //최종 데이터
      const allPokemonData = [
        {
          korean_name: name,
          img: imageGif,
          type: type,
          abilities: abilitiesWithKoreanNames,
          move: movesWithKoreanNames,
          genera: koreanGenera,
          flavor: koreanFlavor,
        },
      ];

      setPokemonDetailData(allPokemonData);
    } catch (error) {}
  };

  fetchAllData();
};

//전체 리스트 가져오기 (pokemonFetch만 사용했을때 검색에 안 나오는 경우가 있어서 전체를 받아옴)
export const pokemonAllFetch = (setSerchPokemonData) => {
  const fetchDataAll = async () => {
    const pokemonRequsets = Array.from({ length: totalPokemon }, (_, i) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
    );

    const speciesRequsets = Array.from({ length: totalPokemon }, (_, i) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
    );

    try {
      const pokemonResponses = await Promise.all(pokemonRequsets);
      const speciesResponses = await Promise.all(speciesRequsets);

      const pokemonData = await Promise.all(
        pokemonResponses.map(async (response, i) => {
          const speciesResponse = speciesResponses[i];
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );

          // 타입별 한국어 이름 병렬 처리
          const typesWithKoreanNames = await Promise.all(
            response.data.types.map(async (type) => {
              const typeResponse = await axios.get(type.type.url);
              const koreanTypeName = typeResponse.data.names.find(
                (name) => name.language.name === "ko"
              ).name;
              return { type: { ...type.type, korean_name: koreanTypeName } };
            })
          );
          // 최종 데이터 생성
          return {
            id: speciesResponse.data.id,
            korean_name: koreanName.name, // 한국어 이름이 없을 때 기본값 설정
            img: pokemonResponses[i].data.sprites.other["official-artwork"]
              .front_default,
            type: typesWithKoreanNames,
          };
        })
      );

      setSerchPokemonData(pokemonData);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };
  fetchDataAll();
};
