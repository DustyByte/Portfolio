import { isMobile } from 'react-device-detect'
import './projects.css'

export default function Projects(){

    return (
        <div className='projectsContainer' id='projects'>
            <h1>Projects</h1>
            <div>
                <a href='https://geminiclonex.netlify.app/' aria-label='Project link'>
                    <img style={{width: isMobile ? '80svw' : '60svw'}} src='/geminiProject.webp' alt='' fetchpriority='low' loading='lazy'/>
                </a>
                <h3>Gemini clone</h3>
                <div style={{width: isMobile ? '80svw' : '60svw'}}>
                    <h4>Deliverables:</h4>
                    <li>React</li>
                    <li>CSS</li>
                    <li>Git</li>
                </div>
            </div>
            <div>
                <a href='https://glassychatapp.netlify.app/' aria-label='Project link'>
                    <img style={{width: isMobile ? '80svw' : '60svw'}} src='/glassyProject.webp' alt='' fetchpriority='low' loading='lazy'/>
                </a>
                <h3>Glassy chat app</h3>
                <div style={{width: isMobile ? '80svw' : '60svw'}}>
                    <h4>Deliverables:</h4>
                    <li>Firebase</li>
                    <li>React</li>
                    <li>CSS</li>
                </div>
            </div>
        </div>    
    )
}