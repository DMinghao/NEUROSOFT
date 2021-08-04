import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import * as Survey from "survey-react";
import "react-datepicker/dist/react-datepicker.css";


export default function ViewEditSurvey(props) {
  const { userData } = useContext(UserContext);
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [temp, setTemp] = useState({})
  const [result, setResult] = useState({})
  const [surveyWindow, setSurveyWindow] = useState()
  const history = useHistory();
  const id = props.match.params.id;
  Survey.StylesManager.applyTheme("default");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/API/survey/" + id);
      const r = JSON.parse(response.data.result);
      setID(response.data._id);
      setName(r.name);
      setUpdatedAt(response.data.updatedAt);
      const distID = response.data.surveyDisID;
      const template = await axios.post(
        "/API/distribution/gettemp",
        {
          distID: distID,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      setTemp(JSON.parse(template.data.template));
      setResult(JSON.parse(response.data.result)); 
    };
    getData();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ID}</td>
              <td>{Name}</td>
              {/* <td>{updatedAt}</td> */}
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
        <Survey.Survey model={new Survey.Model(temp)} data = {result} mode = 'display'/>
        {/* <div id="surveyElement" style="display:inline-block;width:100%;"></div> */}
        <div id="surveyResult"></div>
      </div>
    </div>
  );
}
