import { useEffect, useState } from 'react';
import { findCardById } from './Pokemon';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';

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
    }, [props, currentCard.name])

    function navigateHome(e: any) {
      navigate("/");
    }

    return (!currentCard.name ? <div>wait a sec</div> :
      <div className="cardpage-outside">
          <div className="search-header-div">
            <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
            <div className="search-bar-header-title">BESTDEX</div>
            <SearchBar/>
          </div>
      <div className="cardpage-main">
        <div className="cardpage-card-div">
          <img className="cardpage-card" src = {currentCard.images.large} alt="card"/>
        </div>
        <div className="cardpage-info">
            <div className="cardpage-name">{currentCard.name}</div>
            <div className="cardpage-header">{currentCard.supertype + " | " + currentCard.subtypes + " | " + currentCard.number}</div>
            <Grid container justifyContent="left" spacing={2} height="45vh">
                {cardTypes.map((type, index) => { if (currentCard.tcgplayer.prices[type]) {
                  return (
                <div className="cardpage-marketinfo-div" key={index}>
                  <div className="cardpage-markettype">{cardTypeTitles[index]}</div>
                  <Grid item className="cardpage-grid" xs={12}>
                      <div className="cardpage-description">Market: &nbsp;
                        <div className="cardpage-normalprice">{"$ " + currentCard.tcgplayer.prices[type].market} &nbsp;</div>
                      </div>
                      <div className="cardpage-description">Low: &nbsp;
                        <div className="cardpage-lowprice">{"$ " + currentCard.tcgplayer.prices[type].low} &nbsp;</div>
                      </div>
                      <div className="cardpage-description">Mid: &nbsp;
                        <div className="cardpage-midprice">{"$ " + currentCard.tcgplayer.prices[type].mid} &nbsp;</div>
                      </div>
                      <div className="cardpage-description">High: &nbsp;
                        <div className="cardpage-highprice">{"$ " + currentCard.tcgplayer.prices[type].high} &nbsp;</div>
                      </div>
                  </Grid>
                </div>)} else {return undefined}})}
                <div className="cardpage-extra-info">
                  <div className="cardpage-market-pair">
                    <div className="cardpage-markettype extra-info">Artist:</div>
                    <div className="cardpage-description extra-info">&nbsp; &nbsp;{currentCard.artist} &nbsp;</div>
                  </div>
                  <div className="cardpage-market-pair">
                    <div className="cardpage-markettype extra-info">Rarity:</div>
                    <div className="cardpage-description extra-info">&nbsp; &nbsp;{currentCard.rarity} &nbsp;</div>
                  </div>
                  <div className="cardpage-markettype extra-info">Set:
                    <img className="cardpage-setlogo" src={currentCard.set.images.logo} alt="card set logo"></img>
                  </div>
                </div>
            </Grid>
        </div>
      </div>
      </div>
    );
  }
  
  export default CardPage;