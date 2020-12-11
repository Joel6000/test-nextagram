import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

function UserProfilePage () {
    const match=useParams()
    // console.log(match)
    const [userimages, setuserimages] = useState([])
    
    useEffect(() => {    
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${match.id}`)
    .then (userimages => {
    // console.log(userimages)
    setuserimages([...userimages.data])
    })
    .catch (error => {
      console.log('ERROR: ',error)
    })
},[match.id])

    const [userdetail, setuserdetail] = useState([])
        
        useEffect(() => {    
        axios.get(`https://insta.nextacademy.com/api/v1/users/${match.id}`)
        .then (result => {
        console.log(result.data)
        setuserdetail(result.data)
        })
        .catch (error => {
        console.log('ERROR: ',error)
        })
    },[match.id])

return (
    <>
        <div>
            <div className="container-fluid">
                <Card className=" col-12 flex-column mt-2" style={{backgroundColor:"lightgrey"}}>
                    <img className="col-12 align-self-center rounded-circle mt-1 p-0 " src={userdetail.profileImage} style={{width:"200px", height:"200px", border:"black 1px solid"}}/>
                    <h3>@{userdetail.username}</h3>
                    <p>Description:....</p>
                </Card>
                <div className="d-flex flex-row flex-wrap" style={{backgroundColor:"darkgrey"}}>
                {userimages.map(image=> (
                    <Card className="col-lg-4 col-md-6 col-sm-12">
                        <CardImg className="mt-auto mb-auto p-2" src={image.url}/>
                    </Card>
                    ))}
                </div>
            </div>
        </div>
    </>
    );
}
export default UserProfilePage;