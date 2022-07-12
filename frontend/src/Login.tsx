import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth"; //signOut
import { Button, Divider } from 'antd';
import { initializeApp } from 'firebase/app';
// import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchBar from "./SearchBar";
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Grid } from "@mui/material";
// import { findCardById } from './Pokemon';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as any);
    const [params, setParams] = useState({ q: "" })
    const [viewType, setViewType] = useState("grid")
    const [ownedCards, setOwnedCards] = useState([] as any);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const provider = new GoogleAuthProvider();
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

    // const db = getFirestore();
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          // User is signed out
        }
    });

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
    }, [params, navigate]);

    async function handleGoogleLoginClick(e: any) {
        await signInWithRedirect(auth, provider);
        getRedirectResult(auth)
            .then((result: any) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // var token;
                // if (credential) {
                //     token = credential.accessToken;
                // }
                // setUser(JSON.stringify(result.user));
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);

                // const email = error.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    useEffect(() => {
        let cardData = [] as any
        // set cardData to owned cards by this user
        setOwnedCards(cardData)
      }, [user])

    function navigateHome(e: any) {
        navigate("/");
    }

    function navigateLogin(e: any) {
        navigate("/login");
    }

    function clickGridViewType(e: any) {
        setViewType("grid");
    }

    function clickListViewType(e: any) {
        setViewType("list");
    }

    // function clickFavoriteCards(e: any) {

    // }

    // function clickAddedCards(e: any) {

    // }

    function handleCardClick(e: any) {

    }

    return (user.uid ? 
        <div>
            <div className="search-header-div">
                <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
                <SearchBar setParams={setParams}/>
                <div onClick={navigateLogin} className="search-header-login-div">{user.displayName}&nbsp;<PersonIcon className="login-icon" onClick={navigateLogin} htmlColor={"white"}/></div>
            </div>
            <div className="login-main">
                <div className="login-view-button-div"><div className="login-view-header">{viewType} view</div></div>
                <div className="login-view-button-div">
                    <Button value="grid" className={(viewType === "grid" ? "login-view-button-pressed" : "login-view-button") + " login-svg-scale"}
                        icon={<GridViewIcon sx={viewType === "grid" ? {color: "black"} : {color: "white"}}/>}
                        onClick={clickGridViewType}></Button>
                    <Button value="list" className={(viewType === "list" ? "login-view-button-pressed" : "login-view-button") + " login-svg-scale"} 
                        icon={<ViewListIcon sx={viewType === "list" ? {color: "black"} : {color: "white"}}/>}
                        onClick={clickListViewType}></Button>
                </div>
                <Divider style={{borderTop: "1px solid white"}}/>
                <div className="results-main">
                    <div className="results-cards">
                    <Grid container justifyContent="center" wrap="wrap" spacing={1}>
                        {ownedCards.length > 0 ? ownedCards.map((card: PokemonTCG.Card) =>
                        <Grid item className="results-grid-item" wrap="wrap" key={card.id}>
                            <img className="results-card-image" src={card.images.large} onClick={handleCardClick} id={card.id} alt="card" style={imagesLoaded >= ownedCards.length - 1 ? {} : {display: 'none' }}
                            onLoad={() => setImagesLoaded(imagesLoaded + 1)}/>
                        </Grid>) : <div className="cardpage-name">No Added Cards</div>}
                    </Grid>
                    </div>
                </div>
            </div>  
        </div> : 
        <Button className="login-button" type="primary" onClick={handleGoogleLoginClick}>Login with Google</Button>
    );
}

export default Login;