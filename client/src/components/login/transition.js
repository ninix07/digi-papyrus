import './loginstyle.css'
import { Link } from 'react-router-dom';
function Transition() {
    return (
        <div className="login">
            <h1>Transition Pin</h1>
            <input type="textbox" placeholder="******" />
            <Link to="/login"><button className="sumbit">Continue</button></Link>
            <p>Didn't got transition pin? <Link to="/">Resend</Link></p>
        </div>
    )
}
export default Transition;