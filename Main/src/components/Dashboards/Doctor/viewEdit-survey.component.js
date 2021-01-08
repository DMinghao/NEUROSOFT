import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const Item = props => (
    <tr>
        <th>{props.item.k}</th>
        <td>{props.item.o}</td>
    </tr>
)

export default class ViewEditSurvey extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)
        this.state = {
            ID: '',
            Name: '',
            DOB: new Date(),
            Symptoms: [],
            Other: {}
        }
    }

    componentDidMount() {
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
    }

    itemList() {
        const obj = this.state.Other;
        console.log(JSON.stringify(obj));
        return Object.keys(obj).map(function (key) {
            // console.log(key + " -> " + obj[key]);
            var i = {
                'k': key,
                'o': obj[key]
            };
            return <Item item={i} />;
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
            </div>
        )
    }
}
