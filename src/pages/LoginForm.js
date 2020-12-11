import React, {useState} from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function LoginForm ({toggleloginsignup,toggle,setLoggedIn}) {

  let history = useHistory()
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(response => {
      console.log(response)
      localStorage.setItem('jwt', response.data.auth_token)
      setLoggedIn(true)
      toggle()
      history.push(`/profile`)
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch(error => {
      console.error(error.response) // so that we know what went wrong if the request failed
    })
  };
  return (
    <div>
      <Form>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="username" name="username" id="username" placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </FormGroup>
            <p>New member? <a href="#" onClick={(e)=>{
              e.preventDefault()
              toggleloginsignup()
            }}>Sign up here</a></p>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleLogin}>Log In</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </div>
  );
}

export default LoginForm;