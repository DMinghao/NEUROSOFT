import React, { useState, useContext} from "react";
import {link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import SelectSearch from "react-select-search";
import loading from "../../loading.component"
import axios from "axios";

export default function AllDistribution() {
    const [tempID, setTempID] = userState("");
    const [patients, setPatients] = useState([]);
    const [allTemp, setAllTemp] = useState([]);
    const [allRelated, setAllRelated] = useState([]);
    const [loading, setloading] = useState(false);
    const {userData} = useContext(UserContext);
    const docID = userData.user.id;

    useEffect(() => {
        setloading(true);
        axios
          .past( 
              "/API/templates/mytemplates",
              {
                  docID: userData.user.id,
              },
              {
                  headers : {
                      "x-auth-token": userData.token,
                  }
              }
          )
          .then((res)=> {
              setAllTemp(res.data);

          })
          .catch((error) => {
              console.log(error);

          });

        axios
          .get("/API/USERS/allRelated/", {
              headers : {
                  "x-auth-token": userData.token,
            
              },
          })
          .then((res)  => {
            const relatedIDs = res.data.relatedUsers;
            axios
              .get("/API/USERS/AllPa/",{
                  headers : {
                      "x-auth-token": userData.token,
                  },
              })
              .then((res) => {
                const AllPa = res.data;
                setAllRelated(
                    AllPa.filter(x) => {
                        if (relatedIDs.incluses(x. id)) return x;
                    })
              })

            
          
     return (
        <div style={{ width: "100%" }}>
            <h4>
                Existing Survey Template
            </h4>
            <table className = "table table-striped">
            <thead>
                    <tr>
                        <th scope="col">DoctorID</th>
                        <th scope="col">SurveyID</th>
                        <th scope="col">PatientID</th>
                        <th scope="col">Complated Rate</th> 
                    </tr>
                </thead>
                <tbody>
                {CreatedTemp.map(x => <TempInfo Template={x} key={x._id} />)} 
                </tbody>

            </table>
    </div>
    )
}   