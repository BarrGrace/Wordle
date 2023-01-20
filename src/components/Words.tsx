import { Key } from "react";
import { UseWordle } from "../hooks/useWordle"

export function Words() {
    
    const {word, index, focusWord} = UseWordle();

    return(
        <div className="placeGrid">
            <div className = "words">
            {word.map((element: { colour: any; letter: string; }, unique_id: Key | null | undefined) =>(
                
                <div ref={unique_id === index ? focusWord : null} className='wordle' key = {unique_id} style={{backgroundColor: element.colour}}>{element.letter.toUpperCase()}</div>
            ))}           
                
            </div>
        </div>
    )
}