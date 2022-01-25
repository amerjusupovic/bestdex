import React, { useEffect, useState } from 'react';
import { findCardsByQuery } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import CardPage from "./CardPage";
import { Input } from 'antd';

function SearchResults(props: any) {
    const navigate = useNavigate();
    const [results, setResults] = useState([] as any);
    const [cardId, setCardId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [params, setParams] = useState({ q: "" })

    async function getData() {
      let url : string = window.location.href as string;
      url = url.split("=").pop() || "";
      const data = await findCardsByQuery("name", url);
      setResults(data);
      console.log(data);
    }

    useEffect(() => {
        getData();
      }, [params])

    useEffect(() => {
      const navigateSearch = async () => {
        try {
          if (params.q) {
            navigate("/search?q=" + params.q)
          }
        } catch (err) {
          console.error(err);
        }
      }
      navigateSearch();
      getData();
    }, [params, navigate]);

    useEffect(() => {
      const setCurrentCard = async () => {
        try {
          if (cardId) {
            props.setSelectedCard(results.find((val: any) => cardId === val.id))
            navigate("/card?id=" + cardId)
          }
        } catch (err) {
          console.error(err);
        }
      }
      setCurrentCard();
    }, [cardId, navigate, props, results])

    function handleCardClick(e: any) {
      setCardId(e.target.id);
    }

    function handleSearch(e: any) {
      if (!e.key || e.key === "Enter") {
        setParams({...params, q: searchQuery});
      }
    }
  
    function handleSearchInput(e: any) {
      setSearchQuery(e.target.value)
    }

    function navigateHome(e: any) {
      navigate("/");
    }

    return (
        <div>
          <div className="search-header-div">
            <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
            <div className="search-bar-header-title">BESTDEX</div>
            <div className="search-bar-header-input">
              <Input.Search className="search-input search-bar-header-scale" placeholder="SEARCH FOR A CARD" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/>
            </div>
          </div>
          <div className="results-main">
            <div className="results-cards">
              <Grid container justifyContent="center" spacing={1}>
                {results.map((card: PokemonTCG.Card) =>
                  <Grid item className="results-grid-item" xs={3} key={card.id}>
                    <img className="results-card-image" src={card.images.large} onClick={handleCardClick} id={card.id} alt="card"/>
                  </Grid>)}
              </Grid>
            </div>
          </div>
        </div>
    );
  }
  
  export default SearchResults;