import './nav.css'
import logo from '../assets/images/logo.svg'
import threeline from '../assets/images/threeline.png'
import search from '../assets/images/search.png'
import { useState } from 'react'

function Nav() {
    const [nav, setNav] = useState("verticalnav");
    function action() {
        if (nav == "verticalnav") {
            setNav("verticalnavactive")
        }
        else {
            setNav('verticalnav')
        }
        console.log(nav)
    }
    return (
        <div className='nav'>
            <img src={logo} width="120px" />
            <ul className="nav">
                <li><a>What is Digi-Papyrus ?</a></li>
                <li><a><img src={search} width="24px" /></a></li>
                <li>Books</li>
                <li><a>Magazines</a></li>
                <li><a>Documents</a></li>
                <li><a onClick={action}><img src={threeline} width="24px"></img></a></li>
            </ul>
            <div className={nav}>
                <h1>Login|SignUP</h1>
                <h1>Publish Book</h1>
                <h1>Source Code</h1>
            </div>
        </div>
    )
}
export default Nav;