import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContex } from "../provider/userContex";

export function Home() {
    const {user} = useContext(userContex);

    return (

        <>
        <div id = 'home'>
        <h1 id = 'homePage'>Home Page</h1>
        <h1>welcome {user.name}</h1>
        {user.name === 'guest' ? ''
         :
        (
            <Link to = '/wordle'>
            <button>start the game</button>
            </Link>
        )}
        </div>
        </>
    )
}


