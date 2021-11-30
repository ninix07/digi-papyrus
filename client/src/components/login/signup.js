import { Link } from 'react-router-dom';
function Signup() {
    return (
        <div class="login">
            <h1>Sign Up</h1>
            <input type="textbox" placeholder="Username" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <Link to="/transition"><button class="sumbit">Continue</button></Link>
        </div>
    )
}
export default Signup;