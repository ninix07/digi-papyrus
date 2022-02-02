import { useState } from 'react'

function Chat(){
    const [Sender,setSender] = useState('');
    const [Reciever,setReciever] = useState('');
    const [message,setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    var text;
    
    const changeHandler = (e) => {
    
        if(e.target.files[0].type && e.target.files[0].type.indexOf('text/plain')===-1){
            setMessage('Please select txt file.');
            return;
        }
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(e.target.files[0].type);
		setIsSelected(true);
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
           text = (e.target.result)
          console.log(text)
        };
        reader.readAsText(e.target.files[0])
	};
    const processing = async (e)=>{

       
 
    };


    
    return(
        <div>

       
        <input
            type="textbox"
            placeholder="Sender"
            onChange={(event) => {
                setReciever(event.target.value)
            }} />
        <input
            type="textbox"
            placeholder="Reciever"
            onChange={(event) => {
                setSender(event.target.value)
            }} />
             <input type="file" name="File" id="inputFile01" onChange={changeHandler} />
        {isSelected  ? (

            
            
            <p> File Selected!</p>
           ) : (
            <div>
            <p>Select a file</p>
            <p>{message}</p>
            </div>
        )}
        <button onClick={processing}
            className="sumbit">
            Continue
        </button>
    </div>

    );
}
export default Chat;