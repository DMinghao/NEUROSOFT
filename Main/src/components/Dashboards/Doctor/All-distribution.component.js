import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import SelectSearch from "react-select-search";
import Loading from "../../Loading.component";
import axios from "axios";
import CreateDistribution from "./Create-distribution.component";

export default function AllDistribution() {
  const [allDis, setAllDis] = useState([]);
  const [loading, setloading] = useState(false);
  const { userData } = useContext(UserContext);
  const docID = userData.user.id;

  const DistInfo = ({ Dist }) => {
    return (
      <tr>
        <td>{Dist._id}</td>
        <th scope="row">{Dist.docID}</th>
        <td>{Dist.patients.length}</td>
        <td>
          {(
            Dist.patients.filter((x) => x.completed == true) /
            Dist.patients.length
          ).toFixed(2)}
        </td>
        <td>
          <button
            className={"btn btn-primary a-btn-slide-text"}
            // onClick= "./TempCreator.component"
          >
            View
          </button>
          <button
            className={"btn btn-primary a-btn-slide-text"}
            // onClick= "./TempCreator.component"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    setloading(true);
    const loadData = async () => {
      const res = await axios.post(
        "/API/distribution/mydistribution",
        {
          docID: docID,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      setAllDis(res.data);
    }
    loadData()
    setloading(false);
  }, []);

  // console.log(allDis)
  return (
    <div style={{ width: "100%" }}>
      <Link to="/newDist">
        <button className="btn btn-primary">New Distribution</button>
      </Link>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h4>Existing Survey Distribution</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Doctor ID</th>
                <th scope="col">Template ID</th>
                <th scope="col">Patient Count</th>
                <th scope="col">Complated Rate</th>
              </tr>
            </thead>
            <tbody>
              {allDis.map((x) => (
                <DistInfo Dist={x} key={x._id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
