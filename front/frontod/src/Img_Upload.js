import React, { useState , useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import { Button } from 'react-bootstrap';



function Detailed_Object(props){

    return(
        <div style={{'background-color':'#ffffff', 'display':'flex', 'justify-content':'space-between', 'padding':'1px 50px', 'margin':'20px', 'border-radius':'15px'}}>
            <p style={{'font-family':'Helvetica', 'font-weight':'bold', 'font-size':'15pt', 'color':'#2A363B'}}>{props.name}</p>
            <p style={{'font-family':'Helvetica', 'font-weight':'bold', 'font-size':'15pt', 'color':'#2A363B'}}>{props.conf}</p>

        </div>
    )
}



export default function Img_Uploader(){


    let endpoint_url = "http://127.0.0.1:8000/upload/"


    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [detectedObjects, setDetectedObjects] = useState('');
    const [fileURL, setfileURL] = useState('');

    var dummyList = []


    useEffect(() => {
        if (!selectedFile) {
            setfileURL(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setfileURL(objectUrl);

        // Free memory when the component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);



    const handleFileChange = (event) => {
        const filee = event.target.files[0]
        setSelectedFile(filee);
        if(filee){
            const urll = URL.createObjectURL(filee)
            setfileURL(urll)
            
            console.log(urll)
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        
        formData.append('image', selectedFile);

        

        try {
            const response = await axios.post(endpoint_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            console.log(response)

            if (response.status == 200) {
                setUploadStatus('Image uploaded successfully!');

                console.log('Image uploaded successfully!')



                let mappedObject = response.data
                dummyList = []
                Object.keys(mappedObject).forEach((key, index)=>{

                    let dummyObject = {'name': key, 'conf': String(parseFloat(mappedObject[key]).toPrecision(4))}
                    dummyList.push(dummyObject)
                  });
                

                let new_state = dummyList.map((elm)=>Detailed_Object(elm))

                setDetectedObjects(new_state)


                




            } else {
                setUploadStatus('Image upload failed.');
            }





            







        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('An error occurred while uploading the image.');
        }
    };



    return (
        <div style={{'background-color':'#f11158', 'width':'10', 'height':'100%', 'padding':'30% 0'}}>
            <div style={{'background-color':'#f3fdff', 'margin':'auto auto', 'width':'50%', 'justify-content':'center', 'justify-items':'center', 'border-radius':'20px', 'box-shadow':'0 0 25px 2px '}}>
                <div style={{'display': 'flex', 'justify-content':'space-between' , 'padding':'20px'}}>
                    <p style={{'font-family':'Helvetica', 'font-weight':'bold', 'font-size':'30pt', 'color':'#2A363B'}}>Upload</p>
                </div>


                <input type="file" name="image" accept="image/*" onChange={handleFileChange} style={{'margin':'10px 40px'}}/>
                

                {fileURL && <img src={fileURL} style={{'width':'80%', 'margin':'auto auto', 'display':'block', 'border-radius':'10px'}}/>}

                {/* {fileURL && <button onClick={handleUpload} style={{'margin':'20px auto', 'display':'block', 'width':'20%', 'margin-bottom':'20px', 'background-color':'#6A7EFC'}}>Analyze</button>} */}

                {fileURL && <Button variant="primary" size="lg" className="text-capitalize" onClick={handleUpload} style={{'margin':'20px auto', 'display':'block'}}>
                    Analyze
                </Button>}

                {detectedObjects}



            </div>

        </div>
    )
}
