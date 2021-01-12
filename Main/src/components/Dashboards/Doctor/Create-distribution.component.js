import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import Loading from "../../Loading.component";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import Switch from "react-switch";

export default function CreateDistribution() {
  const [tempID, setTempID] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allTemp, setAllTemp] = useState([]);
  const [allRelated, setAllRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const { userData } = useContext(UserContext);
  const docID = userData.user.id;
  const ref = React.createRef();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      //get all templates
      var res = await axios.post(
        "/API/templates/mytemplates",
        {
          docID: docID,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      // .catch((error) => {
      //   console.log(error);
      // });
      setAllTemp(res.data);
      //get all related user
      var res2 = await axios
        .get("/API/users/allRelated/", {
          headers: {
            "x-auth-token": userData.token,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      const relatedIDs = res2.data.relatedUsers;
      var res3 = await axios.get("/API/users/AllPa/", {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      // .catch((error) => {
      //   console.log(error);
      // });
      const AllPa = res3.data;
      setAllRelated(
        AllPa.filter((x) => {
          if (relatedIDs.includes(x._id)) return x;
        })
      );
    };
    loadData();

    setLoading(false);
  }, []);

  // console.log(allRelated)
  // console.log(allTemp)

  const submit = async (e) => {
    e.preventDefault();
    if (tempID.length > 0 && patients.length > 0) {
      // console.log(tempID)
      // console.log(patients)
      const payload = {
        docID: docID,
        tempID: tempID[0].value,
        patients: patients.map((x) => {
          return { paID: x.value };
        }),
        ...(hasDueDate && {
          dueDate: dueDate.toLocaleDateString("en-US"),
        }),
      };
      var res4 = await axios.post("/API/distribution/add", payload, {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      // .catch((error) => {
      //   console.log(error);
      // });
      if (res4.status != 200) console.log(res4);
      else history.goBack();
      // TODO redirect back to previous page
    } else {
      alert("missing feild(s)");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <h3>Create New Destribution</h3>
          <br />
          <div>
            <h4>Select a template</h4>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setTempID}
              options={allTemp.map((x) => {
                return { value: x._id, name: x.title };
              })}
              placeholder="Choose a template..."
              selected={tempID}
            />
          </div>
          <br />
          <div>
            <h4>Select patients</h4>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Typeahead
                id="basic-typeahead-multiple"
                labelKey="name"
                multiple
                onChange={setPatients}
                options={allRelated.map((x) => {
                  return { value: x._id, name: x.firstname + " " + x.lastname };
                })}
                placeholder="Choose several patients..."
                selected={patients}
                ref={ref}
                flip={true}
                style={{ width: "100%" }}
              />
              <style>
                {
                  "\
                .rbt-token{\
                  cursor: pointer;\
                  padding-right: 21px;\
                }\
                .rbt-token-removeable{\
                  background-color: #e7f4ff;\
                  border: 0;\
                  border-radius: .25rem;\
                  color: #007bff;\
                  display: inline-block;\
                  line-height: 1em;\
                  margin: 1px 3px 2px 0;\
                  padding: 4px 7px;\
                  position: relative;\
                }\
                .rbt-input-multi.form-control {\
                  height: auto;\
                }\
                .rbt-input-multi .rbt-input-wrapper {\
                  align-items: flex-start;\
                  display: flex;\
                  flex-wrap: wrap;\
                  margin-bottom: -4px;\
                  margin-top: -1px;\
                  overflow: hidden;\
                }\
                "
                }
              </style>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  setPatients([]);
                  ref.current.clear();
                }}
                style={{ margin: "0 0 0 0.5rem" }}
              >
                Clear
              </button>
            </div>
          </div>
          <br />
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4>Set a due date</h4>
              <div style={{ margin: "0 1rem" }}>
                <Switch
                  checked={hasDueDate}
                  onChange={setHasDueDate}
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "orange",
                        paddingRight: 2,
                      }}
                    >
                      Off
                    </div>
                  }
                  checkedIcon={
                    <svg
                      viewBox="0 0 10 10"
                      height="100%"
                      width="100%"
                      fill="aqua"
                    >
                      <circle r={3} cx={5} cy={5} />
                    </svg>
                  }
                  className="react-switch"
                  id="icon-switch"
                />
              </div>
            </div>
            <br />
            {hasDueDate && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: "0 1rem 0 0" }}>All surveys due before </p>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  minDate={new Date()}
                  placeholderText="Select a due date"
                />
              </div>
            )}
          </div>
          <br />
          <button style={{margin: "0 1rem 0 0"}} className="btn btn-primary" onClick={submit}>
            Submit
          </button>
          <button style={{margin: "0 0 0 1rem"}} className="btn btn-secondary" onClick={()=>history.goBack()}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
