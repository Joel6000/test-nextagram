import React, {useState} from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

function LoginModal ({toggleloginsignup,toggle}) {

  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data)
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };
  
  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setusername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length < 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }
    if (username.length < 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }
    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    } 
  };

  const handleEmail = (e) => {
    const newemail=(e.target.value)
    setemail(newemail);
  }

  const regex= /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/
  const getEmailProp = () => {
    if (!email.length){
      return null
    }
    if (regex.test(email)) {
      return { valid: true }; 
    } else {
      return { invalid: true };
    }
  }

  const getemailFeedBack = () => {
    if (!email.length){
      return null
    }
    if (regex.test(email)) {
      return  <FormFeedback valid>Valid email.</FormFeedback>;
    } else {
      return <FormFeedback invalid>Please enter valid email.</FormFeedback>;
    }
  }

  const handlePassword = e => {
    const newpassword=(e.target.value)
    setpassword(newpassword);
    if (!password.length) {
      return null;
    }

    if (password.length < 6) {
      return { invalid: true };
    }
    if (password.length <6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }
  }

  const getPasswordProp = () => {
    if (!password.length) {
      return null;
    }

    if (password.length < 6) {
      return { invalid: true };
    } else {
      return { valid: true };
    }
  }

  const passwordFormFeedback = () =>{
    if (!password.length) {
      return null
    }
    if (password.length <6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }
  }
  const handleConfirmPassword = (e) => {
    const newconfirmpassword=(e.target.value)
    setconfirmpassword(newconfirmpassword);
  }

  const getconfirmPasswordProp = () => {
    if (!confirmpassword.length) {
      return null;
    }

    if (confirmpassword !== password) {
      return { invalid: true };
    } else {
      return {valid: true};
    }
  }

  const confirmpasswordFormFeedBack = () => {
    if (confirmpassword !== password) {
      return <FormFeedback invalid>Confirm Password does not match.</FormFeedback>;
    } else {
      return <FormFeedback valid>Confirm Password matched.</FormFeedback>;
    }
  }

  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    .then(response => {
      console.log(response)
      toast(response.data.message, {
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
      error.response.data.message.forEach((message)=>{
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    })
  }

  return (
    <div>
      <Form>
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="username" name="username" id="username" placeholder="username" value={username} onChange={handleUsernameInput} {...getInputProp()}/>
            {getFormFeedback()}
            <FormText>Enter a username between 6 and 20 characters</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="email" value={email} onChange={handleEmail} {...getEmailProp()} />
            {getemailFeedBack()}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={handlePassword} {...getPasswordProp()} />
            {passwordFormFeedback()}
          </FormGroup>
          <FormGroup>
            <Label for="confirmpassword">Confirm Password</Label>
            <Input type="password" name="confirmpassword" id="confirmpassword" placeholder="confirmpassword" value={confirmpassword} onChange={handleConfirmPassword} {...getconfirmPasswordProp()}/>
            {confirmpasswordFormFeedBack()}
          </FormGroup>
            <p>Already a member?<a href="#" onClick={(e)=>{
              e.preventDefault()
              toggleloginsignup()
            }}>Login here.</a></p>        
        </ModalBody>
        <ModalFooter>
          <Button disabled={!(username && email && password)} color="primary" onClick={handleSubmit}>
            Sign Up
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>  
    </div>
  );
}

export default LoginModal;