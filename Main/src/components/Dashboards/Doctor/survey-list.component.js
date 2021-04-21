import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../../../context/UserContext'

const Survey = (props) => (
  <tr>
    <td>{props.survey.paID}</td>
    <td>{JSON.parse(props.survey.result).name}</td>
    <td>{Date(JSON.parse(props.survey.result).birthdate)}</td>
    <td>{JSON.parse(props.survey.result).symptom}</td>
    <td>
      <Link to={"/viewEdit/" + props.survey._id}> View </Link>|
      <a href="#" onClick={() => { props.deleteSurvey(props.survey._id) }}> Delete </a>
    </td>
  </tr>
)

export default function SurveyList() {
  const { userData } = useContext(UserContext)
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    (async () => {
      const response = await axios.get('/API/survey/', {
        headers: {
          'x-auth-token': userData.token
        }
      })
      setSurveys(response.data)
    })();
  }, [])

  const deleteSurvey = async (id) => {
    // axios.delete('http://localhost:5000/API/survey/'+id)
    await axios.delete('/API/survey/' + id)

    setSurveys(surveys.filter(el => el._id !== id))
  }

  const surveyList = () => {
    return surveys.map(currentSurvey => {
      return <Survey survey={currentSurvey} deleteSurvey={deleteSurvey} key={currentSurvey._id} />;
    })
  }

  return (
    <div>
      <br />
      <h4>Logged Survey Result</h4>
      <table className="table" style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
        <thead className="thead-dark">
          <tr >
            <th>Patient ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>symptom(s)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {surveyList()}
        </tbody>
      </table>
    </div>
  )
}
