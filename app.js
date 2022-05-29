const fetchpokemon = () => {
    const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let cont = 1; cont <= 150; cont++) {
        pokemonPromises.push(fetch(getpokemonUrl(cont)).then(response => response.json()))

    }
    Promise.all(pokemonPromises)
        .then(pokemons => {



            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                
                <li class="card ${types[0]}">
                
                    <img glass="card-image ${types[0]}"  alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</p>
            
                </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}

fetchpokemon()