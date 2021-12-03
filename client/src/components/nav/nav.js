import './nav.css'
import logo from '../../assets/images/logo.svg'
import threeline from '../../assets/images/threeline.png'
import search from '../../assets/images/search.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {

    //vertical bar using burger
    const [navvertical, setnavvertical] = useState("verticalnav");
    function action() {
        if (navvertical === "verticalnav") {
            setnavvertical("verticalnavactive")
        }
        else {
            setnavvertical('verticalnav')
        }
    }

    //search bar extension
    const [searchbar, setsearchbar] = useState("searchbar")
    const [digi, setdigi] = useState('digi')
    function searchbarfunction() {
        if (searchbar === "searchbaractive") {
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
                <img src={logo} width="120px" alt="logo" />
                <ul>
                    <li><Link to="/" className={digi}>What is Digi-Papyrus ?</Link></li>
                    <li className={searchbar}>
                        <Link to="/">
                            <img onClick={searchbarfunction} src={search} width="24px" alt="searchicon" />
                            <input type="text" placeholder="search" />
                        </Link>
                    </li>
                    <li><Link to="/">Books</Link></li>
                    <li><Link to="/">Magazines</Link></li>
                    <li><Link to="/">Documents</Link></li>
                    <li className="burger"><img onClick={action} src={threeline} width="24px" alt="burgericon"></img></li>
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