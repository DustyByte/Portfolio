import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import HomeMobile from './components/Mobile/HomeMobile'
import HomePC from './components/PC/HomePC'
import './App.css'
/*git add .
git commit -m "Fixed bugs"
git push*/

function App() {

  useEffect(() => {
    const canvas = document.getElementById('tapEffectCanvas')
    const ctx = canvas.getContext("2d")
    
    const app = document.getElementById('app')

    canvas.width = window.innerWidth
    canvas.height = app.clientHeight

    
    const objects = []
    
    function handleClick(e){
      ctx.fillStyle = '#3373FF'
      ctx.shadowColor = '3395FF'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 10

      const ballAmount = 3

      for(let i = 0; i < ballAmount; i++){
        objects.push({
          x: e.pageX, 
          y: e.pageY, 
          rad: Math.random() * 5 + 5, 
          dissipateSpeed: 0.2,
          speed: {
            x: (Math.random() * 2 - 1) * 1.5,
            y: (Math.random() * 2 - 1) * 1.5
          }
        })
      }
    }
    
    function handleTap(e){
      ctx.fillStyle = '#3373FF'
      ctx.shadowColor = '3395FF'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 10

      const ballAmount = 3
      
      for(let touch = 0; touch < e.touches.length; touch++){
        for(let i = 0; i < ballAmount; i++){
          objects.push({
            x: e.touches[touch].pageX, 
            y: e.touches[touch].pageY, 
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
      
      for(let i in objects){
        //Drawing the lines
        for(let j = i; j < objects.length; j++){
          if(Math.sqrt(
            Math.pow((objects[i].x - objects[j].x) , 2) + 
            Math.pow((objects[i].y - objects[j].y) , 2)
            ) < 30){
              ctx.beginPath()
              ctx.moveTo(objects[i].x, objects[i].y)
              ctx.lineTo(objects[j].x, objects[j].y)
              ctx.strokeStyle = '#AAAFFF'
              ctx.lineWidth = 1
              ctx.stroke()
          }
        }
      }
      

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
          
          ctx.fill()
        }
      }


      requestAnimationFrame(animate)
    }

    animate()

    if(isMobile)  window.addEventListener('touchstart', handleTap)
    else  window.addEventListener('mousedown', handleClick)

    return () => {
      if(isMobile)  window.removeEventListener('touchstart', handleTap)
      else  window.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <div className="App" id='app'>
      <canvas id='tapEffectCanvas'></canvas>
      {isMobile ? <HomeMobile /> : <HomePC /> }      
    </div>
  )
}

export default App
