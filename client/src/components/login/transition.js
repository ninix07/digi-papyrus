import './loginstyle.css'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Transition() {
    const [pin, setPin] = useState('')
    const [message, setMessage] = useState('')
    const history = useHistory();
    function add() {
        axios.post('http://localhost:5000/api/transition', {
            transitionPin: pin
        })
            .then((res) => {
                if (res.data.error === 'from forget') {
                    history.push('/newpassword')
                }
                else if (res.data.error === 'from register') {
                    history.push('/login')
                }
                else {
                    setMessage(res.data.error);
                }
            })
    }
    function resend() {
        axios.post('http://localhost:5000/api/resend', {
            resend: true
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
            <p style={{ color: "red" }}> {message} </p>
            <div onClick={add}>
                <button className="sumbit">
                    Continue</button>
            </div>
            <p>Didn't got transition pin?
                <h6
                    onClick={resend}>Resend</h6></p>
        </div>
    )
}
export default Transition;