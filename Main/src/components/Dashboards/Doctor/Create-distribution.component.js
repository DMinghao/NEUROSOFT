import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import SelectSearch from "react-select-search";
import Loading from "../../Loading.component"
import axios from "axios";

export default function CreateDistribution() {
  const [tempID, setTempID] = useState("");
  const [patients, setPatients] = useState([]);
  const [allTemp, setAllTemp] = useState([]);
  const [allRelated, setAllRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const docID = userData.user.id;
 
  useEffect(() => {
    setLoading(true);
    //get all templates
    axios
      .post(
        "/API/templates/mytemplates",
        {
          docID: userData.user.id,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      )
      .then((res) => {
        setAllTemp(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //get all related user
    axios
      .get("/API/users/allRelated/", {
        headers: {
          "x-auth-token": userData.token,
        },
      })
      .then((res) => {
        const relatedIDs = res.data.relatedUsers;
        axios
          .get("/API/users/AllPa/", {
            headers: {
              "x-auth-token": userData.token,
            },
          })
          .then((res) => {
            const AllPa = res.data;
            setAllRelated(
              AllPa.filter((x) => {
                if (relatedIDs.includes(x._id)) return x;
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);

    console.log(allRelated)
    console.log(allTemp)

  const submit = (e) => {
    e.preventDefault();
    // TODO submit new distribution
    // TODO redirect back to previous page
  };

  return (
    <div>
      {loading ? (
          <Loading/>
      ) : (
        <>
          <h3>Create New Destribution</h3>
          <h4>Select a template</h4>
          <SelectSearch
            className = "secondary dropdown-toggle"
            placeholder="Select a template"
            options={allTemp.map((x) => {
              return { value: x._id, name: x.title };
            })}
            onChange={setTempID}
          />
          <h4>Select patients</h4>
          {/* <SelectSearch
            options={allRelated.map((x) =>{
                return {value: x._id, name: `${x.firstname} ${x.lastname} ${x.email}`}
            })}
            multiple
            search
            placeholder="Select your country"
          /> */}
        </>
      )}
    </div>
  );
}
