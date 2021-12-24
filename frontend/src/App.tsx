import React, { useEffect, useState } from 'react';
import { getAllCards, findCardsByQuery, getOneSet } from './Pokemon';
import './App.scss';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Input } from 'antd';

function App() {
  const [cards, setCards] = useState([] as any);

  useEffect(() => {
    async function getData() {
      //const data = await findCardById('xy7-54');
      const data = await findCardsByQuery("name", "Charizard");
      data.sort(() => (Math.random() > .5) ? 1 : -1)
      setCards(data);
      console.log(data);
    }
    getData();
  }, [])

  return (
    <div className="main">
      <div className="sliding-div">
        {cards.map((card: PokemonTCG.Card) => <img className="card-image" src = {card.images.large}/>)}
      </div>
      <div className="search-bar"><Input.Search placeholder="input search text"/></div>
    </div>
  );
}

export default App;
