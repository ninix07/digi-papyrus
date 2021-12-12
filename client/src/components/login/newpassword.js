import './loginstyle.css'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
function Newpassword() {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('')
    const history = useHistory();
    function newpassword() {
        axios.post('http://localhost:5000/api/newpassword',
            {
                password: password,
                password2: password2
            })
            .then((res) => {
                if (!res.data.error) {
                    history.push('/login')
                }
                else {
                    setMessage(res.data.error);
                }
            })
    }
    return (
        <div class="login">
            <h1>New Password</h1>
            <input onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="New Password" />
            <input onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Confirm New Password" />
            <p style={{ color: "red" }}> {message} </p>
            <button onClick={newpassword} class="sumbit">Continue</button>
        </div>
    )
}
export default Newpassword;