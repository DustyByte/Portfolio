import { useEffect } from 'react'
import './App.css'
//? 4-0.3 7-0.4
function App() {

  

  useEffect(() => {
    const canvas = document.getElementById(`canvas`)
    const ctx = canvas.getContext(`2d`)
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    console.log(ctx)
    
    const stars = []
    
    function draw(star){
      const stepLen = star.len / 20
      const growthFactor = star.len < 110 ? 0.2 : 0.4
      for(let step = 0; step < 20; step++){
        ctx.beginPath()
        ctx.moveTo(star.x + (step * stepLen), star.y + (step * stepLen))
        ctx.lineTo(star.x + ((step + 1) * stepLen), star.y + ((step + 1) * stepLen))
        ctx.strokeStyle = `#50AFFF`
        ctx.lineWidth = (step + 1) * growthFactor
        ctx.lineCap = `round`
        ctx.shadowBlur = 100 / (step + 1)
        ctx.shadowOffsetX = 0
        ctx.shadowColor = `#158157`
        ctx.stroke()
      }    
    }

    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for(let star = 0; star < stars.length; star++){
        if(stars[star].x > canvas.width || stars[star].x > canvas.height){
          stars[star].x = Math.random() * canvas.width
          stars[star].y = Math.random() * canvas.height
          stars[star].len = 80 + Math.random() * 60
        }else {
          stars[star].x += stars[star].speed 
          stars[star].y += stars[star].speed 
          draw(stars[star])
        }
      }

      requestAnimationFrame(animate)
    }

    for(let i = 0; i < 8; i++){
      stars.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, len: 80 + Math.random() * 60, speed: 4})
    }
   
    console.log(stars)
    animate()
  }, [])
  
  return (
    <div className="App">
      <canvas id='canvas'></canvas>
    </div>
  )
}

export default App
