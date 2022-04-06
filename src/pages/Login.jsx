import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Login() {
    let { jwt } = useParams();
    useEffect(() => {

        localStorage.setItem("access", "false");
        console.log("JWT", jwt);
        alert(document.cookie);
    }, [])
    let navigate = useNavigate();
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    async function handleLogin() {
        console.log("login");
        console.log(document.cookie);
        alert(document.cookie);
        const jwtToken = {
            jwt: getCookie("JWT")
        }
        await fetch("https://bits-apogee.org/ems/jwt/get_token/", {
            method: "POST",
            body: JSON.stringify(jwtToken),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    localStorage.setItem("access", "false");
                    navigate("/NotLoggedIn");
                    alert(data.error);
                }
                else {
                    localStorage.setItem("access", "true");
                    navigate("/Quiz");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate("/NotLoggedIn");
            });

    }

    return (
        <div className="HomePage">
            <div className="HeaderLogin">Login Page</div>
            <div className="StartButtonContainer">
                <button onClick={handleLogin} className="StarButton">Start Quiz</button>
            </div>
        </div>
    )
}

export default Login