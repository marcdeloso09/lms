import React from 'react'
import './Frontpage.css'
import canva from '../Sections/canva.png'
import blackboard from '../Sections/blackboard.png'
import msteams from '../Sections/msteams.png'
import { Link } from 'react-router-dom'

export default function Frontpage() {
  return (
    <div class="login-boxes">
        <div class="boxes">
            <div class="box-1">
                <div class="box-logo">
                    <img src={canva} alt=""/>
                    <p>Canva Room</p>
                </div>
                <Link to={'/canvas'} style={{ textDecoration:"none" }}>
                <div class="box-content">
                    <button class="button" value="button">Enter</button>
                </div>
                </Link>
            </div>
            <div class="box-2">
                <div class="box-logo">
                    <img src={blackboard} alt=""/>
                    <p>Ease Room</p>
                </div>
                <Link to={'/classroom'} style={{ textDecoration:"none" }}>
                <div class="box-content">
                    <button class="button" value="button">Enter</button>
                </div>
                </Link>
            </div>
            <div class="box-3">
                <div class="box-logo">
                    <img src={msteams} style={{ marginTop: '15px'}} alt=""/>
                    <p style={{ marginTop: '40px'}}>Teams Room</p>
                </div>
                <Link to={'/msteams'} >
                <div class="box-content">
                    <button class="button">Enter</button>
                </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
