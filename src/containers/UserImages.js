import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Card, CardImg} from 'reactstrap';

function UserImages ({id}) {
    // console.log(id)
    const [usersimage, setusersimage] = useState([])
    
    useEffect(() => {    
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
    .then (userimages => {
    console.log(userimages)
    setusersimage([...userimages.data])
    })
    .catch (error => {
      console.log('ERROR: ',error)
    })
},[id])
return (
    <>
        <div className="d-flex flex-row flex-wrap" style={{backgroundColor:"darkgrey"}}>
            {usersimage.map(userimages => (
            <Card className="col-lg-4 col-md-6 col-sm-12">
                <CardImg className="mt-auto mb-auto p-2" src={userimages.url}/>
            </Card>
            ))}
        </div>
    </>
    );
}
export default UserImages;