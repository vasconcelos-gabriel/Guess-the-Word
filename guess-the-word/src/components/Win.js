import React from 'react'
import './Win.css'

const Win = ({letters, pickedWord, continueGame}) => {
  let wordLetters = pickedWord.split('')
  wordLetters = wordLetters.map(l => l.toLowerCase())
  return (
    <div className="win">
      <h1>VOCÊ ACERTOU!</h1>
      <h3 className="tip">A palavra era:</h3>
  
    <div className="wordContainer">
      {letters.map((letter, i) =>
        wordLetters.includes(letter) ? (
          <span key={i} className="letter">
            {letter}
          </span>
        ) : (
          ''
        )
      )}
    </div>
    <p>Deseja continuar a jogar?</p>
    <button onClick={continueGame}>CONTINUAR</button>
  </div>
  )
}

export default Win