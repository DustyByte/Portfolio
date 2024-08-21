import './aboutMePC.css'


export default function AboutMePC(){

    return (
        <div className="AboutPCContainer" id='about'>
            <h1>About <span>Me</span></h1>
            <div>
                <div className="texts">
                    <h2>Front-End</h2>
                    <h4>I am a front-End developer with over an year of experience.</h4>
                    <p>After finishing my HSC examination, i got into programming in general.Playing with different techs, I ended up here as an web dev.</p>
                </div>
                <div className='imageWrapper'>
                    <img src="/flat.webp" alt="" fetchpriority="low" loading='lazy' />
                </div>
            </div>
        </div>
    )
}