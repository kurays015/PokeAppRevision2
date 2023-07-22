import {filterPokemon} from './filterPokemons.js';
import { pokemonAbilitiesData } from './displayAllPokemonss.js';
import { setupPlusIconClickEvent } from './teamModal.js'
import { searchAndRenderedPokemonsModal } from './searchAndRenderedPokemonModal.js'
// import { fetchPokemonGeneration1 } from './pokemonGenerations.js'




//home/ logo icon
const pokeBallLogo = document.querySelector('.pokemon-logo');
//modal for pokemon team selected
const modalContainer = document.querySelector('.modal');
const addedPokemon = document.querySelector('.add-to-team');
const modalInfo = document.querySelector('.modal-info');
const modalExit = document.querySelector('.modal-exit');

//modal for types,rendered pokemon, search pokemon
const displayAllModal = document.querySelector('.displayAllModal');
const fetchTypeModal = document.querySelector('.fetchTypeModal');

//type icon
const icons = document.querySelectorAll('.icon');

//plus icon
const fetchAllTypesPlusIcon = '<i class="fa-solid fa-square-plus fetchAllTypes-plusIcon"></i>';
const searchPokemonPlusIcon = '<i class="fa-solid fa-square-plus searchPokemon-plusIcon"></i>';
const displayAllPlusIcon = '<i class="fa-solid fa-square-plus displayAll-plusIcon"></i>'; 

//pokemon containers
const pokemonTypesContainer = document.querySelector('.pokemonTypesContainer');
const renderedPokemons = document.querySelector('.rendered-pokemons');

//pokemon generations containers
const generation1 = document.querySelector('.generation1');
const generation2 = document.querySelector('.generation2');
const generation3 = document.querySelector('.generation3');
const generation4 = document.querySelector('.generation4');
const generation5 = document.querySelector('.generation5');
const generation6 = document.querySelector('.generation6');
const generation7 = document.querySelector('.generation7');
const generation8 = document.querySelector('.generation8');
const generation9 = document.querySelector('.generation9');

//alert sa mga di pa tapos gawin
const alertMessage = document.querySelectorAll('.alert');

//everytime you clicked the plus icon, the pokemon data will push to this array
const selectedPokemons = [];

//poke search
const searchBar = document.querySelector('.pokemon-search');


//back icon
// const backIcon = document.querySelector('.back-icon');

//back arrow
const backArrowIcon = document.querySelector('.long-arrow');

//loader
const loaderContainer = document.querySelector('#loaderContainer');


// -------pokemon load more---------
let fetchPokemonPerPage = 20;
let pageNumber = 1; 

// //main data
const allPokemons = async () => {

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${fetchPokemonPerPage}&offset=${(pageNumber - 1) * fetchPokemonPerPage}`);    
    const data = await response.json();
    filterPokemon(data.results);
    pokemonAbilitiesData(data.results);
  }catch (error) {
    console.log(error)
  }
}
allPokemons()

// ----------end----------







//pokeball logo rotate animation
const pokeBallAnimation = () => {
  pokeBallLogo.classList.toggle('animation');
}
setInterval(pokeBallAnimation, 3000)


pokeBallLogo.addEventListener('click', () => {
  location.reload();
})


//search bar for pokemon
searchBar.addEventListener('keydown',  (event) => {
  if (event.key === 'Enter') {
    const pokemon = searchBar.value;
    searchBar.value = '';
    loaderContainer.style.display = 'block';

    setTimeout(() => {
      searchPokemon(pokemon);
      loaderContainer.style.display = 'none';      
    }, 2000)
    
    //back arrow button
    backArrowIcon.style.display = 'none';
  }
});

const searchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(response.ok) {
      const pokemonAbilitiesData = await response.json();
      const typeNames = pokemonAbilitiesData.types.map(type => type.type.name).join(', ');
      displaySearchedPokemons(pokemonAbilitiesData, typeNames);
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
   
  } catch (error) {
    alert('Pokemon Not Found, small caps and full name only')
  }
};


// Function to display pokemon
const displaySearchedPokemons = async (pokemonAbilitiesData, typeNames) => {

  renderedPokemons.innerHTML = '';

  const pokemonHTML = `
    <div class="page-load-cards">
      <img class="poke-img" src="${pokemonAbilitiesData.sprites.other.dream_world.front_default}">
      <h1 class="pokemon-name">${pokemonAbilitiesData.name}</h1>
      <p class="poke-types" title="Add to team">${searchPokemonPlusIcon} ${typeNames}</p>
    </div>
  `;
  renderedPokemons.innerHTML = pokemonHTML;

  //each clicked on the plus icon is added to the selectedPokemons empty array
  setupPlusIconClickEvent(selectedPokemons);

  const pokemonImage = document.querySelectorAll('.poke-img');
  pokemonImage.forEach(img => {
    img.addEventListener('click', async () => {
      displayAllModal.innerHTML = '';  
      await searchAndRenderedPokemonsModal(pokemonAbilitiesData)

      displayAllModal.showModal();
      displayAllModal.classList.add('zoom-in');
    });
  });
}





export { 
  modalContainer, 
  addedPokemon, 
  modalInfo, 
  modalExit, 
  displayAllModal, 
  fetchTypeModal, 
  icons, 
  fetchAllTypesPlusIcon, 
  searchPokemonPlusIcon, 
  displayAllPlusIcon,  
  pokemonTypesContainer, 
  renderedPokemons, 
  alertMessage, 
  selectedPokemons, 
  loaderContainer,
  searchBar,  
  backArrowIcon,
  generation1,
  generation2,
  generation3,
  generation4,
  generation5,
  generation6,
  generation7,
  generation8,
  generation9
};

