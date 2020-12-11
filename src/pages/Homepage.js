import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  Card, CardBody, Button
} from 'reactstrap';
import Image from 'react-graceful-image';

function Homepage() {

  const [users, setUsers] = useState([0])

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      // If successful, we do stuffs with 'result'
      // console.log(result.data)
      setUsers([...result.data])
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }, [])

    return (
      <>
        <div className="container">
          <h2>Browse for more profiles</h2>
          <div className="d-flex flex-wrap container">
            {users.map(user => (
            <div>
                <Card className="align-items-center">
                  <Image src={user.profileImage} style={{width:"200px", height:"200px", margin:'5px'}}>
                  </Image>
                  <CardBody>
                  <Link to={`/profile/${user.id}`}>
                    <Button>Click to visit Profile!</Button>
                  </Link>
                  </CardBody>          
                </Card>
            </div>
            ))}
          </div>
        </div>
      </>
    );
}
export default Homepage;