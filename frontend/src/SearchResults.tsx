import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { findCardsByQuery } from './Pokemon';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import './App.scss';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { SwapSpinner } from "react-spinners-kit";
import PersonIcon from '@mui/icons-material/Person';

function SearchResults(props: any) {
    const navigate = useNavigate();
    const [results, setResults] = useState([] as any);
    const [cardId, setCardId] = useState("");
    const [params, setParams] = useState({ q: "" })
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [user, setUser] = useState({} as any);

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

    async function getData() {
      let url : string = window.location.href as string;
      url = url.split("q=").pop() || "";
      // url = url.replaceAll("%20", " ") || "";
      console.log(url);
      const data = await findCardsByQuery("name", url);
      setResults(data);
      console.log(data);
    }

    useEffect(() => {
        setImagesLoaded(0);
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

    function navigateHome(e: any) {
      navigate("/");
    }

    function navigateLogin(e: any) {
      navigate("/login");
    }

    return (
        <div>
          <div className="search-header-div">
            <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
            <div className="search-header-title">BESTDEX</div>
            <SearchBar setParams={setParams}/>
            <div className="search-header-login-div">{user.displayName}&nbsp;<PersonIcon className="login-icon" onClick={navigateLogin} htmlColor={"white"}/></div>
          </div>
          <div className={"results-spinner " + (imagesLoaded < results.length ? "loading" : "done")}>
              <SwapSpinner color="#ffffff" loading={imagesLoaded < results.length}/>
          </div>
          <div className="results-main">
            <div className="results-cards">
              <Grid container justifyContent="center" wrap="wrap" spacing={1}>
                {results.map((card: PokemonTCG.Card) =>
                  <Grid item className="results-grid-item" wrap="wrap" key={card.id}>
                    <img className="results-card-image" src={card.images.large} onClick={handleCardClick} id={card.id} alt="card" style={imagesLoaded >= results.length - 1 ? {} : {display: 'none' }}
                    onLoad={() => setImagesLoaded(imagesLoaded + 1)}/>
                  </Grid>)}
              </Grid>
            </div>
          </div>
        </div>
    );
  }
  
  export default SearchResults;