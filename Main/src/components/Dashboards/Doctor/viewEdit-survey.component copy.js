import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const contentFormat = (obj) => {
  if (obj.toString().startsWith("data:image")) return <img src={obj.toString()}/>
  else return obj.toString()
}

const Item = (props) => (
  <tr>
    <th>{props.item.k}</th>
    <td>{contentFormat(props.item.o)}</td>
  </tr>
);

export default function ViewEditSurvey(props) {
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [Symptoms, setSymptoms] = useState([]);
  const [Other, setOther] = useState({});
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/API/survey/" + id);
      const r = JSON.parse(response.data.result);
      var result = {};
      Object.keys(r).forEach((key) => {
        if (
          key !== "id" &&
          key !== "name" &&
          key !== "birthdate" &&
          key !== "symptom"
        )
          result[key] = r[key];
      });
      setID(response.data._id);
      setName(r.name);
      setDOB(Date(r.birthdate));
      setSymptoms(r.symptom);
      setOther(result);
      console.log(response.data)
    };
    getData();
  }, []);

  const itemList = () => {
    const obj = Other;
    // console.log(JSON.stringify(obj));
    return Object.keys(obj).map(function (key) {
      // console.log(key + " -> " + obj[key]);
      var i = {
        k: key,
        o: obj[key],
      };
      // console.log(i)
      return <Item item={i} key={i.k} />;
    });
  };

  return (
    <div>
      <h3>View & Edit survey</h3>
      <br />
      <button
        style={{ margin: "0 0 0 1rem" }}
        className="btn btn-secondary"
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
      <div>
        <h4>Patient Info </h4>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Finish Date</th>
              <th>symptom(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ID}</td>
              <td>{Name}</td>
              <td>{Date(DOB)}</td>
              <td>{Symptoms}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div>
        <h4>Summary</h4>
        <p>{}</p>
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
          <tbody>{itemList()}</tbody>
        </table>
      </div>
    </div>
  );
}
