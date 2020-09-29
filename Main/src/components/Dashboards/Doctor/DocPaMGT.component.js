import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext';
import axios from 'axios';

const PaInfoCard = ({ pa, status, LinkUnlink }) => {
    return (
        <tr>
            <th scope="row">{pa._id}</th>
            <td>{pa.firstname}</td>
            <td>{pa.lastname}</td>
            <td>{pa.email}</td>
            <td>
                <button
                className = {status?"btn btn-danger":"btn btn-success"} 
                onClick={(e) => {
                    e.target.disabled = true
                    LinkUnlink(pa, status)
                }}>{status ? "-" : "+"}</button>
            </td>
        </tr>
    )
}

export default function DocPaMGT() {
    const { userData } = useContext(UserContext);
    const [RelatedID, setRelatedID] = useState([])
    const [AllPa, setAllPa] = useState([])
    const [LinkedPa, setLinkedPa] = useState([])
    const [NotLinkedPa, setNotLinkedPa] = useState([])

    const updateRelatedData = async () => {
        await axios.get('/API/users/allRelated', {
            headers: {
                'x-auth-token': userData.token
            }
        }).then(res => {
            setRelatedID(res.data.relatedUsers)
        }).catch((error) => {
            console.log(error);
        })
    }

    const updateAllPaData = async () => {
        await axios.get('/API/users/AllPa', {
            headers: {
                'x-auth-token': userData.token
            }
        }).then(res => {
            setAllPa(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        updateRelatedData()
        updateAllPaData()
    }, [])

    useEffect(() => {
        setLinkedPa(AllPa.filter(x => {
            if (RelatedID.includes(x._id)) return x
        }))
        setNotLinkedPa(AllPa.filter(x => {
            if (!RelatedID.includes(x._id)) return x
        }))
    }, [AllPa, RelatedID])

    const LinkUnlink = async (pa, status) => {
        if (status) {
            const payload = {
                DoctorUserID: userData.user.id,
                PatientUserID: pa._id
            }
            await axios.post('/API/users/unlinkuser',
                payload,
                {
                    headers: {
                        'x-auth-token': userData.token
                    }
                }).then(res => {
                    // console.log(res)
                }).catch((e) => {
                    console.log(e);
                })
            updateRelatedData()
        } else {
            const payload = {
                DoctorUserID: userData.user.id,
                PatientUserID: pa._id
            }
            await axios.post('/API/users/linkuser',
                payload,
                {
                    headers: {
                        'x-auth-token': userData.token
                    }
                }).then(res => {
                    // console.log(res)
                }).catch((e) => {
                    console.log(e);
                })
            updateRelatedData()
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <h4>Linked Patient</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {LinkedPa.map(x => {
                        return <PaInfoCard pa={x} status={true} LinkUnlink={LinkUnlink} key={x._id} />
                    })}
                </tbody>
            </table>

            <h4>Add Patient</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {NotLinkedPa.map(x => {
                        return <PaInfoCard pa={x} status={false} LinkUnlink={LinkUnlink} key={x._id} />
                    })}
                </tbody>
            </table>

        </div>
    )
}
