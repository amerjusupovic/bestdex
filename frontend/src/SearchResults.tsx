import React, { useEffect, useState } from 'react';
import { getAllCards, findCardsByQuery, getOneSet } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";

function SearchResults() {
    const [results, setResults] = useState([] as any);

    useEffect(() => {
        async function getData() {
          let url : string = window.location.href as string;
          url = url.split("=").pop() || "";
          const data = await findCardsByQuery("name", url);
          data.sort(() => (Math.random() > .5) ? 1 : -1)
          setResults(data);
          console.log(data);
        }
        getData();
      }, [])

    return (
        <div className="results-main">
          <div className="results-cards">
            <Grid container justifyContent="center" spacing={1}>
              {results.map((card: PokemonTCG.Card) => <Grid item className="results-grid-item" xs={3}><img className="results-card-image" src = {card.images.large}/></Grid>)}
            </Grid>
          </div>
        </div>
    );
  }
  
  export default SearchResults;