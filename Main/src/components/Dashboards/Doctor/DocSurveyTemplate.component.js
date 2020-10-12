import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'

export default function DocSurveyTemplate() {
    const {userData} = useContext(UserContext) 
    const {relatedTemp, setRelatedTemp} = useState([])
    
    const updateRelatedTemp = async => {
        await axios.post('API/users/Doc', {
            headers: {
                'x-auth-token': userData.token
            }
        }).then (
            res => {

            }
        )
    }

    

    return (
        <div style={{ width: "100%" }}>
            <h4>
                Existing Survey Template
            </h4>
            <table className = "table table-striped">
            <thead>
                    <tr>
                        <th scope="col">SurveyID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Doctor ID</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    </div>
    )
}
