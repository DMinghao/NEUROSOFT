import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Sidenav, Nav, Icon, Dropdown } from 'rsuite'

// import default style
import 'rsuite/dist/styles/rsuite-default.css'

export default function DocDashSideNav(props) {
    const {updatePage} = props

    const styles = {
        width: 250,
        display: 'inline-table',
        marginRight: 10
    };

    const [activeKey, setactiveKey] = useState("1");

    const changePage = (e) => {
        setactiveKey(e);
        switch (e) {
            case "1":
                updatePage('Dashboard');
                break;
            case "2":
                updatePage('MyDoctors');
                break;
            case "3-1":
                updatePage('AllSurvey');
                break;
            case "3-2":
                updatePage('PendingSurvey');
                break;
            case "3-3":
                updatePage('CompletedSurvey');
                break;
            case "4-1":
                updatePage('AccountSet')
                break;
            case "4-2":
                updatePage('PrivacySet')
                break;
            case "4-3":
                updatePage('GeneralSet')
                break;
            default:
                updatePage('Dashboard');
                setactiveKey("1");
        }
    }

    return (
        <div style={styles}>
            <Sidenav onSelect={changePage} defaultOpenKeys={['3', '4']} activeKey={activeKey}>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" icon={<Icon icon="dashboard"/>}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<Icon icon="group"/>}>
                            My Doctors
                        </Nav.Item>
                        <Dropdown eventKey="3" title="Survey" icon={<Icon icon="file-text-o" />}>
                            <Dropdown.Item eventKey="3-1">All Surveys</Dropdown.Item>
                            <Dropdown.Item eventKey="3-2">Pending Survey</Dropdown.Item> 
                            <Dropdown.Item eventKey="3-3">Completed Survey</Dropdown.Item>
                        </Dropdown>
                        <Dropdown
                            eventKey="4"
                            title="Settings"
                            icon={<Icon icon="gear-circle" />}
                        >
                            <Dropdown.Item eventKey="4-1">Account</Dropdown.Item>
                            <Dropdown.Item eventKey="4-2">Privacy</Dropdown.Item>
                            <Dropdown.Item eventKey="4-3">General</Dropdown.Item>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}
