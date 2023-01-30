import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UsePopup } from "../hooks/usePopup";
import { userContex } from "../provider/userContex";

export function Popup() {
    const {removePop, pop} = UsePopup();
    const {setUser} = useContext(userContex);

    function EscapeButtonListener(e : KeyboardEvent) {

        if (e.key === 'Escape') removePop();
    }
    useEffect(() => {
        return () => {
            document.removeEventListener('keypress', EscapeButtonListener);
        }
    });

    if (pop === 'none') return null;

    return (
        (pop === 'success' || pop === 'fail') ? (

            <FinishMessage pop = {pop} removePop = {removePop}/>
        )
        :
        ((pop === 'submit') ? (

            <SubmitForm removePop = {removePop} setUser = {setUser} EscapeButtonListener = {EscapeButtonListener}/>
        )
        :
        (
            <div className="pop"><HowToPlayMessage removePop = {removePop} EscapeButtonListener = {EscapeButtonListener}/></div>
        )
        )
    )
}


interface IfinishMessageProps {

    pop : string;
    removePop : () => void;
}
function FinishMessage({pop, removePop} : IfinishMessageProps) {
    return(
        <div className="popFinish">
        {pop}<br/>
        <Link to = '/'><button onClick={() => removePop()}>continue</button></Link>
        </div>
    )
}

interface ISubmitFormProps {

    removePop : () => void;
    setUser : (user : { name: string; }) => void;
    EscapeButtonListener : (e : KeyboardEvent) => void;
}
function SubmitForm({removePop, setUser, EscapeButtonListener} : ISubmitFormProps) {

    const newUser = useRef<HTMLInputElement>(null);
    async function handleClick() {

        const userData = newUser.current === null? 'guest' : newUser.current.value;

        setUser({name: userData});
        localStorage.setItem('name', userData);
        const data = {

            method: "Post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userData})
        }
        await fetch('http://localhost:3333', data);
        removePop();
    }


    return (

        <>
        {document.addEventListener('keydown', EscapeButtonListener)}
            <form>
                <label>Enter you name: </label>
                <input ref = {newUser} type = 'text'></input><br/>
                <div className = "formButtons">
                <button type="submit" onClick = {handleClick}>submit</button>
                <button onClick={() => removePop()}>close</button>
                </div>
            </form>
        </>
    )
}

interface IHowToPlayMessageProps {

    removePop : () => void;
    EscapeButtonListener: (e : KeyboardEvent) => void;
}
function HowToPlayMessage({removePop, EscapeButtonListener} : IHowToPlayMessageProps){

    return(

        <>
        <button onClick={() => removePop()}>X</button><br/>
        {document.addEventListener('keydown', EscapeButtonListener)}
        <h2><ins>How to play</ins>:</h2>
        <ul>
            <li>Login to start the game</li>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The colour of the tiles will change:
                <ul>
                    <li>Green is the correct word, in the correct place.</li>
                    <li>Orange is the correct word, in a different place.</li>
                </ul>
            </li>
            <li>Press the keyboard or letters to guess the word.</li>
        </ul>
        </>
    )
}

