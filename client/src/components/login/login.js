import './loginstyle.css'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

function Login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');
    let history = useHistory();

    const loginPostdata = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/login/'
        axios.post(url, {
            username: username,
            password: password,
        })
            .then(res => {
                console.log("Data sent")
                if (res.data.error === "password matched") {
                    history.push('/')
                }
                else {
                    setMessage(res.data.error);
                }
            })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input
                type="textbox"
                placeholder="Username"
                onChange={(event) => {
                    setusername(event.target.value)
                }} />
            <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                    setpassword(event.target.value)
                }} />
            <p style={{ color: "red" }}> {message} </p>
            {/* <Link to="/"> */}
            <button className="sumbit" onClick={loginPostdata}>Continue</button>
            {/* </Link> */}

            {/* <p><Link to="/forget">Forget your password?</Link> </p> */}
            <p>Don't have an account? <Link to="/signup">Register now</Link> </p>
        </div>
    )
}
export default Login;