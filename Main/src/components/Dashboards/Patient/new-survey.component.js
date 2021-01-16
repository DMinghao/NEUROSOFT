import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import * as Survey from "survey-react";
// import {template} from "./testSurveyTemp"

{
  /* 
  const payload = {tempid:tempid, distid: distid}
<Link   to={
       {     
         pathname: '/read',
         state: payload
        }
}> </Link> 
*/
}

export default function NewSurvey(props) {
  //TODO get temp id from props
  const history = useHistory();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const [template, setTemplate] = useState({});
  const [temp, setTemp] = useState({});
  // if (!userData.user) history.push("/login");
  const {tempID, distID} = props.location.state
  Survey.StylesManager.applyTheme("default");

  // console.log(tempID)

  //TODO axios get temp by id (make sure backend api is working)
  //TODO extract template from return data
  useEffect(() => {
    const getTempData = async () => {
      const res = await axios.post(
        "/API/templates/view",
        { template: tempID },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      setTemplate(res.data);
      setTemp(JSON.parse(res.data.template))
    }
    getTempData()
  }, []);
  // const json = template

  const onComplete = async (result) => {
    const r = {
      user: userData.user.id,
      result: result.data,
      distID: distID
    };
    const res = await axios.post("/API/survey/add", r).catch((error) => console.log(error));
    if(res.status == 200){
      alert("Survey Submitted")
      history.goBack()
    }
    else{
      alert("Something is wrong, please try again")
    }
  };

  return (
    <Survey.Survey
      model={new Survey.Model(temp)}
      onComplete={onComplete}
    />
  );
}
