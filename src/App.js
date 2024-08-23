import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import HomeMobile from './components/Mobile/HomeMobile'
import HomePC from './components/PC/HomePC'
import './App.css'
import AboutMeMobile from './components/Mobile/AboutMeMobile'
import AboutMePC from './components/PC/AboutMePC'
import Projects from './components/Projects'
import Skills from './Skills'
/*git add .
git commit -m "Fixed bugs"
git push*/


// Below are the functions that is used throughtout the app, defined here for reusability

export function handleGetResume(){
  const url = 'https://drive.google.com/file/d/1oq8YPQXvzawoQC9Bhsry0k1lIlQs5haA/view?usp=drive_link'
  
  window.open(url, '_blank')
}

export function handleAboutClick(){
  const about = document.getElementById('about')

  about.scrollIntoView({behavior: 'smooth'})
}

export function handleProjectClick(){
  const projects = document.getElementById('projects')

  projects.scrollIntoView({behavior: 'smooth'})
}

export function handleSkillsClick(){
  const skills = document.getElementById('skills')

  skills.scrollIntoView({behavior: 'smooth'})
}

export function isRed(){
  return (Math.random() < 0.2 ? `red` : `#50AFFF`)
}      




export default function App() {

  useEffect(() => {
    const canvas = document.getElementById('tapEffectCanvas')
    const ctx = canvas.getContext("2d")
    
    const app = document.getElementById('app')

    canvas.width = window.innerWidth
    canvas.height = app.clientHeight

    
    const objects = []
    
    function handleClick(e){
      ctx.fillStyle = '#3373FF'
      ctx.shadowColor = '#3395FF'
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
      ctx.fillStyle = '#3373FF'
      ctx.shadowColor = '#3395FF'
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
      <section>
        <div className="home-about-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {isMobile ? <AboutMeMobile /> : <AboutMePC /> }

      {/* waveeffect between about and projects */}
      <section>
        <div className="custom-shape-divider-top-1724321071">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      <Projects />

      {/* wave effect between projects and skills */}
      <section>
        <div className="custom-shape-divider-top-1724395756">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      <Skills />
      
    </div>
  )
} 