import { useEffect } from 'react'
import './App.css'
import Home from './components/Home'

function App() {

  useEffect(() => {
    const canvas = document.getElementById('tapEffectCanvas')
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    function handleClick(e){
      console.log(e)
    }

    function handleTap(e){
      ctx.beginPath()
      ctx.arc(e.touches[0].clientX, e.touches[0].clientY, 10, 0, 2 * Math.PI)
      ctx.fillStyle = '#121212'
      ctx.stroke()
      ctx.fill()
      console.log(e)
      console.log(ctx)
    }

    window.addEventListener('mouseup', handleClick)
    window.addEventListener('touchstart', handleTap)

    return () => {
      window.removeEventListener('mouseup', handleClick)
      window.removeEventListener('touchstart', handleTap)
    }
  }, [])

  return (
    <div className="App">
      <canvas id='tapEffectCanvas'></canvas>
      <Home />
      <div style={{height: '500px'}}></div>
    </div>
  )
}

export default App
