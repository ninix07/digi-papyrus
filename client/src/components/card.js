import React from 'react';
import logo from '../assets/images/save.png'
import './card.css'
function Card(prop) {
    return (
        <div className="card">
            <div className="bookcover">
                <img src={require("../assets/images/bookcover.png").default} alt="Book Cover" />
            </div>
            <div className="rectangle" />
            <div className="contents">
                <h3>{prop.genre}</h3>
                <h1>{prop.booktitle}</h1>
                <h2>{prop.writer}</h2>
                <button>Start Reading</button>
            </div>
            <div className =  "rating-save">
            <div className="rating">

            </div>
            <img src={logo} alt="save" />
            </div>

        </div>
    )
}
export default Card;