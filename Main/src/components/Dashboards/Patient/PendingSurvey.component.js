import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import viewSurvey from './viewSurvey.component'
import { Link } from 'react-router-dom';


export default function PendingSurvey() {
    const {userData} = useContext(UserContext) 
    const [paSurvey, setpaSurvey] = useState([])

    const SurveyInfo = ({Survey}) => {
        return (
            <tr>
                    <th scope = "row">{Survey.distID}</th>
                    <td>{Survey.tempID}</td>
                    <td>{Survey.dueDate}</td>
                    <td>
                        <Link> Start Survey </Link>
                    </td>
            </tr>
        )
    }

    const updatepaSurvey = async() => {

       
        const res = await axios.post('/API/distribution/pendingsurvey', 
        {
            paID: userData.user.id
        },
        { 
            headers: {
                'x-auth-token': userData.token
            }
        }).catch((error) => {
            console.log(error)
        })
        if (res.status == 201) {
        alert (res.data.message)
        setpaSurvey([])
    }
        else setpaSurvey(res.data)
    }

    useEffect(() => {
        updatepaSurvey()
    }, [])

    return (
        <div style={{ width: "100%" }}>
            <h4>
                My Pending Survey
            </h4>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Distribution ID</th>
                        <th scope="col">Template ID</th> 
                        <th scope="col">Due Before</th> 
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
