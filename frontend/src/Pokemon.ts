import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
//import React from 'react'
const dotenv = require('dotenv');
dotenv.config();

async function findCardById(id: string){
    let data = {} as any;
    data = await PokemonTCG.findCardByID(id)
    .then((card: PokemonTCG.Card) => {
        return card;
    });
    return data;
}

async function findCardsByQuery(type: string, query: string) {
    const paramsV2: PokemonTCG.Parameter = { q: type + ':' + query };
    let data: PokemonTCG.Card[] = await PokemonTCG.findCardsByQueries(paramsV2)
    .then((cards: PokemonTCG.Card[]) => {
        return cards;
    });
    return data;
}

async function getOneSet(id: string) {
    let data: PokemonTCG.Set = await PokemonTCG.findSetByID(id)
    .then((cards: PokemonTCG.Set) => {
        return cards;
    });
    return data;
}

async function getAllCards(){
    let data: PokemonTCG.Card[] = await PokemonTCG.getAllCards()
    .then((cards: PokemonTCG.Card[]) => {
        return cards;
    });
    return data;
}

export { findCardById, findCardsByQuery, getAllCards, getOneSet };