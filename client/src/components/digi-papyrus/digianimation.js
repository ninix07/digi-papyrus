import Typical from 'react-typical'
import './digianimation.css'
function Digianimation() {
    return (
        <div className="digianimation">
            <h1>
                <Typical Loop={10}
                    wrapper="b"
                    steps={
                        ['Digi-Papyrus', 100, 'Digi-Papyrus']
                    }></Typical>
            </h1>
            <h2>New way of reading.</h2>
        </div>
    )
}
export default Digianimation;