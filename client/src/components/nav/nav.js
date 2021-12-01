import './nav.css'
import logo from '../../assets/images/logo.svg'
import Login from '../login/login'
import threeline from '../../assets/images/threeline.png'
import search from '../../assets/images/search.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    const [navvertical, setnavvertical] = useState("verticalnav");
    function action() {
        if (navvertical == "verticalnav") {
            setnavvertical("verticalnavactive")
        }
        else {
            setnavvertical('verticalnav')
        }
    }
    const [searchbar, setsearchbar] = useState("searchbar")
    const [digi, setdigi] = useState('digi')
    function searchbarfunction() {
        if (searchbar == "searchbaractive") {
            setsearchbar("searchbar")
            setdigi('digi')
        }
        else {
            setdigi('digiactive')
            setsearchbar('searchbaractive')
        }
    }
    return (
        <div className="container">
            <div className='nav'>
                <img src={logo} width="120px" />
                <ul>
                    <li><a className={digi}>What is Digi-Papyrus ?</a></li>
                    <li className={searchbar}><a><img onClick={searchbarfunction} src={search} width="24px" /><input type="text" placeholder="search" /></a></li>
                    <li><a >Books</a></li>
                    <li><a>Magazines</a></li>
                    <li><a>Documents</a></li>
                    <li className="burger"><a onClick={action}><img src={threeline} width="24px"></img></a></li>
                </ul>
            </div>
            <div className={navvertical}>
                <Link to="/login">
                    <h1>Login|SignUP</h1>
                </Link>
                <h1>Publish Book</h1>
                <h1>Source Code</h1>
            </div>
        </div>
    )
}
export default Nav;