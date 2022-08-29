import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
      <h1>Guess the Word</h1>
      <button onClick={startGame}>CLIQUE AQUI PARA JOGAR</button>
    </div>

  )
}

export default StartScreen