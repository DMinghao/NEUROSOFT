import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Survey = props => (
  <tr>
    <td>this will be a survey item</td>
    {/* <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

export default class SurveyList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {surveys: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/survey/')
      .then(response => {
        this.setState({ survey: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deleteSurvey(id) {
  //   axios.delete('http://localhost:5000/survey/'+id)
  //     .then(response => { console.log(response.data)});

  //   this.setState({
  //     surveys: this.state.surveys.filter(el => el._id !== id)
  //   })
  // }

  surveyList() {
    return this.state.surveys.map(currentSurvey => {
      return <Survey survey={currentSurvey} deleteSurvey={this.deleteSurvey} key={currentSurvey._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Survey</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              {/* <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            { this.surveyList() }
          </tbody>
        </table>
      </div>
    )
  }
}
