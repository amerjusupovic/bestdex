import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { findCardById } from './Pokemon';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CardPage(props: any) {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(props.selectedCard)
    const cardTypes = ["normal", "holofoil", "reverseHolofoil", "1stEditionHolofoil", "unlimitedHolofoil"];
    const cardTypeTitles = ["Normal", "Holofoil", "Reverse Holofoil", "1st Edition Holo Foil", "Unlimited Holofoil"];
    const [user, setUser] = useState({} as any);
    const [favorite, setFavorite] = useState(false);
    const [added, addedCard] = useState(false);

    initializeApp({
        // credential: admin.credential.cert(serviceAccount),
        apiKey: "AIzaSyCKZTsZtOCASVEWGXofVBmbXvD8wCIaZEk",
        authDomain: "bestdex.firebaseapp.com",
        projectId: "bestdex",
        storageBucket: "bestdex.appspot.com",
        messagingSenderId: "657273505324",
        appId: "1:657273505324:web:0e99d42cedb8b5762df389",
        measurementId: "G-Z8WVPTR9XG"
    });
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          // User is signed out
        }
    });

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

    function navigateLogin(e: any) {
      navigate("/login");
    }

    function addFav(e: any) {
      setFavorite(!favorite);
    }

    function addCard(e: any) {
      addedCard(!added);
    }

    return (!currentCard.name ? <div>wait a sec</div> :
      <div className="cardpage-outside">
          <div className="search-header-div">
            <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
            <SearchBar/>
            <div className="search-header-login-div">{user.displayName}&nbsp;<PersonIcon className="login-icon" onClick={navigateLogin} htmlColor={"white"}/></div>
          </div>
      <div className="cardpage-main">
        <div className="cardpage-card-div">
          <img className="cardpage-card" src = {currentCard.images.large} alt="card"/>
        </div>
        <div className="cardpage-info">
          <div className="cardpage-name">{currentCard.name}</div>
            { /*<FavoriteIcon className="icon-cardpage fav" onClick={addFav} sx={favorite ? {color: "red"} : {color: "white"}} /> */ }
            <div className={"icon-cardpage fav" + (favorite ? " is-active" : "")} onClick={addFav} />
            <AddCircleIcon className="icon-cardpage add" onClick={addCard} sx={added ? {color: "lightGreen"} : {color: "white"}}/>
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