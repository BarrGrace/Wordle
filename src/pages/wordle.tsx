import { Words } from '../components/Words';
import { Letters } from '../components/letters';
import { useEffect, useRef, useState } from 'react';
import { UsePopup } from '../hooks/usePopup';

export function Wordle() {

  const user = localStorage.getItem("name");
  const lettercolor : string = 'white';
  const Wordlecolour : string = 'beige';
  const myLetters = [
    {letter: 'Q', colour: lettercolor}, {letter: 'W', colour: lettercolor}, {letter: 'E', colour: lettercolor}, {letter: 'R', colour: lettercolor}, {letter: 'T', colour: lettercolor}, {letter: 'Y', colour: lettercolor}, {letter: 'U', colour: lettercolor}, {letter: 'I', colour: lettercolor}, {letter: 'O', colour: lettercolor}, {letter: 'P', colour: lettercolor},
    {letter: 'A', colour: lettercolor}, {letter: 'S', colour: lettercolor}, {letter: 'D', colour: lettercolor}, {letter: 'F', colour: lettercolor}, {letter: 'G', colour: lettercolor}, {letter: 'H', colour: lettercolor}, {letter: 'J', colour: lettercolor}, {letter: 'K', colour: lettercolor}, {letter: 'L', colour: lettercolor},
    {letter: 'Z', colour: lettercolor}, {letter: 'X', colour: lettercolor}, {letter: 'C', colour: lettercolor}, {letter: 'V', colour: lettercolor}, {letter: 'B', colour: lettercolor}, {letter: 'N', colour: lettercolor}, {letter: 'M', colour: lettercolor}
  ];
  const letters = useRef(myLetters);
  const myWords = [{letter : '', colour : Wordlecolour}];
  for (let i = 1; i < 25; i++) {

      myWords.push({letter : '', colour: Wordlecolour});
  }

  const [word, setWord] = useState(myWords);
  const index = useRef(0);
  const focusWord = useRef<HTMLInputElement>(null);
  const {setPop, pop} = UsePopup();

  useEffect (() => {
      if (focusWord.current) {
          document.addEventListener('keypress', addKeyBoardLetter);
          focusWord.current.focus();
      }

      return () => {

        document.removeEventListener('keypress', addKeyBoardLetter)
      };
  })

  function addKeyBoardLetter(e : KeyboardEvent) {

    addLetter(e.key);
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

  function addLetter(button : string) {
    if (!isABC(button) || index.current === 25 || pop !== 'none'){
        return;
    }
      word[index.current] = {letter : button.toUpperCase(), colour: Wordlecolour};
      const newWord = word.slice();

      setWord(newWord);
      if (index.current % 5 === 4) {
        newFiveLetterWord()
      }
      index.current++;
  }

  function removeLetter() {

      if (index.current % 5 !== 0) {
          word[index.current - 1] = {letter : '', colour : Wordlecolour};
          const newWord = word.slice();
          setWord(newWord);
          index.current--;
      }
  }

  async function newFiveLetterWord() {

      let fiveLettersCorrect = 0;
      const lettersSent = letters.current;

      const data = {

        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({word, lettersSent, index, fiveLettersCorrect, user})
      }
      const returnedData = await fetch('http://localhost:3333/wordCheck', data);
      const respose = await returnedData.json();
      const newWords = respose.word;
      letters.current = respose.letters;
      fiveLettersCorrect = respose.fiveLettersCorrect;

      if (fiveLettersCorrect === 5) {

          setPop('success');
      }
      else if (index.current >= 24) {

          setPop('fail');
      }

      setWord(newWords);
  }

  return (
        <div className="App">
          <Words word = {word} index = {index} focusWord = {focusWord}/>
          <Letters letters = {letters} addLetter = {addLetter} removeLetter = {removeLetter}/>
        </div>
  );
}




