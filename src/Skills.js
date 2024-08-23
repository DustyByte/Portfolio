import { isMobile } from 'react-device-detect'
import './skills.css'

export default function Skills(){
    const showcaseCircleRad = !isMobile ? `8svw` : `21.3svw`
    const iconWidth = !isMobile ? `5svw` : `13.3svw`
    const centerIconWidth = !isMobile ? `10svw` : `26.6svw`
    
    return (
        <div className='skillsContainer' id='skills'>
            <h1><span>My </span>Skills</h1>
            <div style={{ width: `calc(${showcaseCircleRad} * 2)` }}>
                <img src='/ReactIcon.svg' alt='' style={{width: centerIconWidth}}/>            
                <img src='/CSSIcon.svg' alt='' style={{width: iconWidth, position: 'absolute', top: `0%`, left: `50%`, translate: `-50% -50%`}}/>            
                <img src='/JSIcon.svg' alt='' style={{width: iconWidth, position: 'absolute', top: `calc(${showcaseCircleRad} - ${showcaseCircleRad} * ${Math.sin(21*Math.PI/10)})`, left: `calc(${showcaseCircleRad} + ${showcaseCircleRad} * ${Math.cos(21*Math.PI/10)})`, translate: `-50% -50%`}}/>            
                <img src='/GitIcon.svg' alt='' style={{width: iconWidth, position: 'absolute', top: `calc(${showcaseCircleRad} - ${showcaseCircleRad} * ${Math.sin(9*Math.PI/10)})`, left: `calc(${showcaseCircleRad} + ${showcaseCircleRad} * ${Math.cos(9*Math.PI/10)})`, translate: `-50% -50%`}}/>            
                <img src='/TSIcon.svg' alt='' style={{width: iconWidth, position: 'absolute', top: `calc(${showcaseCircleRad} - ${showcaseCircleRad} * ${Math.sin(13*Math.PI/10)})`, left: `calc(${showcaseCircleRad} + ${showcaseCircleRad} * ${Math.cos(13*Math.PI/10)})`, translate: `-50% -50%`}}/>            
                <img src='/FirebaseIcon.svg' alt='' style={{width: iconWidth, position: 'absolute', top: `calc(${showcaseCircleRad} - ${showcaseCircleRad} * ${Math.sin(17*Math.PI/10)})`, left: `calc(${showcaseCircleRad} + ${showcaseCircleRad} * ${Math.cos(17*Math.PI/10)})`, translate: `-50% -50%`}}/>            
            </div>            
        </div>
    )
}