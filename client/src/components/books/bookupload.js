import '../login/loginstyle.css';
import { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';




function BookUpload() {
    //use states to change the variable on change
    const [Sender,setSender] = useState('');
    const [BookName,setReciever] = useState('');
    const [message,setMessage] = useState('');
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    

	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
		setIsSelected(true);
	};

	

    //function 
    //@params e event
    //brief: cheaks all the validity and sends the api reqeust
    const addtolist = async (e) => {
        
        e.preventDefault();
        const formData= new FormData();
        
        formData.append('File',selectedFile);
        formData.append('Sender',Sender);
        formData.append('BookName',BookName);
        axios.post('http://localhost:5000/api/upload/',formData, {

        })
            .then(res => {
                console.log("Success data sent")
                if (res.data.error !== "") {
                    history.push('/AddBooks')
                    setMessage(res.data.error)
                }
                else {
                    history.push('/')
                }
            })
    


    };
    
    return (
        <div className="login">

            <p style={{ color: "red" }}> {message} </p>
            <input type="file" name="File" id="inputFile01" onChange={changeHandler} />
            <input
                type="textbox"
                placeholder="Book Name"
                onChange={(event) => {
                    setReciever(event.target.value)
                }} />
            <input
                type="textbox"
                placeholder="Sender"
                onChange={(event) => {
                    setSender(event.target.value)
                }} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					
				</div>
			) : (
				<p>Select a file</p>
            
			)}
            <button onClick={addtolist}
                className="sumbit">
                Continue
            </button>
        </div>
    );
}

export default BookUpload;
