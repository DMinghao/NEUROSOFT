import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext';
import axios from 'axios';

const DocInfoCard = ({ doc }) => {
    return (
        <tr>
            {/* <th scope="row"></th> */}
            <td>{doc.firstname}</td>
            <td>{doc.lastname}</td>
            <td>{doc.email}</td>
            {/* <td>
                <button>+</button>
            </td> */}
        </tr>
    )
}

export default function PaDocList() {

    const { userData } = useContext(UserContext);
    const [RelatedID, setRelatedID] = useState([])
    const [AllDoc, setAllDoc] = useState([])
    const [LinkedDoc, setLinkedDoc] = useState([])


    const updateRelatedData = async () => {
        await axios.get('/API/users/allRelated/', {
            headers: {
                'x-auth-token': userData.token
            }
        }).then(res => {
            setRelatedID(res.data.relatedUsers)
        }).catch((error) => {
            console.log(error);
        })
    }

    const updateAllDocData = async () => {
        await axios.get('/API/users/AllDoc/', {
            headers: {
                'x-auth-token': userData.token
            }
        }).then(res => {
            setAllDoc(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        updateRelatedData()
        updateAllDocData()
    }, [])

    useEffect(() => {
        setLinkedDoc(AllDoc.filter(x => {
            if (RelatedID.includes(x._id)) return x
        }))
    }, [AllDoc, RelatedID])


    return (
        <div style={{ width: "100%" }}>
            <h4>My Doctors</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {LinkedDoc.map(x => {
                        return <DocInfoCard doc={x} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
