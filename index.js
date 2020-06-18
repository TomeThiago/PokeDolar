const api = require('axios');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

async function getDolar() {
    let response = await api.get('https://economia.awesomeapi.com.br/json/usd');
    let dolar = parseFloat(response.data[0].ask);
    return dolar.toFixed(2);
}

async function getPokemon(numero) {
    const response = await api.get(`https://pokeapi.co/api/v2/pokemon-form/${numero}/`);
    const { id, name, sprites } = response.data;
    const pokemon = `{"id": ${id}, "name": "${name.capitalize()}", "photo": "${sprites.front_default}"}`;
    return pokemon;
}

exports.handler = async (event) => {
    const dolar = await getDolar();
    const numeroPokemon = dolar * 100;
    const pokemon = await getPokemon(numeroPokemon);
    
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: pokemon,
    };
    return response;
};