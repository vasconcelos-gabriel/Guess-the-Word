import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {
  const [letter, setLetter] = useState('')
  const letterInputerRef = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter('')

    letterInputerRef.current.focus()
  }

  return (
    <div className="game">
      <h1>GUESS THE WORD</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>INSIRA UMA LETRA ABAIXO: </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={e => setLetter(e.target.value)}
            value={letter}
            ref={letterInputerRef}
          />
          <button>ENVIAR LETRA</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <span>
        
          Letras já utilizadas:
          {wrongLetters.map((letter, i) => (
            <span key={i}> {letter}, </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default Game
