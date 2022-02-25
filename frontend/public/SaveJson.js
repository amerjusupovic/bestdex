var fs = require('fs');
var PokemonTCG = require('pokemon-tcg-sdk-typescript');

async function findCardsByQuery(type, query) {
    const paramsV2 = { q: type + ':' + query };
    let data = await PokemonTCG.findCardsByQueries(paramsV2)
    .then((cards) => {
        return cards;
    });
    return data;
}

fs.writeFile("charizards.json", JSON.stringify(findCardsByQuery("name", "Charizard")), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );