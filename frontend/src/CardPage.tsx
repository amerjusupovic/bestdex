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

    return (
      <div className="cardpage-main">
        <img className="cardpage-card" src = {currentCard.images.large}/>
        <div className="cardpage-info">
            <div className="cardpage-name">{currentCard.name}</div>
            <div className="cardpage-header">{currentCard.supertype}</div>
        </div>
      </div>
    );
  }
  
  export default CardPage;