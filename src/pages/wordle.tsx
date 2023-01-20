import {Words} from '../components/Words';
import {Letters} from '../components/letters';
import { letterContext } from '../provider/lettersContext';
import { useRef, useState } from 'react';
import { wordsContext } from '../provider/wordsContext';

export function Wordle() {

  const lettercolor = 'white';
  const Wordlecolour = 'beige';

  let myLetters = [
    {letter: 'Q', colour: lettercolor}, {letter: 'W', colour: lettercolor}, {letter: 'E', colour: lettercolor}, {letter: 'R', colour: lettercolor}, {letter: 'T', colour: lettercolor}, {letter: 'Y', colour: lettercolor}, {letter: 'U', colour: lettercolor}, {letter: 'I', colour: lettercolor}, {letter: 'O', colour: lettercolor}, {letter: 'P', colour: lettercolor},
    {letter: 'A', colour: lettercolor}, {letter: 'S', colour: lettercolor}, {letter: 'D', colour: lettercolor}, {letter: 'F', colour: lettercolor}, {letter: 'G', colour: lettercolor}, {letter: 'H', colour: lettercolor}, {letter: 'J', colour: lettercolor}, {letter: 'K', colour: lettercolor}, {letter: 'L', colour: lettercolor}, 
    {letter: 'Z', colour: lettercolor}, {letter: 'X', colour: lettercolor}, {letter: 'C', colour: lettercolor}, {letter: 'V', colour: lettercolor}, {letter: 'B', colour: lettercolor}, {letter: 'N', colour: lettercolor}, {letter: 'M', colour: lettercolor}
  ];
  const letters = useRef(myLetters);

  let myWords = [{letter : '', colour : Wordlecolour}];
  for (let i = 1; i < 25; i++) {

      myWords.push({letter : '', colour: Wordlecolour});
  }

  const [word, setWord] = useState(myWords);

  return (
    <wordsContext.Provider value = {{word, setWord}}>
    <letterContext.Provider value = {letters}>
    <div className="App">
        <Words/>
        <Letters/>
    </div>
    </letterContext.Provider>
    </wordsContext.Provider>
  );
}




