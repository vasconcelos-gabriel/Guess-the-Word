//CSS
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react'

//Data
import { wordsList } from './data/words'

//Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import Win from './components/Win'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'win' },
  { id: 4, name: 'end' }
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndPickCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  //starts game
  const startGame = useCallback(() => {
    clearLetterStates()
    //pick word and category
    const { word, category } = pickWordAndPickCategory()

    //create an array of letters
    let wordLetters = word.split('')
    wordLetters = wordLetters.map(l => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    console.log(word)
    setGameStage(stages[1].name)
  }, [pickWordAndPickCategory])

  

  // process the letter input
  const verifyLetter = letter => {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }
    // push guessed letter or remover a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters(actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters(actualWrongLetters => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses(actualGuesses => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates()
      setGameStage(stages[3].name)
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore(actualScore => (actualScore += 100))

      /* // restart game with new word
      startGame() */
      setGameStage(stages[2].name)
    }
  }, [guessedLetters, letters, gameStage, startGame])

  // restarts game
  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name)
  }

  const continueGame = () =>{
    setGuesses(3)
    startGame()
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'win' && (<Win letters={letters} pickedWord={pickedWord} continueGame={continueGame}/>)}
      {gameStage === 'end' && (
        <GameOver
          retry={retry}
          score={score}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
        />
      )}
    </div>
  )
}

export default App
