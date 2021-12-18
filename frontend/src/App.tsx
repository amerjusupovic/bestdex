import React, { useEffect, useState } from 'react';
import { getAllCards, findCardsByQuery } from './Pokemon';
import './App.scss';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

function App() {
  const [cards, setCards] = useState([] as any);

  useEffect(() => {
    async function getData() {
      //const data = await findCardById('xy7-54');
      const data = await findCardsByQuery("set", "swsh8");
      data.sort(() => (Math.random() > .5) ? 1 : -1)
      setCards(data);
    }
    getData();
  }, [])

  return (
    <div className="main">
      <div className="sliding-div">
        {cards.map((card: PokemonTCG.Card) => <img className="card-image" src = {card.images.large}/>)}
      </div>
    </div>
  );
}

export default App;
