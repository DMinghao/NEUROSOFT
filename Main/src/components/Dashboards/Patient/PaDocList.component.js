import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/UserContext';
import axios from 'axios';

export default function PaDocList() {
    return (
        <div style={{ width: "100%" }}>
            <h4>My Doctors</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Make Appiontment</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
