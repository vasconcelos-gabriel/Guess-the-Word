import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className='gameover'>
      <h1>Game Over</h1>
      <h2>A SUA PONTUAÇÃO FOI: <span>{score}</span></h2>
      <button onClick={retry}>JOGAR NOVAMENTE</button>
    </div>
  )
}

export default GameOver