import React, {useEffect, useState} from 'react';
import {Modal} from 'reactstrap';
import {Card, CardImg} from 'reactstrap';
import { Button, Form, FormGroup, Label, CustomInput, Input, FormText } from 'reactstrap';
import axios from 'axios';

const UploadPage = () => {

  const [imageFile, setImageFile] = useState(null)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');

    const handleFile = (e => {
    e.preventDefault()
    const selectImageFile=e.target.files
    setImageFile(selectImageFile)
    console.log(imageFile)
    setPreviewImage(URL.createObjectURL(selectImageFile[0]))
  })
  console.log(imageFile)
    

    const handleSubmit = (e => {
    // Prevent the default behaviour of the form submitting
    e.preventDefault();
    // Authorization of the user
    let JWT = localStorage.getItem("jwt");
    // Formdata object to hold the image file to send to the server
    let formData = new FormData();
    // Append the key:value pair to the formData object
    formData.append("image", imageFile[0]);
  
    axios.post("https://insta.nextacademy.com/api/v1/images/",
    formData,
    {
        headers: { 
            "Authorization" : `Bearer ${JWT}` 
        }
    })
      .then(response => {
        if (response.data.success) {
            setMessage("Image Uploaded Successfully!")
            setPreviewImage(null)
            setImageFile(null)
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  });

    return(
      // Your code will go here
        <>
        <div>
            <button className="text-muted" onClick={toggle}>Upload</button>
            <Modal isOpen={modal} toggle={toggle}>
            <Form>
            <FormGroup>
                <Label for="uploadFile">Image Upload</Label>
                    <Card>
                    {previewImage ? (
                        <CardImg
                        src={previewImage}
                        width="50%"
                        height="300px"
                        />
                        ) : (
                        <h3 style={{height:"300px"}}className="text-center">
                        {message ? message : "Live Preview"}
                        </h3>
                    )}
                    </Card>
                <CustomInput
                type="file"
                name="image-file"
                multiple="multiple"
                onChange= { handleFile
                    // The function to call when you have selected a file will be called here
                    }
                />
                <FormText color="muted">
                Make sure the image being uploaded is a supported format.
                </FormText>
            </FormGroup>
            <Button type="submit" color="primary" disabled={!imageFile} onClick={handleSubmit}>
                Upload
            </Button>
                </Form>
            </Modal>
        </div>
        </>
    )
}

export default UploadPage;