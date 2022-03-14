import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth"; //signOut
import { Button } from 'antd';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as any);
    const [params, setParams] = useState({ q: "" })

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

    function navigateHome(e: any) {
        navigate("/");
    }

    function navigateLogin(e: any) {
        navigate("/login");
    }

    return (user.uid ? 
        <div>
            <div className="search-header-div">
                <img src="charizard.png" className="search-header-logo" onClick={navigateHome} alt="charizard"/>
                <div className="search-header-title">BESTDEX</div>
                <SearchBar setParams={setParams}/>
                <div onClick={navigateLogin} className="search-header-login-div">{user.displayName}&nbsp;<PersonIcon className="login-icon" onClick={navigateLogin} htmlColor={"white"}/></div>
            </div>
        </div> : 
        <Button className="login-button" type="primary" onClick={handleGoogleLoginClick}>Login with Google</Button>
    );
}

export default Login;