import React, { useEffect, useState } from 'react';
import { findCardById } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardPage(props: any) {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(props.selectedCard)
    // const colors = ["purple", "green", "red"]
    // const titles = ["normal market", "normal low", "normal mid"]
    // {titles.map(() => <div className={"cardpage-title-" + colors[index]}/>)}

    useEffect(() => {
      async function getData() {
        let url : string = window.location.href as string;
        url = url.split("=").pop() || "";
        console.log(url);
        const data = await findCardById(url);
        if (data.name) {
          setCurrentCard(data);
          console.log(data);
        } else {
          // error page
        }
      }
      if (!currentCard.name) {
        getData();
      }
    }, [props])

    return (!currentCard.name ? <div>wait a sec</div> :
      <div className="cardpage-main">
        <img className="cardpage-card" src = {currentCard.images.large}/>
        <div className="cardpage-info">
            <div className="cardpage-name">{currentCard.name}</div>
            <div className="cardpage-header">{currentCard.supertype + " | " + currentCard.subtypes}</div>

            <Grid container justifyContent="center" spacing={2}>
                <Grid item className="results-grid-item" xs={3}>
                    <div className="cardpage-description">Market: &nbsp;</div>
                    <div className="cardpage-normalprice">{"$ " + currentCard.tcgplayer.prices.holofoil.market} &nbsp;</div>
                    <div className="cardpage-description">Low: &nbsp;</div>
                    <div className="cardpage-lowprice">{"$ " + currentCard.tcgplayer.prices.holofoil.low} &nbsp;</div>
                    <div className="cardpage-description">Mid: &nbsp;</div>
                    <div className="cardpage-midprice">{"$ " + currentCard.tcgplayer.prices.holofoil.mid} &nbsp;</div>
                    <div className="cardpage-description">High: &nbsp;</div>
                    <div className="cardpage-highprice">{"$ " + currentCard.tcgplayer.prices.holofoil.high} &nbsp;</div>
                </Grid>)
            </Grid>
        </div>
      </div>
    );
  }
  
  export default CardPage;