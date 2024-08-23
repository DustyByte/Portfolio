import { isMobile } from 'react-device-detect'
import './contactMe.css'

export default function ContactMe(){

    return (
        <div id='contact' style={{display: `flex`,
                                         flexDirection: !isMobile ? `row` : `column`,
                                         alignItems: `center`,
                                         justifyContent: !isMobile ? `space-evenly` : `flex-start`}}>
            <h4>Email: <p>mashnunurrahman@gmail.com</p></h4>
            <h4>Phone: <p>+8801329572409</p></h4>
        </div>
    )
}