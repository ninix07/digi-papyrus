import './loginstyle.css'
import {Link} from 'react-router-dom'
function Login() {
    return (
        <div class="login">
            <h1>Login</h1>
            <input type="textbox" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <Link to="/"><button class="sumbit">Continue</button></Link>
            <p><Link to = "/forget">Forget your password?</Link> </p>
            <p>Don't have an account? <Link to = "/signup">Register now</Link> </p>
        </div>
    )
}
export default Login;