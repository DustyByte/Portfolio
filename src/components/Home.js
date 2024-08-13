import React, { useEffect, useRef, useState } from "react"
import "./home.css"
/*git add .
        git commit -m "building the canvas"
        git push*/

function isRed(){
  return (Math.random() < 0.2 ? `red` : `#50AFFF`)
}        
        
export default function Home(){
    const [burgerOpen, setBurgerOpen] = useState(false)
    const hero = useRef(null)
    

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
        
        function animate(){          
          ctx.clearRect(0, 0, canvas.width, canvas.height)  
          
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

          if(hero){
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.lineCap = `round`
            ctx.strokeStyle = `#004374`
            ctx.shadowBlur = 0
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 90, Math.PI + rotSpeedInner * iterated, Math.PI + rotSpeedInner * iterated + radDistance)
            ctx.stroke() 
            ctx.beginPath() 
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 90, rotSpeedInner * iterated, rotSpeedInner * iterated + radDistance)
            ctx.stroke()  
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 96, 4 * Math.PI / 3 - rotSpeedMid * iterated, 2 * Math.PI - rotSpeedMid * iterated)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 96, Math.PI / 3 - rotSpeedMid * iterated, Math.PI - rotSpeedMid * iterated)
            ctx.stroke()
            ctx.beginPath()
            ctx.lineWidth = 6
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 105, 0 + rotSpeedOuter * iterated, Math.PI + rotSpeedOuter * iterated)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(hero.current.x + hero.current.width/2, hero.current.y + hero.current.height/2, 105, 4 * Math.PI / 3 + rotSpeedOuter * iterated, 5 * Math.PI / 3 + rotSpeedOuter * iterated)
            ctx.stroke()
            iterated++
          }  
    
          requestAnimationFrame(animate)
        }

        
        for(let i = 0; i < 5; i++){
          stars.push({x: (Math.random() - 1) * canvas.width, y: (Math.random() + 1) * canvas.height, len: 80 + Math.random() * 60, speed: (Math.random() * 2) + 2, col: isRed()})
        }

        animate()
      }, [])

    return (
        <div className="homeContainer">
            <canvas id='canvas'></canvas> 
            <div className={burgerOpen ? "top open" : "top"} >
                <h2>Mashnun</h2>
                <div onClick={() => setBurgerOpen(prev => !prev)} className="hamBurger" >
                    <hr className="left"/>
                    <hr className="right"/>
                </div>
            </div>
            <div className="homeBody" style={{paddingTop: window.innerHeight / 6}} >
                <div className="introduction">
                    <h1>Hi, I'm Mashnun</h1>
                    <span>Front-end Developer</span>
                </div>
                <img ref={hero} src="/favicon.ico" alt=""/>
            </div>
        </div>
    )
}