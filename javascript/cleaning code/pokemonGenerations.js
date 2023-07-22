const pokemonAbilitiesDataArray = [];
const renderedPokemons = document.querySelector('.rendered-pokemons');
const generationButtons = document.querySelectorAll('.generation-button');
const generationsContainer = document.querySelector('.generations-container');
const pokemonTypesContainer = document.querySelector('.pokemonTypesContainer');
const loaderContainer = document.querySelector('#loaderContainer');

//fetch all pokemons function
const fetchPokemonData = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1281');
    const allPokemonsData = await response.json();
    //passed allPokemonsData to fetchAbilities as arguments
    await fetchAbilities(allPokemonsData);
    fetchGenerations();
  } catch (error) {
    console.log(error);
  }
};

//loop in the passed allPokemonData of fetchPokemonData function to fetchAbilities function and push the pokemonAbilitiesData in pokemonAbilitiesDataArray
const fetchAbilities = async (allPokemonsData) => {
  try {
    for (const pokemon of allPokemonsData.results) {
      const response = await fetch(pokemon.url);
      const pokemonAbilitiesData = await response.json();
      pokemonAbilitiesDataArray.push(pokemonAbilitiesData);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchGenerations = async () => {
  try {
    const generationURLs = [
      'https://pokeapi.co/api/v2/generation/1',
      'https://pokeapi.co/api/v2/generation/2',
      'https://pokeapi.co/api/v2/generation/3',
      'https://pokeapi.co/api/v2/generation/4',
      'https://pokeapi.co/api/v2/generation/5',
      'https://pokeapi.co/api/v2/generation/6',
      'https://pokeapi.co/api/v2/generation/7',
      'https://pokeapi.co/api/v2/generation/8',
      'https://pokeapi.co/api/v2/generation/9',
    ];

    const responses = await Promise.all(generationURLs.map(url => fetch(url)));
    const generationsData = await Promise.all(responses.map(response => response.json()));
    

    generationButtons.forEach((button, index) => {
      //getting each pokemon species array in each generations
      const generationData = generationsData[index].pokemon_species;
      button.addEventListener('click', () => renderGenerationPokemons(generationData));
    });
  } catch (error) {
    console.log(error);
  }
};

const renderPokemonCard = (pokemonData) => {
  const { sprites, name, types } = pokemonData;
  const typeNames = types.map(type => type.type.name).join(', ');

  return `
    <div class="page-load-cards">
      <img class="poke-img" src="${sprites.other.home.front_default}">
      <h1 class="pokemon-name">${name}</h1>
      <p class="" title="Add to team">${typeNames}</p>
    </div>
  `;
};

const renderGenerationPokemons = async (generationData) => {
  generationsContainer.innerHTML = '';

  for (const pokemon of generationData) {
    const pokemonData = pokemonAbilitiesDataArray.find(pokemons => pokemons.name === pokemon.name);
    if (pokemonData) {
      setTimeout(() => {
        const pokemonHTML =  renderPokemonCard(pokemonData);
        generationsContainer.innerHTML += pokemonHTML;
        loaderContainer.style.display = 'none';
      }, 1500)

    }
  }
  renderedPokemons.style.display = 'none';
  pokemonTypesContainer.style.display = 'none';
  loaderContainer.style.display = 'block';
};

fetchPokemonData();
