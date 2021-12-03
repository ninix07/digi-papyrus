import './loginstyle.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
function Login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const loginPostdata = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:2000/users/login/'
        axios.post(url,{
            username:username,
            password:password,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div class="login">
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
            <Link to="/"><button className="sumbit" onClick={loginPostdata}>Continue</button></Link>
            <p><Link to="/forget">Forget your password?</Link> </p>
            <p>Don't have an account? <Link to="/signup">Register now</Link> </p>
        </div>
    )
}
export default Login;