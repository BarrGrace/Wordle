import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import { UseWordle } from "../hooks/useWordle";

export function Letters() {

    const {letters, addWord, doneButton, releaseButton, removeLetter} = UseWordle();

    const letters_1 = letters.current.slice(0, 10);
    const letters_2 = letters.current.slice(10, 19);
    const letters_3 = letters.current.slice(19, 27);


    return (

        <div>
            <div className = "letters">

            {letters_1.map((element: { colour: any; letter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, unique_id: Key | null | undefined) =>(
                
                <button key = {unique_id} onClick = {addWord} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}

            </div>
            <div className = "letters">

            {letters_2.map((element: { colour: any; letter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, unique_id: Key | null | undefined) =>(
                
                <button key = {unique_id} onClick = {addWord} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}
            </div>
            <div className = "letters">

            {doneButton ? <button id = "done" onClick={releaseButton}>done</button> : <button id = "notDone"></button>}

            {letters_3.map((element: { colour: any; letter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, unique_id: Key | null | undefined) =>(
                
                <button key = {unique_id} onClick = {addWord} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}

            <button onClick = {removeLetter}>&#11013;</button>
            </div>
        </div>
    )
}
