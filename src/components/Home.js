import React, { useEffect, useState } from "react"
import "./home.css"
/*git add .
        git commit -m "added canvas for test"
        git push*/
        
export default function Home(){
    const [height, setHeight] = useState(null)

    useEffect(() => {
        const canvas = document.getElementById(`canvas`)
        const ctx = canvas.getContext(`2d`)
        
        console.log(canvas.width)
   
        setHeight(canvas.height);                                                     
        const stars = []
        
        function draw(star){
          const stepLen = star.len / 20
          const growthFactor = 0.1
          for(let step = 0; step < 20; step++){
            ctx.beginPath()
            ctx.moveTo(star.x + (step * stepLen), star.y + (step * stepLen))
            ctx.lineTo(star.x + ((step + 1) * stepLen), star.y + ((step + 1) * stepLen))
            ctx.strokeStyle = `#50AFFF`
            ctx.lineWidth = (step + 1) * growthFactor
            ctx.lineCap = `round`
            ctx.shadowBlur = 100 / (step + 1)
            ctx.shadowOffsetX = 0
            ctx.shadowColor = `#1581F7`
            ctx.stroke()
          }    
        }

        
        let iterated = 0
        const dampen = 0.8
        const rotSpeed = 0.04 * dampen
        const radDistance = Math.PI / 2
        
        function animate(){          
          ctx.clearRect(0, 0, canvas.width, canvas.height)  
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.lineCap = `round`
          ctx.strokeStyle = `#004374`
          ctx.shadowBlur = 0
          ctx.arc(canvas.width / 2, canvas.height / 2, 90, Math.PI + rotSpeed * iterated, Math.PI + rotSpeed * iterated + radDistance)
          ctx.stroke() 
          ctx.beginPath() 
          ctx.arc(canvas.width / 2, canvas.height / 2, 90, rotSpeed * iterated, rotSpeed * iterated + radDistance)
          ctx.stroke()  
          ctx.beginPath()
          ctx.lineWidth = 4
          ctx.arc(canvas.width / 2, canvas.height / 2, 96, 4 * Math.PI / 3 - rotSpeed * iterated, 2 * Math.PI - rotSpeed * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(canvas.width / 2, canvas.height / 2, 96, Math.PI / 3 - rotSpeed * iterated, Math.PI - rotSpeed * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.lineWidth = 6
          ctx.arc(canvas.width / 2, canvas.height / 2, 105, 0 + rotSpeed * iterated, Math.PI + rotSpeed * iterated)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(canvas.width / 2, canvas.height / 2, 105, 4 * Math.PI / 3 + rotSpeed * iterated, 5 * Math.PI / 3 + rotSpeed * iterated)
          ctx.stroke()
          iterated++
    
          for(let star = 0; star < stars.length; star++){
            if(stars[star].x > canvas.width || stars[star].y > canvas.height){
              stars[star].x = (Math.random() - 1) * canvas.width
              stars[star].y = (Math.random() - 1) * canvas.height
              stars[star].len = 80 + Math.random() * 60
              stars[star].speed = (Math.random() * 2) + 2
            }else {
              stars[star].x += stars[star].speed 
              stars[star].y += stars[star].speed 
              draw(stars[star])
            }
          }
    
          requestAnimationFrame(animate)
        }

        
        for(let i = 0; i < 4; i++){
          stars.push({x: (Math.random() - 1) * canvas.width, y: (Math.random() + 1) * canvas.height, len: 80 + Math.random() * 60, speed: (Math.random() * 2) + 2})
        }
       
        animate()
      }, [])

    return (
        <div className="homeContainer">
            <canvas id='canvas'></canvas> 
            <div className="top" >
                <h2>Mashnun</h2>
                <div className="hamBurger" >
                    <hr className="left"/>
                    <hr className="right"/>
                </div>
            </div>
            <div className="homeBody" >
                <div className="introduction">
                    <h1>Hi, I'm Mashnun</h1>
                    <span>Front-end Developer</span>
                </div>
                <img src="/favicon.ico" alt=""/>
                {height}
            </div>
        </div>
    )
}