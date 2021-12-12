import './loginstyle.css'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
function Forget() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    var history = useHistory();
    function forget(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/forget',
            {
                email: email
            })
            .then((res) => {
                if (res.data.error === "") {
                    history.push('/transition')
                }
                else {
                    setMessage(res.data.error)
                }
            })
    }
    return (
        <div class="login">
            <h1>Recovery</h1>
            <input onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address" />
            <p style={{ color: "red" }}> {message} </p>
            <button onClick={forget} class="sumbit">Continue</button>
        </div>
    )
}
export default Forget;