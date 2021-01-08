import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const SurveyInfoCard = ({completedSurvey}) => {
    return (
        <tr>
        <td>{completedSurvey.ID}</td>
        <td>{completedSurvey.Name}</td>
        <td>{Date(completedSurvey.DOB)}</td>
        <td>{completedSurvey.Symptoms}</td>
    </tr>
    )
}


const Item = ({item}) => (
    <tr>
        <th>{item.k}</th>
        <td>{item.o}</td>
    </tr>
)

export default function ViewSurvey() {

    const {userData} = useContext(UserContext) 
    const [completedSurveyInfo, setCompletedSurvey] = useState([])

    
    
    const updateCompletedSurvey = async() => {
        await axios.get('/API/survey/view',
        {
            PaID: userData.user.id
        },
        {
            headers: {
                'x-auth-token': userData.token
            }
        }).then(res => {
            setCompletedSurvey(JSON.parse(res.data))
            // const r = setCompletedSurvey(JSON.parse(res.data.result))
            // var result = {}
            // Object.keys(r).forEach(key => {
            //     if (key !== "id" && key !== "name" && key !== "birthdate" && key !== "symptom") result[key] = r[key];
            // });
            // this.setState({
            //         ID: response.data._id,
            //         Name: r.name,
            //         DOB: Date(r.birthdate),
            //         Symptoms: r.symptom,
            //         Other: result
            //     })

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {updateCompletedSurvey()},[])


    const itemList = () => {
        const obj = this.state.Other;
        // console.log(JSON.stringify(obj));
        return Object.keys(obj).map(function (key) {
            // console.log(key + " -> " + obj[key]);
            var i = {
                'k': key,
                'o': obj[key]
            };
            return <Item item={i} />;
        });
    }

    return(
        <div>
            <h3>View Completed survey</h3>
            <br />
            <div>
                <h4>Patient Info </h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>symptom(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                       {completedSurveyInfo.map( x => <SurveyInfoCard completedSurvey={x} key ={x._id}/>)}
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <h4>Details</h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Subject</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList()}
                    </tbody>
                </table>
            </div>
        </div>
    )
    
}
