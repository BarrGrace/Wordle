import { Key } from "react";

interface IWordsProps {

    word : {
        letter: string;
        colour: string;
    }[];
    index : React.MutableRefObject<number>;
    focusWord : React.RefObject<HTMLInputElement>;
}
export function Words({word, index, focusWord} : IWordsProps) {

    return(
        <div className="placeGrid"><div className = "words">{word.map((element: { colour: any; letter: string; }, uniqueId: Key) =>(
        <div ref={uniqueId === index.current ? focusWord : null} className='wordle' key = {uniqueId} style={{backgroundColor: element.colour}}>{element.letter}</div>
            ))}</div>
        </div>
    )
}