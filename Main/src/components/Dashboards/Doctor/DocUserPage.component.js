import React, { useState, useContext} from "react";
import SurveyList from "./survey-list.component";
import { useHistory } from "react-router-dom";
import DocDashSideNav from "./DocDashSideNav.component"
import UserContext from "../../../context/UserContext";
import DocPaMGT from './DocPaMGT.component'
import DocSurveyTemplate from './DocSurveyTemplate.component'
import TemplateCreator from './TempCreator.component'
import CreateDistribution from './Create-distribution.component'

export default function DocUserPage() {
    // const history = useHistory();
    // const { userData} = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState('Dashboard');

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
            case 'SurveyDist': 
                return <CreateDistribution/> 
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