import '../login/loginstyle.css';
import { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function BookUpload() {
    //use states to change the variable on change
    const [Author,setAuthor] = useState('');
    const [BookName,setBookName] = useState('');
    const [message,setMessage] = useState('');
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    

	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsSelected(true);
	};

	

    //function 
    //@params e event
    //brief: cheaks all the validity and sends the api reqeust
    const addtolist = async (e) => {
        const file = document.getElementById('inputGroupFile01').files
        e.preventDefault();
        let formData= new FormData();
        formData.append('img',file);
        axios.post('http://localhost:5000/api/upload/',formData, {
            
            headers: {
                'Content-Type': "multipart/form-data",
              },

        })
            .then(res => {
                console.log("data send")
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
            <input type="file" name="file" id="inputGroupFile01" onChange={changeHandler} />
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
