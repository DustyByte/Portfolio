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
      ctx.fillStyle = '#3373FF'
      ctx.shadowColor = '3395FF'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 10

      
      for(let touch = 0; touch < e.touches.length; touch++){
        for(let i = 0; i < 3; i++){
          objects.push({
            x: e.touches[touch].clientX, 
            y: e.touches[touch].clientY, 
            rad: Math.random() * 5 + 5, 
            dissipateSpeed: 0.2,
            speed: {
              x: (Math.random() * 2 - 1) * 1.5,
              y: (Math.random() * 2 - 1) * 1.5
            }
          })
        }
      }
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
          //Drawing the lines
          for(let j = objectIndex + 1; j < objects.length; j++){
            if(Math.sqrt(
              Math.pow((objects[objectIndex].x - objects[j].x) , 2) + 
              Math.pow((objects[objectIndex].y - objects[j].y) , 2)
              ) < 30){
                ctx.beginPath()
                ctx.moveTo(objects[objectIndex].x, objects[objectIndex].y)
                ctx.lineTo(objects[j].x, objects[j].y)
                ctx.strokeStyle = '#AAAFFF'
                ctx.lineWidth = 1
                ctx.stroke()
            }
          }
          
          // Drawing the object
          ctx.beginPath()
          ctx.arc(objects[objectIndex].x, objects[objectIndex].y, objects[objectIndex].rad, 0, Math.PI * 2)
          
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
