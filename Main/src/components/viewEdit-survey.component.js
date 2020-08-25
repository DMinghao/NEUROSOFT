import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { isThisHour } from 'date-fns';

const Item = props => (
    <tr>
        <th>{props.item.k}</th>
        <td>{props.item.o}</td>
    </tr>
)

export default class ViewEditSurvey extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangeDuration = this.onChangeDuration.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.itemList = this.itemList.bind(this);

        console.log(this.props.match.params.id)
        this.state = {
            ID: '',
            Name: '',
            DOB: new Date(),
            Symptoms: [],
            Other: {}
            //   username: '',
            //   description: '',
            //   duration: 0,
            //   date: new Date(),
            //   users: []

        }
    }

    componentDidMount() {
        // axios.get('http://localhost:5000/API/survey/' + this.props.match.params.id)
        axios.get('/API/survey/' + this.props.match.params.id)
            .then(response => {
                const r = JSON.parse(response.data.result);
                var result = {};
                Object.keys(r).forEach(key => {
                    if (key !== "id" && key !== "name" && key !== "birthdate" && key !== "symptom") result[key] = r[key];
                });
                this.setState({
                    ID: response.data._id,
                    Name: r.name,
                    DOB: Date(r.birthdate),
                    Symptoms: r.symptom,
                    Other: result
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        // axios.get('http://localhost:5000/users/')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             this.setState({
        //                 users: response.data.map(user => user.username),
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

    }

    //   onChangeUsername(e) {
    //     this.setState({
    //       username: e.target.value
    //     })
    //   }

    //   onChangeDescription(e) {
    //     this.setState({
    //       description: e.target.value
    //     })
    //   }

    //   onChangeDuration(e) {
    //     this.setState({
    //       duration: e.target.value
    //     })
    //   }

    //   onChangeDate(date) {
    //     this.setState({
    //       date: date
    //     })
    //   }

    // onSubmit(e) {
    //     e.preventDefault();

    //     const exercise = {
    //         username: this.state.username,
    //         description: this.state.description,
    //         duration: this.state.duration,
    //         date: this.state.date
    //     }

    //     console.log(exercise);

    //     axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
    //         .then(res => console.log(res.data));

    //     window.location = '/';
    // }

    itemList() {
        // return <h3>hi</h3>
        const obj = this.state.Other;
        console.log(JSON.stringify(obj));
        return Object.keys(obj).map(function (key) {
            console.log(key + " -> " + obj[key]);
            var i = {
                'k': key, 
                'o': obj[key]
            };
            return <Item item={i}/>;
            // return (
            //     <tr>
            //         {console.log(key)}
            //         <th>{key}</th>
            //         <td>{obj[key]}</td>
            //     </tr>
            // );
        });
    }

    render() {
        return (
            <div>
                <h3>View & Edit survey</h3>
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
                            <tr>
                                <td>{this.state.ID}</td>
                                <td>{this.state.Name}</td>
                                <td>{Date(this.state.DOB)}</td>
                                <td>{this.state.Symptoms}</td>
                            </tr>
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
                            {this.itemList()}
                        </tbody>
                    </table>
                </div>


                {/* <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form> */}
            </div>
        )
    }
}
