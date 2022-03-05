import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"; //signOut
import { Button } from 'antd';
import { initializeApp } from 'firebase/app';

function Login() {
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

    async function handleGoogleLoginClick(e: any) {
        await signInWithRedirect(auth, provider);
        getRedirectResult(auth)
            .then((result: any) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // var token;
                // if (credential) {
                //     token = credential.accessToken;
                // }
                // const user = result.user;
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);

                // const email = error.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);

                // ...
        });
    }

    return (
        <Button type="primary" onClick={handleGoogleLoginClick}>Login with Google</Button>
    );
}

export default Login;