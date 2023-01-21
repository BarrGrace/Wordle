
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsePopup } from "../hooks/usePopup";
import { userContex } from "../provider/userContex";

interface finishMessageInterface {

    pop : string;
    removePop : () => void;
}
function FinishMessage({pop, removePop} : finishMessageInterface) {
    
    return(
        <div className="popFinish">
        {pop}<br/>
        <Link to = '/'><button onClick={() => removePop()}>continue</button></Link>
        </div>
    )
}

interface SubmitFormInterface {

    removePop : () => void;
    setUser : (user : { name: string; }) => void;
}
function SubmitForm({removePop, setUser} : SubmitFormInterface) {

    return (

        <>
        {document.addEventListener('keydown', (buttonPress) => {

            if (buttonPress.key === 'Escape') {
    
                removePop();
            }
        })}
            <form onSubmit = {(element) => element.preventDefault()}>
                <label>Enter you name: </label>
                <input type = 'text'></input><br/>
                <div className = "formButtons">
                <button type = 'submit' onClick = {
                    () => {
    
                        const newUser = document.getElementsByTagName('input')[0].value;
                        setUser({name: newUser});
                        localStorage.setItem('name', newUser);
                        removePop();
                    }
                    }>submit</button>
                <button onClick={() => removePop()}>close</button>
                </div>
            </form>
        </>
    )
}

interface HowToPlayMessageInterface {

    removePop : () => void;
}
function HowToPlayMessage({removePop} : HowToPlayMessageInterface){

    return(

        <>
        <button onClick={() => removePop()}>X</button><br/>
        {document.addEventListener('keydown', (buttonPress) => {

            if (buttonPress.key === 'Escape') {

                removePop();
            }
        })}
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
            <li>After entering a 5 letter word press 'Enter' or click 'done'.</li>
        </ul>
        </>
    )
}


//todo: add a shodow around the pop.
//todo: put function into a different file to orginize the code.
export function Popup() {

    const {removePop, pop} = UsePopup();
    const {setUser} = useContext(userContex);

    if (pop === 'none') return null;

    return (

        (pop === 'success' || pop === 'fail') ? (

            <FinishMessage pop = {pop} removePop = {removePop}/>
        )
        :
        ((pop === 'submit') ? (

            <SubmitForm removePop = {removePop} setUser = {setUser}/>
        )
        :
        (  
            <HowToPlayMessage removePop = {removePop}/>
        )
        )  
    )
}