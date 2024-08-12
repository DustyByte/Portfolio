import React, { useEffect } from "react"
import "./home.css"
/*git add .
        git commit -m "added canvas for test"
        git push*/
        
export default function Home(){

    useEffect(() => {
        const canvas = document.getElementById(`canvas`)
        const ctx = canvas.getContext(`2d`)
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
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
        let radius = 100 
        function animate(){
           
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.beginPath()
          ctx.arc(208, 378, radius, 0, Math.PI*2*0.33)
          ctx.lineWidth = 8
          ctx.strokeStyle = `#50AFFF`
          ctx.stroke()
          radius++
    
          for(let star = 0; star < stars.length; star++){
            if(stars[star].x > canvas.width || stars[star].x > canvas.height){
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

        
        console.log(ctx)
    
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
                <img src="/favicon.ico" alt=""/>
            </div>
        </div>
    )
}