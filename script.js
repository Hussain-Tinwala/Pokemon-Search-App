let btn = document.getElementById("search-button");
let input = document.getElementById("search-input");

let pokemoneName = document.getElementById("pokemon-name");
let pokemoneId = document.getElementById("pokemon-id");
let weight = document.getElementById('weight');
let height = document.getElementById('height');
let hp = document.getElementById('hp');
let attack = document.getElementById('attack');
let defense = document.getElementById('defense');
let specialAttack = document.getElementById('special-attack');
let specialDefense = document.getElementById('special-defense');
let speed = document.getElementById('speed');
let types = document.getElementById('types');

let imageDiv = document.querySelector('.image-show');
let imgElement = document.createElement('img');
imgElement.id = "sprite";
imageDiv.appendChild(imgElement);

document.getElementById('search-icon').onclick = () => {
    btn.click();
};

function clearPreviousData() {
    pokemoneName.textContent = "";
    pokemoneId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    // types.textContent = "";
    imgElement.src = "";

    types.innerHTML = "";
}

btn.onclick = async () => {
    let pokemonName = input.value.toLowerCase().trim();
    if (!pokemonName) return alert("Please enter a Pokémon name");

    clearPreviousData();

    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Pokémon not found");

        let data = await response.json();

        pokemoneName.textContent = data.name.toUpperCase();
        pokemoneId.textContent = `${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        // types.textContent = data.types.map(type => type.type.name).join(", ").toUpperCase();
        // let typeElement = document.createElement('div'); 
        // typeElement.textContent = data.types.map(type => type.type.name).join(", ").toUpperCase();
        // types.appendChild(typeElement);

        data.types.forEach(type => {
            let typeElement = document.createElement('div');
            typeElement.textContent = type.type.name.toUpperCase();
            types.appendChild(typeElement);
        });

        imgElement.src = data.sprites.front_default;

    } catch (error) {
        alert("Pokémon not found");
    }
};
