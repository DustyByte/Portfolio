import React from "react"
import './homePC.css'

export default function HomePC(){

    return (
        <div className="homePCContainer">
            <div className="homePCTop">
                <h2>Mashnun</h2>
                <ul>
                    <li>About me</li>
                    <li>Projects</li>
                    <li>Academics</li>
                    <li>Skills</li>
                    <li>Contact me</li>
                </ul>
            </div>
            <div className="homePCBody">
                <div className="introduction">
                    <h1>Hi, I'm Mashnun</h1>
                    <span>Front-end developer</span>
                </div>
                <img src="/nedStark.jpeg" alt="" />
            </div>
        </div>
    )
}