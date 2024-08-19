import React, { useEffect } from "react"
import './homePC.css'
import { isRed } from "../Mobile/HomeMobile"

export default function HomePC(){

    useEffect(() => {    
        const canvas = document.getElementById(`canvas`)
        const ctx = canvas.getContext(`2d`)
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars = []
        
        const growthFactor = 0.1
        // const windowRatio = canvas.width / canvas.height

        function draw(star){
          for(let step = 0; step < 5; step++){
            ctx.beginPath()
            ctx.moveTo(star.x + (step * star.len / 20) /** windowRatio*/, star.y + (step * star.len / 20))
            ctx.lineTo(star.x + ((step + 1) * star.len / 20) /** windowRatio*/, star.y + ((step + 1) * star.len / 20))
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

        function animate(){          
          ctx.clearRect(0, 0, canvas.width, canvas.height) 
          
          
          // Updating the stars of the background
          for(let star = 0; star < stars.length; star++){
            if(stars[star].x > canvas.width || stars[star].y > canvas.height){
              stars[star].x = (Math.random() - 1) * canvas.width
              stars[star].y = (Math.random() - 1) * canvas.height
              stars[star].len = 60 + Math.random() * 60
              stars[star].speed = (Math.random() * 2) + 1.5
            }else {
              stars[star].x += stars[star].speed /** windowRatio*/
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
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, hero.width/2+5, Math.PI + rotSpeedInner * iterated, Math.PI + rotSpeedInner * iterated + radDistance)
          ctx.stroke() 
          ctx.beginPath() 
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, hero.width/2+5, rotSpeedInner * iterated, rotSpeedInner * iterated + radDistance)
          ctx.stroke()  
          ctx.beginPath()
          ctx.lineWidth = 4
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, (hero.width/2+5) + 6, 4 * Math.PI / 3 - rotSpeedMid * iterated, 2 * Math.PI - rotSpeedMid * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, (hero.width/2+5) + 6, Math.PI / 3 - rotSpeedMid * iterated, Math.PI - rotSpeedMid * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.lineWidth = 6
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, (hero.width/2+5) + 15, 0 + rotSpeedOuter * iterated, Math.PI + rotSpeedOuter * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(hero.x + hero.width/2, hero.y + hero.height/2, (hero.width/2+5) + 15, 4 * Math.PI / 3 + rotSpeedOuter * iterated, 5 * Math.PI / 3 + rotSpeedOuter * iterated)
          ctx.stroke()
          iterated++


          requestAnimationFrame(animate)
        }
        

        // Pushing 5 initial stars
        for(let i = 0; i < 8; i++){
          stars.push({x: (Math.random() - 1) * canvas.width, y: (Math.random() - 1) * canvas.height, len: 80 + Math.random() * 60, speed: (Math.random() * 2) + 2, col: isRed()})
        }

        animate()
      }, [])

    return (
        <div className="homePCContainer">
            <canvas id="canvas" />
            <div className="homePCTop">
                <h1>Mashnun</h1>
                <div className="icons">
                  <a aria-label="Check out my Github profile?" href="https://github.com/DustyByte" ><img fetchpriority="low" src="/githubIcon.webp" alt="" className="github icon"/></a>
                  <a aria-label="Check out my Facebook profile?" href="https://www.facebook.com/profile.php?id=61557519700512&mibextid=LQQJ4d" ><img fetchpriority="low" src="/facebookIcon.webp" alt="" className="facebook icon"/></a>
                </div>
                <ul>
                    <li>About me</li>
                    <li>Projects</li>
                    <li>Academics</li>
                    <li>Skills</li>
                    <li>Contact me</li>
                </ul>
            </div>
            <div className="homePCBody">
                <div>
                    <div className="introduction">
                        <h1>Hi, I'm Mashnun</h1>
                        <span>Front-end developer</span>
                    </div>
                    <img id="hero" src="/nedStark.webp" alt="" />
                </div>
            </div>
        </div>
    )
}