import { useEffect } from 'react'
import './App.css'
import Home from './components/Home'

function App() {

  useEffect(() => {
    const canvas = document.getElementById('tapEffectCanvas')
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const objects = []

    function handleClick(e){
    }

    function handleTap(e){
      for(let i = 0; i < 5; i++){
        objects.push({
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY, 
          rad: Math.random() * 5 + 5, 
          dissipateSpeed: 0.05,
          speed: {
            x: (Math.random() * 2 - 1) * 5,
            y: (Math.random() * 2 - 1) * 5
          }
        })
      }

      ctx.fillStyle = 'red'
    }

    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)



      for(let objectIndex = 0; objectIndex < objects.length; objectIndex++){
        // Updating the poperties of the object
        objects[objectIndex].x += objects[objectIndex].speed.x
        objects[objectIndex].y += objects[objectIndex].speed.y
        objects[objectIndex].rad -= objects[objectIndex].dissipateSpeed
        if(objects[objectIndex].rad < 0){
          objects.splice(objectIndex, 1)
          // Setting the index a step behind so we dont miss an object in the objects array
          objectIndex--
        }
        else{
          // Drawing the object
          ctx.beginPath()
          ctx.arc(objects[objectIndex].x, objects[objectIndex].y, objects[objectIndex].rad, 0, Math.PI * 2)
          ctx.stroke()
          ctx.fill()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

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
