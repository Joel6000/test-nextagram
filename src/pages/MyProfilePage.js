import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import UserImages from '../containers/UserImages.js';
import Uploadpage from './Uploadpage.js';

function MyProfilePage () {
    
    const [userdetail,setuserdetail] = useState({})
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {    
        axios.get("https://insta.nextacademy.com/api/v1/users/me",
        {
            headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then (result => {
            console.log(result.data)
            setuserdetail(result.data)
        })
        .catch (error => {
            console.log('ERROR: ',error)
        })
    },[])
    return (
        <>
            <div>
                <div className="container-fluid">
                    <Card className=" col-12 flex-column mt-2" style={{backgroundColor:"lightgrey"}}>
                        <img className="col-12 align-self-center rounded-circle mt-1 p-0 " src={userdetail.profile_picture} style={{width:"200px", height:"200px", border:"black 1px solid"}}/>
                        <h3>@{userdetail.username}</h3>
                        <p>Description:....</p>
                    </Card>
                    <UserImages id={userdetail.id}/>
                    <Uploadpage isOpen={modal} toggle={toggle}/>
                </div>
            </div>
        </>
    )
}
export default MyProfilePage;