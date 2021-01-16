import React, {useState, useEffect} from 'react'

import MostraVoltas from './MostraVoltas'
import Mostratempo from './MostraTempo'
import Button from './Button'
import './styles.css'

function App() {
  const [numVoltas, setNumVoltas] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [running, setRunning] = useState(false)
  const [textoBtn, setTextoBtn] = useState('Iniciar')


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
    if (numVoltas > 0){
      setNumVoltas(numVoltas - 1)
    }    
  }

  const reset = () => {
    setNumVoltas(0)
    setTempo(0)
    setTextoBtn('Iniciar')// Algo parecido com isto ??
  }

  return (
    <div className='App'>
      <MostraVoltas voltas={numVoltas}/>
      <Button className='bigger' text='+' onClick={increment}/>
      <Button className='bigger' text='-' onClick={decrement}/>           
      { numVoltas > 0 &&
        <Mostratempo tempo={Math.round(tempo/numVoltas)}/>
      }      
      <Button onClick={toggleRunning} text={running ? 'Pausar' : 'Iniciar'} text={textoBtn}/>
      <Button onClick={reset} text='Reiniciar'/> 
    </div>
  )
}

export default App
