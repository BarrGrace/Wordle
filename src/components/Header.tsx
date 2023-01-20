import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsePopup } from '../hooks/usePopup'
import { popupContext } from "../provider/popupContext";
import { userContex } from "../provider/userContex";
import { Popup } from "./popUp";


export function Header(){

    const {openPopUp, openForm} = UsePopup();
    const {user, setUser} = useContext(userContex);

    return (

        <>
        <div className="header">

            <div className = "login">
                {user.name === 'guest' ? 
            
            <button onClick={() => openForm()}>Login</button>
            :
            <button onClick={() => {
                localStorage.removeItem('name');
                setUser({name: "guest"});
            
            }}><Link to = '/'>Logout</Link></button>
            }     
                {user.name !== "guest" ? user.name : ''}
            </div>
            <div>Wordle</div>
            <button onClick={() => openPopUp()}>&#10068;</button>
        </div>
        </>
    )
}