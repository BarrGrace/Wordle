import {Words} from '../components/Words.js';
import {Letters} from '../components/letters';
import {useState, useEffect, useRef, useContext} from 'react'
import { UsePopup } from '../hooks/usePopup.js';
import { userContex } from '../provider/userContex.js';
import { letterContext } from '../provider/lettersContext.js';
import { wordsContext } from '../provider/wordsContext.js';

export function UseWordle() {

    const letters = useContext(letterContext);
    const {word, setWord} = useContext(wordsContext);
    const guessWord = 'snake';
    const Wordlecolour = 'beige';

    const [index, setIndex] = useState(0);
    const [doneButton, setDoneButton] = useState(false);
    //HTMLInputElement is a type that is part of the TypeScript DOM library. 
    //It represents an HTML <input> element in the DOM
    const focusWord = useRef<HTMLInputElement>(null);
    const {openPopUp, pop, removePop, setPop} = UsePopup();
    //todo: try to change letters to a useRef, as setLetters is not been used.
    

    useEffect (() => {

        if (focusWord.current) {

            focusWord.current.focus();
        }
    })

    function useKey(cb : handleKeyFunctionType) {
        

        const callbackRef = useRef<handleKeyFunctionType>();
        
        function handle(event : KeyboardEvent) {
            
            if (callbackRef.current !== undefined) callbackRef.current(event)
        }

        useEffect(() => {
            
            callbackRef.current = cb;
        });
        
        useEffect(() => {
            
            document.addEventListener('keypress', handle);
        }, []);
    }

    type handleKeyFunctionType = (e : KeyboardEvent) => void;

    function handleKey(e : KeyboardEvent) {

        if (isABC(e.key)) {

            addWord(e.key);
        }
        else if (e.key === 'Enter' && doneButton) {

            releaseButton();
        }
    }

    function isABC(char : string) {

        const ABC = 'abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < 26; i++) {

            if (ABC.charAt(i) === char.toLowerCase()) {

                return true;
            }
        }

        return false;
    }

    useKey(handleKey);



    function handleTheButton(button : any) {

        if (typeof button == 'string') {
            
            return button;
        }
        
        return button.target.innerText
    }

    function addWord(button : any) {

        if (doneButton || index === 25){

            return;            
        }

        let newLetter = handleTheButton(button).toLowerCase();

        word[index] = {letter : newLetter, colour: Wordlecolour};        
        const newWord = word.slice();

        setWord(newWord);
        setIndex(index + 1);

        if (index % 5 === 4) {
            
            setDoneButton(true)
        }
    }

    function removeLetter() {

        if (index % 5 !== 0 || doneButton) {

            word[index - 1] = {letter : '', colour : Wordlecolour};
            const newWord = word.slice();
            setWord(newWord);
            setIndex(index - 1);

            if (doneButton) {

                setDoneButton(false);
            }
        }
    }

    function letterInGuessWord(letter : string) {

        for (let i = 0; i < 5; i++) {

            if (letter === guessWord.charAt(i)) {

                return true;
            }
        }

        return false;
    }

    function chageKeyboardColour(letter : string, colour : string) {

        for (let i = 0; i < 26; i++) {

            if (letters.current[i].letter.toLocaleLowerCase() === letter) {

                if (letters.current[i].colour === 'green' && colour === 'orange') {

                    return;
                }
                if (letters.current[i].colour === 'orange' && colour === 'gray') {

                    return;
                }
                letters.current[i].colour = colour;
                break;
            }
        }
    }

    function releaseButton() {

        let indexOfGuessWord = 0;
        let fiveLettersCorrect = 0;
        
        for (let i = index - 5; i < index; i++) {

            if(word[i].letter === guessWord.charAt(indexOfGuessWord++)) {

                word[i].colour = 'green';
                chageKeyboardColour(word[i].letter, 'green');
                fiveLettersCorrect++;
            }
            else if(letterInGuessWord(word[i].letter)) {

                word[i].colour = 'orange';
                chageKeyboardColour(word[i].letter, 'orange');
            }
            else{

                word[i].colour = 'gray';
                chageKeyboardColour(word[i].letter, 'gray');
            }
        }

        if (fiveLettersCorrect === 5) {

            setPop('success');
        }
        else if (index >= 25) {

            setPop('fail');
        }

        const newWords = word.slice();
        setWord(newWords);
        setDoneButton(false);
    }

    return {

        focusWord,
        index,
        word,
        addWord,
        doneButton,
        releaseButton,
        removeLetter,
        letters
    }
}