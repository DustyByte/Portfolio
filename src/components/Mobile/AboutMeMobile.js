import './aboutMeMobile.css'


export default function AboutMeMobile(){

    return (
        <div className="AboutMobileContainer" id='about' >
            <h1>About <span>Me</span></h1>
            <div>
                <div className="texts">
                    <h2>Front-End</h2>
                    <h4>I am a front-End developer with over an year of experience.</h4>
                    <p>After finishing my HSC examination, i got into programming in general.Playing with different techs, I ended up here as an web dev.</p>
                </div>
                <img src="/flat.webp" alt="" fetchpriority="low" />
            </div>
        </div>
    )
}