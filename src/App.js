import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import HomeMobile from './components/Mobile/HomeMobile'
import HomePC from './components/PC/HomePC'
import './App.css'
import About from './components/AboutMe'
import AboutMe from './components/AboutMe'
/*git add .
git commit -m "Added About for Mobile"
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
    
    // function handleMouseMove(e){
    //   const ballAmount = 3
      
    //   for(let i = 0; i < ballAmount; i++){
    //     objects.push({
    //       x: e.x, 
    //       y: e.y, 
    //       rad: Math.random() * 5 + 5, 
    //       dissipateSpeed: 0.2,
    //       speed: {
    //         x: (Math.random() * 2 - 1) * 1.5,
    //         y: (Math.random() * 2 - 1) * 1.5
    //       }
    //     })
    //   }
    // }
    
    function handleTap(e){
      console.log(e);
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
          ctx.fillStyle = '#B9A5FF'
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

      {/* wave effect between home and about */}
      <section >
        <div className="home-about-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      <AboutMe />

    </div>
  )
}

export default App
