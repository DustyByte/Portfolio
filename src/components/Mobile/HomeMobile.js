import { useEffect, useState } from "react"
import { handleAboutClick, handleContactClick, handleProjectClick, handleSkillsClick, isRed } from "../../App"
import "./homeMobile.css"

        
export default function HomeMobile(){
    const [burgerOpen, setBurgerOpen] = useState(false)

    function handleBurger(){
      setBurgerOpen(prev => !prev)
    }
    
    useEffect(() => {    
        const canvas = document.getElementById(`canvas`)
        const ctx = canvas.getContext(`2d`)
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars = []
        
        const growthFactor = 0.1
        function draw(star){
          for(let step = 0; step < 5; step++){
            ctx.beginPath()
            ctx.moveTo(star.x + (step * star.len / 20), star.y + (step * star.len / 20))
            ctx.lineTo(star.x + ((step + 1) * star.len / 20), star.y + ((step + 1) * star.len / 20))
            ctx.strokeStyle = star.col
            ctx.lineWidth = (step + 1) * growthFactor
            ctx.shadowBlur = 50 / (step + 1)
            ctx.shadowOffsetX = 0
            ctx.shadowColor = `#1581F7`
            ctx.stroke()
          }    
        }

        
        let iterated = 0
        const dampen = 0.8
        const rotSpeedInner = 0.06 * dampen
        const rotSpeedMid = 0.04 * dampen
        const rotSpeedOuter = 0.02 * dampen
        const radDistance = Math.PI / 2

        const hero = document.getElementById('hero').getBoundingClientRect()
        console.log(hero);

        function animate(){          
          ctx.clearRect(0, 0, canvas.width, canvas.height) 
          
          
          // Updating the stars of the background
          for(let star = 0; star < stars.length; star++){
            if(stars[star].x > canvas.width || stars[star].y > canvas.height){
              stars[star].x = (Math.random() - 1) * 1.5 * canvas.width
              stars[star].y = (Math.random() - 1) * canvas.height
              stars[star].len = 100 + Math.random() * 60
              stars[star].speed = (Math.random() * 2) + 1.5
            }else {
              stars[star].x += stars[star].speed 
              stars[star].y += stars[star].speed 
              draw(stars[star])
            }
          }

          // drawing the circles around portfolio picture
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.lineCap = `round`
          ctx.strokeStyle = `#004374`
          ctx.shadowBlur = 0
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 90, Math.PI + rotSpeedInner * iterated, Math.PI + rotSpeedInner * iterated + radDistance)
          ctx.stroke() 
          ctx.beginPath() 
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 90, rotSpeedInner * iterated, rotSpeedInner * iterated + radDistance)
          ctx.stroke()  
          ctx.beginPath()
          ctx.lineWidth = 4
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 96, 4 * Math.PI / 3 - rotSpeedMid * iterated, 2 * Math.PI - rotSpeedMid * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 96, Math.PI / 3 - rotSpeedMid * iterated, Math.PI - rotSpeedMid * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.lineWidth = 6
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 105, 0 + rotSpeedOuter * iterated, Math.PI + rotSpeedOuter * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, 105, 4 * Math.PI / 3 + rotSpeedOuter * iterated, 5 * Math.PI / 3 + rotSpeedOuter * iterated)
          ctx.stroke()
          iterated++


          requestAnimationFrame(animate)
        }
        

        // Pushing 5 initial stars
        for(let i = 0; i < 5; i++){
          stars.push({x: (Math.random() - 1) * canvas.width, y: (Math.random() + 1) * canvas.height, len: 40 + Math.random() * 60, speed: (Math.random() * 2) + 2, col: isRed()})
        }

        animate()
      }, [])



    return (
        <div className="homeMobileContainer">
            <canvas id='canvas'></canvas> 
            <div className={burgerOpen ? "homeMobileTop open" : "homeMobileTop"} >
              <div>
                  <h2>Mashnun</h2>
                  <div onClick={() => handleBurger()} className="hamBurger" >
                      <hr style={burgerOpen ? {margin : '11px 0px 2px 0px'} : {}}/>
                      <hr style={burgerOpen ? {margin : '2px 0px 11px 0px'} : {}}/>
                  </div>
              </div>
              <ul >
                {burgerOpen &&
                  <>
                    <li onClick={() => handleAboutClick()}>About me</li>
                    <li onClick={() => handleProjectClick()}>Projects</li>
                    <li onClick={() => handleSkillsClick()}>Skills</li>
                    <li onClick={() => handleContactClick()}>Contact me</li>
                  </>
                }
              </ul>
            </div>
            <div className="homeMobileBody" >
                <div className="introduction">
                    <h1>Hi, I'm Mashnun</h1>
                    <span>Front-end Developer</span>
                </div>
                <img id='hero' src="/nedStark.webp" alt="" fetchpriority='high'/>
            </div>
        </div>
    )
}