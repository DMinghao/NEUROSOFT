import React, { useState, useContext} from "react";
import SurveyList from "./survey-list.component";
import { useHistory } from "react-router-dom";
import DocDashSideNav from "./DocDashSideNav.component"
import UserContext from "../../../context/UserContext";
import DocPaMGT from './DocPaMGT.component'
import DocSurveyTemplate from './DocSurveyTemplate.component'
import TemplateCreator from './TempCreator.component'

export default function DocUserPage() {
    const history = useHistory();
    const { userData} = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState('Dashboard');
    if (typeof userData.user === "undefined") history.push("/login");

    const dashContent = () => {
        return (
            <div>
                <h3>Doctor's Dashboard Page</h3>
            </div>
        )
    }
    
    const renderSwitch = () => {
        switch (currentPage) {
            case 'Dashboard':
                return dashContent();
            case 'DocSurveyTemplate':
                return <DocSurveyTemplate/>
            case 'TemplateCreator': 
                return <TemplateCreator/>
            case 'ReceivedSurvey':
                return <SurveyList/>
            case 'PatientMGT': 
                return <DocPaMGT/>
            default:
                return dashContent();
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <DocDashSideNav page={currentPage} updatePage={setCurrentPage} />
            {renderSwitch()}
        </div>
    );
}