import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'

export default function DocSurveyTemplate() {
    const {userData} = useContext(UserContext) 
    const [CreatedTemp, setCreatedTemp] = useState([])

    const testData = [
        {
            id: "aksdjghfkasdhfk1",
            title: "test survey 1", 
            description: "test description 1", 
            questionCount: "12"
        },
        {
            id: "aksdjgadsfasdf2",
            title: "test survey 2", 
            description: "test description 2", 
            questionCount: "45"
        },
        {
            id: "aksdjasdfasdfhfk3",
            title: "test survey 3", 
            description: "test description 3", 
            questionCount: "34"
        }
    ]

    const TempInfo = ({Template}) => {
        return (
            <tr>
                    {/* <td>{Template.id}</td> */}
                    <th scope = "row">{Template.title}</th>
                    <td>{Template.description}</td>
                    <td>{Template.questionCount}</td>
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
        // await axios.post('/API/templates', { 
        //     headers: {
        //         'x-auth-token': userData.token
        //     }
        // }).then (
        //     res => {
        //         setCreatedTemp(JSON.parse(res.data.template))
        //     }
        // ).catch((error) => {
        //     console.log(error)
        // })
    }

    useEffect(() => {
        setCreatedTemp(testData)
        // console.log(testData)
        // updateCreatedTemp()
    }, [])

    return (
        <div style={{ width: "100%" }}>
            <h4>
                Existing Survey Template
            </h4>
            <table className = "table table-striped">
            <thead>
                    <tr>
                        {/* <th scope="col">SurveyID</th> */}
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Questions Count</th> 
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {CreatedTemp.map(x => <TempInfo Template={x} key={x.id} />)} 
                </tbody>

            </table>
    </div>
    )
}
