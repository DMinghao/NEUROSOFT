import React, { useState, useContext } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import * as Survey from "survey-react";
import {template} from "./testSurveyTemp"

export default function NewSurvey() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  // const [id, setId] = useState()
  if (!userData.user) history.push("/login");

  // console.log(userData.token);
  Survey
    .StylesManager
    .applyTheme("default");

  const json = template

  // setId(userData.user.id);
  // console.log(userData.user); 

  // const finish = (result) => {
  //   const r = {
  //     "user": userData.user.id,
  //     "result": result.data
  //   }
  //   console.log(r);
  //   // axios.post('http://localhost:5000/API/survey/add', r)
  //   // axios.post('/API/survey/add', r, {headers : {"x-Auth-Token" : userData.token}})
  //   axios.post('/API/survey/add', r)
  //     .then(res => console.log(res.data))
  //     .catch(error => console.log(error));

  // }

  return (
    // <Survey.Survey model={new Survey.Model(json)} onComplete={(result) => finish} />
    <Survey.Survey model={new Survey.Model(json)} onComplete={(result) => {
      const r = {
        "user": userData.user.id,
        "result": result.data
      }
      console.log(r);
      // axios.post('http://localhost:5000/API/survey/add', r)
      // axios.post('/API/survey/add', r, {headers : {"x-Auth-Token" : userData.token}})
      axios.post('/API/survey/add', r)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
  
    }} />
  )
}
