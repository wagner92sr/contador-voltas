import React, {useState, useEffect} from 'react'

const MostraVoltas = (props) => {
  return(
    <p>
    {props.voltas}<br/>
    Voltas
  </p>
  )
}

const Mostratempo = (props) => {
  const tempo = props.tempo
  const minutos = Math.round(tempo/60)
  const segundos = tempo % 60
  const minutosStr = minutos < 10 ? '0' + minutos : minutos
  const segundosStr = segundos < 10 ? '0' + segundos : segundos
  return(
    <p>
      {`${minutosStr}:${segundosStr}`}<br/>
      Tempo médio por Volta
    </p>
  )
}

const Button = (props) => <button onClick={props.onclick}>{props.text}</button>

function App() {
  const [numVoltas, setNumVoltas] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [running, setRunning] = useState(false)


  useEffect(() => {    
    let timer = null
    if(running){
      timer = setInterval(() => {
        setTempo(old => old + 1 )
      }, 1000)
    }
    return () => {
      if(timer){ // truthy valor que é convertudo para verdadeiro
        clearInterval(timer)
      }
    }    
  }, [running])

  const toggleRunning = () => {
    setRunning(!running)
  }  
  
  const increment = () => {
    setNumVoltas(numVoltas + 1)
  }

  const decrement = () => {
    setNumVoltas(numVoltas - 1)
  }

  const reset = () => {
    setNumVoltas(0)
    setTempo(0)
  }

  return (
    <div className='App'>
      <MostraVoltas voltas={numVoltas}/>
      <Button text='+' onclick={increment}/>
      <Button text='-' onclick={decrement} />      
      { numVoltas > 0 &&
        <Mostratempo tempo={Math.round(tempo/numVoltas)}/>
      }
      <Button onclick={toggleRunning} text='Iniciar'/>
      <Button onclick={reset} text='Reiniciar'/> 
    </div>
  )
}

export default App
