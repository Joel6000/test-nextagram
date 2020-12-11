import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js'

function LoginModal ({setLoggedIn}) {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [LoginSignUp, setLoginSignUp] =useState(true);
  const toggleloginsignup = () => setLoginSignUp(!LoginSignUp);

  return (
    <div>
      <h3 className="text-muted" onClick={toggle}>Login</h3>
      <Modal isOpen={modal} toggle={toggle}>
        {
          LoginSignUp
            ? <LoginForm setLoggedIn={setLoggedIn} toggleloginsignup={toggleloginsignup} toggle={toggle}/>
            : <SignUpForm toggleloginsignup={toggleloginsignup} toggle={toggle}/>
        }
      </Modal>
    </div>
  );
}

export default LoginModal;