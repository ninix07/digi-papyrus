import Nav from "./nav"
import './login.css'
function Login() {
    return (
        <div className="container">
            <div class="login">
                <h1>Login</h1>
                <input type="textbox" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button class="sumbit">Continue</button>
                <p><a>Forget your password?</a> </p>
                <p>Don't have an account? <a>Register now</a> </p>
            </div>
        </div>
    )
}
export default Login;