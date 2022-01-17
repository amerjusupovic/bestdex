import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getAllCards, findCardsByQuery, getOneSet } from './Pokemon';
import './App.scss';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([] as any);
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useState({ q: "" })
  const ref = useRef(null);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollLeft = 20000;  // 700 ~= 1 card
    }
    ref.current = node;               
  },[cards])

  useEffect(() => {
    async function getData() {
      const data = await findCardsByQuery("name", "Charizard");
      data.sort(() => (Math.random() > .5) ? 1 : -1)
      setCards(data);
      console.log(data);
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        if (params.q) {
          navigate("/search?q=" + params.q)
        }
			} catch (err) {
				console.error(err);
			}
    }
    getData();
  }, [params]);


  function handleSearch(e: any) {
    if (!e.key || e.key === "Enter") {
      setParams({...params, q: searchQuery});
    }
  }

  function handleSearchInput(e: any) {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="main">
      <div ref={setRef} className="sliding-div">
        {cards.map((card: PokemonTCG.Card) => <img className="card-image" src = {card.images.large}/>)}
      </div>
      <div className= "title">Welcome to Bestdex</div>
      <div className="search-bar"><Input.Search className="search-input" placeholder="SEARCH FOR A CARD" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/></div>
    </div>
  );
}

export default App;