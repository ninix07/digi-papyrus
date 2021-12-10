import './loginstyle.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';




function Transition() {
    const [pin, setPin] = useState('')
    function add() {
        axios.post('http://localhost:5000/api/transition', {
            transitionPin: pin
        })
    }
    function resend(){
        axios.post('http://localhost:5000/api/resend', {
            resend:true
        })
    }
        
    return (
        <div className="login">
            <h1>Transition Pin</h1>
            <input type="textbox"
                placeholder="******"
                onChange={(e) => {
                    setPin(e.target.value);
                }} />
            <div onClick={add}>
                <Link to="/login">
                    <button className="sumbit">
                        Continue</button>
                </Link>
            </div>
            <p>Didn't got transition pin?
                <h6
                    onClick={resend}>Resend</h6></p>
        </div>
    )
}
export default Transition;