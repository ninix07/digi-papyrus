import './loginstyle.css'
import { Link } from 'react-router-dom';
function Transition() {
    return (
        <div class="login">
            <h1>Transition Pin</h1>
            <input type="textbox" placeholder="******" />
            <Link to="/login"><button class="sumbit">Continue</button></Link>
            <p>Didn't got transition pin? <a>Resend</a> </p>
        </div>
    )
}
export default Transition;