import React,{ useEffect} from 'react'
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("bootstrap");

export default function TemplateCreator({TemplateJSON}) {

    let surveyCreator

    useEffect(() => {
        let options = { 
            showLogicTab: true,
            // showJSONEditorTab: false
            // showEmbededSurveyTab: true 
        };
        surveyCreator = new SurveyJSCreator.SurveyCreator(
            "creatorElement",
            options
        );
        surveyCreator.tabs().forEach(x => console.log(x))
        surveyCreator.saveSurveyFunc = saveMySurvey;
        surveyCreator.showToolbox = "right";
        surveyCreator.showPropertyGrid = "right";
        surveyCreator.rightContainerActiveItem("toolbox");
        if(TemplateJSON) surveyCreator.JSON = JSON.parse(TemplateJSON)
    }, [])

    const saveMySurvey = () => {
        console.log(JSON.stringify(surveyCreator.text));
    };

    return (
        <div style = {{width: "100%"}}>
            <div id="creatorElement"></div>
        </div>
    )
}
