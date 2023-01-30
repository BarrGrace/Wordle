import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsePopup } from '../hooks/usePopup'
import { userContex } from "../provider/userContex";

export function Header(){

    const {openPopUp, openForm} = UsePopup();
    const {user, setUser} = useContext(userContex);

    return (

        <>
        <div className="header">

            <div className = "login">{user.name === 'guest' ?<button onClick={() => openForm()}>Login</button>
            :
            <Link to = '/'onClick={() => {
                localStorage.removeItem('name');
                setUser({name: "guest"});}}>Logout</Link>}{user.name !== "guest" ? user.name : ''}
            </div>
            <div>Wordle</div>
            <button onClick={() => openPopUp()}>&#10068;</button>
        </div>
        </>
    )
}