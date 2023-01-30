import { Key } from "react";

interface ILettersProps{

    letters:React.MutableRefObject<{letter : string; colour : string;}[]>,
    addLetter : (button: string) => void,
    removeLetter : () => void
}
export function Letters({letters, addLetter, removeLetter} : ILettersProps) {

    const letters1 = letters.current.slice(0, 10);
    const letters2 = letters.current.slice(10, 19);
    const letters3 = letters.current.slice(19, 27);

    return (

        <div>
            <div className = "letters">
            {letters1.map((element: { colour: string; letter: string; }, uniqueId: Key) =>(
                <button key = {uniqueId} onClick = {() => addLetter(element.letter)} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}
            </div>
            <div className = "letters">

            {letters2.map((element: { colour: string; letter: string; }, uniqueId: Key) =>(
                <button key = {uniqueId} onClick = {() => addLetter(element.letter)} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}
            </div>
            <div className = "letters">

            {letters3.map((element: { colour: string; letter: string; }, uniqueId: Key) =>(
                <button key = {uniqueId} onClick = {() => addLetter(element.letter)} style = {{backgroundColor: element.colour}}>{element.letter}</button>
            ))}

            <button onClick = {removeLetter}>&#11013;</button>
            </div>
        </div>
    )
}
