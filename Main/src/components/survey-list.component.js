import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Survey = props => (
  <tr>
    <td>{props.survey._id}</td>
    <td>{props.survey.result}</td>
    <td>
      <a href="#" onClick={() => { props.deleteSurvey(props.survey._id) }}>delete</a>
    </td>
  </tr>
)

export default class SurveyList extends Component {
  constructor(props) {
    super(props);

    this.deleteSurvey = this.deleteSurvey.bind(this)

    this.state = {surveys: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/survey/')
      .then(response => {
        this.setState({ surveys: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSurvey(id) {
    axios.delete('http://localhost:5000/survey/'+id)
      .then(response => { console.log(response.data)})
      .catch(error => console.log(error));

    this.setState({
      surveys: this.state.surveys.filter(el => el._id !== id)
    })
  }

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
              <th>ID</th>
              <th>Result</th>
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
