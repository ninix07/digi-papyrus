import Typical from 'react-typical'
import './digianimation.css'
function Digianimation() {
    return (
        <div className="digianimation">
            <h1>
                <Typical Loop={Infinity}
                    wrapper="b"
                    steps={
                        ['Digi-Papyrus', 1000, 'The New Way of Reading']
                    }></Typical>
            </h1>
        </div>
    )
}
export default Digianimation;