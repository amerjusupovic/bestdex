import React, { useEffect, useState } from 'react';
import { findCardById } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardPage(props: any) {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(props.selectedCard)
    const cardTypes = ["normal", "holofoil", "reverseHolofoil", "1stEditionHolofoil", "unlimitedHolofoil"];
    const cardTypeTitles = ["Normal", "Holofoil", "Reverse Holofoil", "1st Edition Holo Foil", "Unlimited Holofoil"];

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
            <Grid container justifyContent="center" spacing={2} height="45vh">
                {cardTypes.map((type, index) => { if (currentCard.tcgplayer.prices[type])
                  return (
                <div>
                  <div className="cardpage-markettype">{cardTypeTitles[index]}</div>
                  <Grid item className="results-grid-item" xs={12}>
                      <div className="cardpage-description">Market: &nbsp;</div>
                      <div className="cardpage-normalprice">{"$ " + currentCard.tcgplayer.prices[type].market} &nbsp;</div>
                      <div className="cardpage-description">Low: &nbsp;</div>
                      <div className="cardpage-lowprice">{"$ " + currentCard.tcgplayer.prices[type].low} &nbsp;</div>
                      <div className="cardpage-description">Mid: &nbsp;</div>
                      <div className="cardpage-midprice">{"$ " + currentCard.tcgplayer.prices[type].mid} &nbsp;</div>
                      <div className="cardpage-description">High: &nbsp;</div>
                      <div className="cardpage-highprice">{"$ " + currentCard.tcgplayer.prices[type].high} &nbsp;</div>
                  </Grid>
                </div>)})}
            </Grid>
        </div>
      </div>
    );
  }
  
  export default CardPage;