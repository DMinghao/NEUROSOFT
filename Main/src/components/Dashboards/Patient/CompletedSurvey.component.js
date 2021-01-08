import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import viewSurvey from './viewSurvey.component'
import { Link } from 'react-router-dom';


export default function CompletedSurvey() {
    const {userData} = useContext(UserContext) 
    const [paSurvey, setpaSurvey] = useState([])
    const data = [{
        "_id": "5f73a2bd1ac53c124801123a",
        "paID": "5f45cde0570ab458d0f83b6d",
        "createdAt": "2020-09-29T21:10:21.249Z",
        "updatedAt": "2020-09-29T21:10:21.249Z",
        "__v": 0
      },
      {
        "_id": "5f90efc8d0487294194bc7b2",
        "paID": "5f45cde0570ab458d0f83b6d",
        "createdAt": "2020-10-22T02:34:48.461Z",
        "updatedAt": "2020-10-22T02:34:48.461Z",
        "__v": 0
      },
      {
        "_id": "5f9e247bd0487294194bc7b3",
        "paID": "5f45cde0570ab458d0f83b6d",
        "createdAt": "2020-11-01T02:59:07.929Z",
        "updatedAt": "2020-11-01T02:59:07.929Z",
        "__v": 0
      }]

    const SurveyInfo = ({Survey}) => {
        console.log(Survey)
        return (
            <tr>
                    <th scope = "row">{Survey.title}</th>
                    <td>{Survey.date}</td>
                    <td>{0}</td>
                    <td>
                        <Link to={"/viewEdit/"+ Survey._id}> View </Link>
                    </td>
            </tr>
        )
    }

    const updatepaSurvey = async() => {

       
        axios.post('/API/survey/mysurveys', 
        {
            PaID: userData.user.id
        },
        { 
            headers: {
                'x-auth-token': userData.token
            }
        }).then (
            res => {
                console.log(res.data)
                setpaSurvey(res.data)
            }
        ).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        updatepaSurvey()
    }, [])

    return (
        <div style={{ width: "100%" }}>
            <h4>
                My Completed Survey
            </h4>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Completed Time</th> 
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {paSurvey.map(x => <SurveyInfo Survey={x} key={x._id} />)} 
                </tbody>

            </table>
    </div>
    )
}
