import React from 'react';
import ReactDom from 'react-dom';


export default function Img_Uploader(){


    return (
        <div style={{'background-color':'#000000'}}>
            <div style={{'background-color':'#E8F9FD' , 'width':'200px', 'justify-content':'center', 'justify-items':'center', 'border-radius':'20px'}}>
                <div style={{'display': 'flex', 'justify-content':'space-between' , 'padding':'20px'}}>
                    <h4>Upload</h4>
                    <h4>X</h4>
                </div>

                <button style={{'margin':'20px'}}>Upload</button>

            </div>

        </div>
    )
}
