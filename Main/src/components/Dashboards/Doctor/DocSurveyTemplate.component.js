import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'

export default function DocSurveyTemplate() {
    const {userData} = useContext(UserContext) 
    const [CreatedTemp, setCreatedTemp] = useState([])


    const TempInfo = ({Template}) => {
        return (
            <tr>
                    <td>{Template._id}</td>
                    <th scope = "row">{Template.title}</th>
                    <td>{Template.date}</td>
                    <td>{0}</td>
                    <td>
                        <button className = {"btn btn-primary a-btn-slide-text"}
                        // onClick= "./TempCreator.component"
                        >
                            View
                        </button>
                        <button className = {"btn btn-primary a-btn-slide-text"}
                        // onClick= "./TempCreator.component"
                        >
                            Edit
                        </button>
                    </td>
                
            </tr>
        )
    }

    const updateCreatedTemp = async() => {
        await axios.post('/API/templates/mytemplates', 
        {
            docID:userData.user.id
        },
        { 
            headers: {
                'x-auth-token': userData.token
            }
        }).then (
            res => {
                setCreatedTemp(res.data)
            }
        ).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        // setCreatedTemp(testData)
        // console.log(testData)
        updateCreatedTemp()
    }, [])

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
                        <th scope="col">Last Update Time</th>
                        <th scope="col">Questions Count</th> 
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {CreatedTemp.map(x => <TempInfo Template={x} key={x._id} />)} 
                </tbody>

            </table>
    </div>
    )
}

