import {Link } from "react-router-dom";
import {NavbarBrand, Navbar, NavLink} from 'reactstrap';
import LoginModal from '../pages/LoginModal.js';
import {useState} from 'react';

export default ({loggedIn,setLoggedIn}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const logout = () =>
    setLoggedIn(localStorage.removeItem("jwt"))

    return <Navbar className="justify-content-start pt-16 pb-16 pr-0 pl-0" color="light">
                <NavbarBrand href="/" className="text-muted">
                    <h1>Nextagram</h1>
                </NavbarBrand>
                <Link to="/" className="text-muted">
                    <h3>Homepage</h3>
                </Link>
                {loggedIn
                ?   <Link to="/profile" className="text-muted">
                        <h3>My Profile</h3>
                    </Link>
                :   null
                }
                {
                loggedIn
                ?   <NavLink>
                        <h3 onClick={logout}>Logout</h3>
                    </NavLink>
                :   <Link>
                        <LoginModal isOpen={modal} toggle={toggle} setLoggedIn={setLoggedIn}/>
                    </Link>
                }
            </Navbar>
}