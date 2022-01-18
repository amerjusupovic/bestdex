import React, { useEffect, useState } from 'react';
import { getAllCards, findCardsByQuery, getOneSet } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardPage from "./CardPage";

function SearchResults(props: any) {
    const navigate = useNavigate();
    const [results, setResults] = useState([] as any);
    const [cardId, setCardId] = useState("");

    useEffect(() => {
        async function getData() {
          let url : string = window.location.href as string;
          url = url.split("=").pop() || "";
          const data = await findCardsByQuery("name", url);
          setResults(data);
          console.log(data);
        }
        getData();
      }, [])

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
    }, [cardId])

    function handleCardClick(e: any) {
      setCardId(e.target.id);
    }

    return (
        <div className="results-main">
          <div className="results-cards">
            <Grid container justifyContent="center" spacing={1}>
              {results.map((card: PokemonTCG.Card) =>
                <Grid item className="results-grid-item" xs={3}>
                  <img className="results-card-image" src={card.images.large} onClick={handleCardClick} id={card.id}/>
                </Grid>)}
            </Grid>
          </div>
        </div>
    );
  }
  
  export default SearchResults;