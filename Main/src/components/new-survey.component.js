import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import * as Survey from "survey-react";

export default class NewSurvey extends Component {


  constructor(props) {
    super(props);

    this.finish = this.finish.bind(this);
    Survey
      .StylesManager
      .applyTheme("default");

    this.state = {
      json: {
        "pages": [
          {
            "name": "page1",
            questions: [
              {
                name: "name",
                type: "text",
                title: "Please enter your name:",
                isRequired: true
              }, {
                name: "birthdate",
                type: "text",
                inputType: "date",
                title: "Your birthdate:",
                isRequired: true
              }, {
                name: "symptom",
                type: "checkbox",
                title: "What is your symptom?",
                isRequired: true,
                choices: [
                  "Arm Numbness", "Arm Pain", "Arm Weakness", "Back Pain", "Hip Pain", "Leg Numbness", "Leg Pain", "Leg Weakness", "Neck Pain", "Other Algorism"
                ]
              }
            ]
          }, {
            "name": "page2",
            title: "Arm Numbness",
            visibleIf: "{symptom} contains 'Arm Numbness'",
            questions: [
              {
                name: "Armnumbnesscharacter",
                type: "checkbox",
                title: "Character",
                isRequired: true,
                choices: [
                  "No sensation",
                  "Decreased sensation – feels touch, but not normal",
                  "Tingling – pins & needles sensation"
                ]
              }, {
                name: "Armnumbnesslocation",
                type: "checkbox",
                title: "Location",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                type: "checkbox",
                name: "Armnumbnesslocationright",
                title: "Where is on the right?",
                visibleIf: "{Armnumbnesslocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Shoulder", "Upper Arm", "Forearm", "Wrist", "Hand", "Fingers"
                ]
              }, {
                type: "checkbox",
                name: "Armnumbnesslocationleft",
                title: "Where is on the left?",
                visibleIf: "{Armnumbnesslocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Shoulder", "Upper Arm", "Forearm", "Wrist", "Hand", "Fingers", "ankle", "Foot"
                ]
              }, {
                type: "checkbox",
                name: "Armnumbnesslocationleftfoot",
                title: "Where is on the left foot?",
                visibleIf: "{Armnumbnesslocation} contains 'Left' and {Armnumbnesslocationleft} contains 'Foot'",
                isRequired: true,
                choices: [
                  "Top", "Bottom", "Inside", "Outside"]
              }, {
                type: "text",
                name: "Armnumbnessduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "checkbox",
                name: "Armnumbnesstime",
                title: "Timing of arm numbness- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Armnumbnessbetter",
                title: "What makes it better?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using arm", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "armnumbnessworse",
                title: "What makes it worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using arm", "Rest", "other"
                ]
              }, {
                type: "radiogroup",
                name: "armnumbnesshistory",
                title: "History of arm injury",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }
            ]
          }, {
            "name": "page3",
            title: "Arm Pain",
            visibleIf: "{symptom} contains 'Arm Pain'",
            questions: [
              {
                name: "armpainlocation",
                type: "checkbox",
                title: "Location of your arm pain",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                name: "armpainlocationright",
                type: "checkbox",
                title: "Where is your arm pain on the right?",
                visibleIf: "{armpainlocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Shoulder", "Upper Arm", "Forearm", "Wrist", "Hand", "Fingers"
                ]
              }, {
                name: "armpainlocationleft",
                type: "checkbox",
                title: "Where is your arm pain on the left?",
                visibleIf: "{armpainlocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Shoulder", "Upper Arm", "Forearm", "Wrist", "Hand", "Fingers"
                ]
              }, {
                name: "armpaincharacter",
                type: "checkbox",
                title: "Where is the chatacter of your arm pain?",
                isRequired: true,
                choices: [
                  "Sharp", "Dull", "Ache", "Burning", "Tingling"
                ]
              }, {
                type: "text",
                name: "Armpainduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "dropdown",
                name: "Armpainseverity",
                title: "Rate pain on scale 1 to 10; averaged over last 2 weeks; 0= no pain; 10= worst pain you can imagine",
                isRequired: true,
                colCount: 0,
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }, {
                type: "checkbox",
                name: "Armkpaintime",
                title: "Timing of pain- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "armpainbetter",
                title: "What makes pain better?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Sitting", "Lying Down", "Bending", "Extending/straightening", "Medication", "Resting", "Heat", "Ice", "Manipulation – massage, etc", "other"
                ]
              }, {
                type: "checkbox",
                name: "backpainworse",
                title: "What makes pain worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Lying Down", "Bending", "Extending/straightening", "Sitting", "Lying Down", "Resting", "Manipulation – touching, pressure", "Cold weather", "other"
                ]
              }
            ]
          }, {
            "name": "page4",
            title: "Arm Weakness",
            visibleIf: "{symptom} contains 'Arm Weakness'",
            questions: [
              {
                name: "Armweaknesslocation",
                type: "checkbox",
                title: "Please pick up the location",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                name: "Armweaknesslocationright",
                type: "checkbox",
                title: "Where is the arm weakness on your right?",
                visibleIf: "{Armweaknesslocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Shoulder", "Elbow", "Wrist", "Hand", "Fingers"
                ]
              }, {
                name: "Armweaknesslocationrightelbow",
                type: "checkbox",
                title: "Where is the arm weakness on your right elbow?",
                visibleIf: "{Armweaknesslocation} contains 'Right'and {Armweaknesslocationright} contains 'Elbow'",
                isRequired: true,
                choices: [
                  "Flex", "Extend"
                ]
              }, {
                name: "Armweaknesslocationleft",
                type: "checkbox",
                title: "Where is the arm weakness on your left?",
                visibleIf: "{Armweaknesslocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Shoulder", "Elbow", "Wrist", "Hand", "Fingers"
                ]
              }, {
                name: "Armweaknesslocationleftelbow",
                type: "checkbox",
                title: "Where is the arm weakness on your left elbow?",
                visibleIf: "{Armweaknesslocation} contains 'Left'and {Armweaknesslocationleft} contains 'Elbow'",
                isRequired: true,
                choices: [
                  "Flex", "Extend"
                ]
              }, {
                type: "text",
                name: "Armweaknessduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "checkbox",
                name: "Armweaknesstime",
                title: "Timing of arm weakness- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping", "All the time"
                ]
              }, {
                type: "checkbox",
                name: "Armweaknessbetter",
                title: "What makes it better?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using arm", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "armweaknessworse",
                title: "What makes it worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using arm", "Rest", "other"
                ]
              }, {
                type: "radiogroup",
                name: "armweaknesshistory",
                title: "History of arm injury - can OMIT if already answered in Arm Numbness Algorithm",
                choices: [
                  "Yes", "No"
                ]
              }
            ]
          },

          {
            "name": "page5",
            title: "Back Pain",
            visibleIf: "{symptom} contains 'Back Pain'",
            questions: [
              {
                type: "checkbox",
                name: "BackpainLocation",
                title: "Pick up the Location from List",
                isRequired: true,
                choices: [
                  "Upper Back",
                  "Mid Back",
                  "Lower Back"
                ],
              }, {
                "type": "checkbox",
                "name": "BackpainLocationupper",
                isRequired: true,
                "title": "Where is on Upper Back?",
                "visibleIf": "{BackpainLocation} contains 'Upper Back'",
                choices: [
                  "Left", "Right", "Midline"
                ]
              }, {
                "type": "checkbox",
                "name": "BackpainLocationmid",
                isRequired: true,
                "title": "Where is on Mid Back?",
                "visibleIf": "{BackpainLocation} contains 'Mid Back'",
                choices: [
                  "Left", "Right", "Midline"]
              }, {
                "type": "checkbox",
                "name": "BackpainLocationlower",
                isRequired: true,
                "title": "Where is on Lower Back?",
                "visibleIf": "{BackpainLocation} contains 'Lower Back'",
                choices: [
                  "Left", "Right", "Midline"]
              }, {
                type: "checkbox",
                name: "Backpaincharacter",
                title: "Character– pick one that most closely applies",
                isRequired: true,
                choices: [
                  "Arch", "Sharp", "Stabbing", "Burning", "Dull", "On/Off (Intermittent)", "Constant"
                ]
              }, {
                name: "Backpainonset",
                type: "text",
                title: "Onset – Enter nb. and units (days, weeks, months, years)",
                placeHolder: "10 years",
                isRequired: true
              }, {
                type: "checkbox",
                name: "Backpaincause",
                title: "What causes the pain?",
                isRequired: true,
                choices: ["Trauma - Fall, MVA", "Strain – lifting, bending", "Spontaneous – nothing caused pain"]
              }, {
                "type": "checkbox",
                "name": "Backpaincausetrauma",
                isRequired: true,
                "title": "Where do you get trauma?",
                "visibleIf": "{Backpaincause} contains 'Trauma - Fall, MVA'",
                choices: [
                  "work", "home", "other"
                ]
              }, {
                "type": "checkbox",
                "name": "Backpaincausestrain",
                isRequired: true,
                "title": "Where do you get strain?",
                "visibleIf": "{Backpaincause} contains 'Strain – lifting, bending'",
                choices: [
                  "work", "home", "other"]
              }, {
                type: "dropdown",
                name: "Backpainseverity",
                title: "Rate pain on scale 1 to 10; averaged over last 2 weeks; 0= no pain; 10= worst pain you can imagine",
                isRequired: true,
                colCount: 0,
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }, {
                type: "radiogroup",
                name: "Backpainradiate",
                title: "Does pain Radiate?",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ],
                colCount: 1
              }, {
                type: "checkbox",
                name: "backpainradiatelocation",
                title: "Where does the pain radiate",
                visibleIf: "{Backpainradiate}='Yes'",
                isRequired: true,
                choices: [
                  "Upper Back", "Mid Back", "Lower Back", "Hips", "Legs"
                ]
              }, {
                type: "checkbox",
                name: "backpainradiatelocationupper",
                title: "Where does the pain radiate on Upper Back",
                visibleIf: "{Backpainradiatelocation} contains 'Upper Back'and {Backpainradiate} = 'Yes'",
                isRequired: true,
                choices: [
                  "Left", "Midline", "Right"
                ]
              }, {
                type: "checkbox",
                name: "backpainradiatelocationmid",
                title: "Where does the pain radiate on Mid Back",
                visibleIf: "{Backpainradiatelocation} contains 'Mid Back'and {Backpainradiate} = 'Yes'",
                isRequired: true,
                choices: [
                  "Left", "Midline", "Right"
                ]
              }, {
                type: "checkbox",
                name: "backpainradiatelocationlower",
                title: "Where does the pain radiate on Lower Back",
                visibleIf: "{Backpainradiatelocation} contains 'Lower Back'and {Backpainradiate} = 'Yes'",
                isRequired: true,
                choices: [
                  "Left", "Midline", "Right"
                ]
              }, {
                type: "checkbox",
                name: "backpaintime",
                title: "Timing of pain- when does it occur or when is it at its worst",
                visibleIf: "{Backpainradiate}='No'",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Backpainsensation",
                title: "If there change in sensation: numbness or tingling?",
                choices: [
                  "Back", "Hips", "Legs"
                ]
              }, {
                type: "checkbox",
                name: "backpainsensationback",
                title: "Where is the change on back?",
                visibleIf: "{Backpainsensation} contains 'Back'",
                isRequired: true,
                choices: [
                  "Up", "Mid", "Low", "Left", "Center", "Right"
                ]
              }, {
                type: "checkbox",
                name: "backpainsensationhip",
                title: "Where is the change on hips?",
                visibleIf: "{Backpainsensation} contains 'Hips'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Side"
                ]
              }, {
                type: "checkbox",
                name: "Backpainweakness",
                title: "Is there weakness?",
                choices: [
                  "Back", "Leg Weakness Algorism"
                ],
              }, {
                type: "checkbox",
                name: "Backpainfunction",
                title: "Is there any change in your bowel or bladder function?",
                choices: [
                  "Bowel – constipation, loose stool, incontinence, pain , other", "Bladder – retention, hesitance, frequency, pain, incontinence, other"
                ],
              }, {
                type: "text",
                name: "backpainfunctionhowlongbowel",
                title: "How long is the change in bowel? - ## d/w/m/yr",
                visibleIf: "{Backpainfunction} contains 'Bowel – constipation, loose stool, incontinence, pain , other' ",
                placeHolder: "10 days",
                isRequired: true
              }, {
                type: "text",
                name: "backpainfunctionhowlongbladder",
                title: "How long is the change in bladder? - ## d/w/m/yr",
                visibleIf: "{Backpainfunction} contains 'Bladder – retention, hesitance, frequency, pain, incontinence, other' ",
                placeHolder: "10 days",
                isRequired: true
              }, {
                type: "checkbox",
                name: "backpainbetter",
                title: "What makes pain better?",
                isRequired: true,
                choices: [
                  "Nothing", "Moving – bending forward, bending backward", "Standing", "Sitting", "Lying Down", "Rest", "Heat", "Ice", "other"
                ]
              }, {
                type: "checkbox",
                name: "backpainworse",
                title: "What makes pain worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Moving – bending forward, bending backward", "Standing", "Sitting", "Lying Down", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "backpaindoneyes",
                title: "What have you done for your back pain?",
                choices: [
                  "Medication", "Exercise"
                ]
              }, {
                type: "checkbox",
                name: "backpaindonemed",
                title: "What medication have you taken for your back pain?",
                visibleIf: "{Backpaindoneyes} contains 'Medication'",
                isRequired: true,
                choices: [
                  "other-the-counter", "prescribed"
                ]
              }, {
                type: "text",
                name: "backpaindoneotc",
                title: "List OTC tried",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'other-the-counter'",
                isRequired: true
              }, {
                type: "checkbox",
                name: "backpaindoneprescribed",
                title: "What prescribed medication have you taken for your back pain?",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'",
                isRequired: true,
                choices: [
                  "NSAIDs", "Muscle relaxant", "Opioid Medication"
                ]
              }, {
                type: "text",
                name: "backpaindoneNSAIDs",
                title: "List NSAIDs tried",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'NSAIDs'",
                isRequired: true
              }, {
                type: "text",
                name: "backpaindonemuscle",
                title: "List muscle relaxant tried",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Muscle relaxant'",
                isRequired: true
              }, {
                type: "text",
                name: "backpaindoneopioid",
                title: "List opioid medication tried",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "backpaindoneopioidtaking",
                title: "Are you currently taking opioid medication",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "backpaindoneopioiddose",
                title: "What is current medication and doses for opioid medication",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "backpaindoneopioidprovider",
                title: "Do you have a provider for opioid medication",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "backpaindoneopioidprovidername",
                title: "What is your provider name for opioid medication",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication' and {backpaindoneopioidprovider} = 'Yes'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "backpaindoneopioidprovidercontract",
                title: "Do you have a Pain Contract with this provider",
                visibleIf: "{Backpaindoneyes} contains 'Medication'and {backpaindonemed} contains 'prescribed'and {backpaindoneprescribed} contains 'Opioid Medication' and {backpaindoneopioidprovider} = 'Yes'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "checkbox",
                name: "backpaindoneexercise",
                title: "What exercises have you done for your back pain?",
                visibleIf: "{Backpaindoneyes} contains 'Exercise'",
                isRequired: true,
                choices: [
                  "Self-mediated", "Physical Therapy", "Aqua-theropy", "Massage", "Chiropractics"
                ]
              }, {
                name: "backpaindoneexercisephysical",
                type: "text",
                inputType: "date",
                title: "What is the starting date for physical exercise",
                visibleIf: "{Backpaindoneyes} contains 'Exercise' and {backpaindoneexercise} contains 'Physical Therapy'",
                isRequired: true
              }, {
                name: "backpaindoneexercisechiro",
                type: "text",
                inputType: "date",
                title: "What is the starting date for Chiropractics",
                visibleIf: "{Backpaindoneyes} contains 'Exercise' and {backpaindoneexercise} contains 'Chiropractics'",
                isRequired: true
              }, {
                type: "checkbox",
                name: "backpainprocesureyes",
                title: "What procedures have you done?",
                choices: [
                  "Injection", "Surgery"
                ]
              }, {
                type: "radiogroup",
                name: "backpainprocesureinjectionperform",
                title: "Is the injection prtformed by a doctor?",
                visibleIf: "{backpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "backpainprocesureinjectiondate",
                title: "What is the date of the injection?",
                inputType: "date",
                visibleIf: "{backpainprocesureyes} contains 'Injection'",
                isRequired: true,
              }, {
                type: "radiogroup",
                name: "backpainprocesureinjectiontype",
                title: "What is the type of the injection?",
                visibleIf: "{backpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Unknown", "Epidural steroid", "Facet joint or nerve block", "other"
                ]
              }, {
                type: "radiogroup",
                name: "backpainprocesureinjectionresult",
                title: "What is the result of the injection?",
                visibleIf: "{backpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Better", "Worse", "No Change"
                ]
              }, {
                type: "radiogroup",
                name: "backpainprocesuresurgeryperform",
                title: "Is the surgery prtformed by a doctor?",
                visibleIf: "{backpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "backpainprocesuresurgerydate",
                title: "What is the date of the surgery?",
                inputType: "date",
                visibleIf: "{backpainprocesureyes} contains 'Surgery'",
                isRequired: true,
              }, {
                type: "radiogroup",
                name: "backpainprocesuresurgerytype",
                title: "What is the type of the surgery?",
                visibleIf: "{backpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Unknown", "Discectomy", "Laminectomy", "Fusion", "other"
                ]
              }, {
                type: "radiogroup",
                name: "backpainprocesuresurgeryresult",
                title: "What is the result of the surgery?",
                visibleIf: "{backpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Better", "Worse", "No Change"
                ]
              }
            ]
          }, {
            "name": "page6",
            title: "Hip Pain",
            visibleIf: "{symptom} contains 'Hip Pain'",
            questions: [
              {
                name: "Hippainlocation",
                type: "checkbox",
                title: "Location pick from list",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                name: "Hippainlocationright",
                type: "checkbox",
                title: "Where is the pain on your right?",
                visibleIf: "{Hippainlocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Front/anterior", "Inside/groin", "Outside", "Back- buttock"
                ]
              }, {
                name: "Hippainlocationleft",
                type: "checkbox",
                title: "Where is the pain on your left?",
                visibleIf: "{Hippainlocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Front/anterior", "Inside/groin", "Outside", "Back- buttock"
                ]
              }, {
                name: "Hippaincharacter",
                type: "checkbox",
                title: "Character– pick one that most closely applies",
                isRequired: true,
                choices: [
                  "Sharp", "Dull", "Ache", "Burning", "Tingling"
                ]
              }, {
                type: "text",
                name: "Hippainduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "checkbox",
                name: "Hippaintime",
                title: "Timing of pain- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Hippainbetter",
                title: "What makes pain better?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Sitting", "Lying Down", "Bending", "Extending/straightening", "Medication", "Resting", "Heat", "Ice", "Manipulation – massage, etc", "other"
                ]
              }, {
                type: "checkbox",
                name: "Hippainworse",
                title: "What makes pain worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Lying Down", "Bending", "Extending/straightening", "Sitting", "Lying Down", "Resting", "Manipulation – touching, pressure", "Cold weather", "other"
                ]
              }
            ]
          }, {
            "name": "page7",
            title: "Leg Numbness",
            visibleIf: "{symptom} contains 'Leg Numbness'",
            questions: [
              {
                name: "Legnumbnesscharacter",
                type: "checkbox",
                title: "Character",
                isRequired: true,
                choices: [
                  "No sensation",
                  "Decreased sensation – feels touch, but not normal",
                  "Tingling – pins & needles sensation"
                ]
              }, {
                name: "Legnumbnesslocation",
                type: "checkbox",
                title: "Please pick up the location",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                name: "Legnumbnesslocationright",
                type: "checkbox",
                title: "Where is the numbness on your right",
                visibleIf: "{Legnumbnesslocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Upper leg/thigh", "Lower leg/calf", "Foot"
                ]
              }, {
                name: "Legnumbnesslocationrightupper",
                type: "checkbox",
                title: "Where is the numbness on your right upper leg/thigh",
                visibleIf: "{Legnumbnesslocation} contains 'Right' and {Legnumbnesslocationright} contains 'Upper leg/thigh'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legnumbnesslocationrightlower",
                type: "checkbox",
                title: "Where is the numbness on your right lower leg/calf",
                visibleIf: "{Legnumbnesslocation} contains 'Right' and {Legnumbnesslocationright} contains 'Lower leg/calf'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legnumbnesslocationrightfoot",
                type: "checkbox",
                title: "Where is the numbness on your right foot",
                visibleIf: "{Legnumbnesslocation} contains 'Right' and {Legnumbnesslocationright} contains 'Foot'",
                isRequired: true,
                choices: [
                  "Top", "Bottom", "Inside", "Outside"
                ]
              }, {
                name: "Legnumbnesslocationleft",
                type: "checkbox",
                title: "Where is the numbness on your left",
                visibleIf: "{Legnumbnesslocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Upper leg/thigh", "Lower leg/calf", "Foot", "Ankle"
                ]
              }, {
                name: "Legnumbnesslocationleftupper",
                type: "checkbox",
                title: "Where is the numbness on your left upper leg/thigh",
                visibleIf: "{Legnumbnesslocation} contains 'Left' and {Legnumbnesslocationleft} contains 'Upper leg/thigh'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legnumbnesslocationleftlower",
                type: "checkbox",
                title: "Where is the numbness on your left lower leg/calf",
                visibleIf: "{Legnumbnesslocation} contains 'Left' and {Legnumbnesslocationleft} contains 'Lower leg/calf'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legnumbnesslocationleftfoot",
                type: "checkbox",
                title: "Where is the numbness on your left foot",
                visibleIf: "{Legnumbnesslocation} contains 'Left' and {Legnumbnesslocationleft} contains 'Foot'",
                isRequired: true,
                choices: [
                  "Top", "Bottom", "Inside", "Outside"
                ]
              }, {
                type: "text",
                name: "Legnumbnessduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "checkbox",
                name: "Legnumbnesstime",
                title: "Timing of leg numbness- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Legnumbnessbetter",
                title: "What makes it better?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using leg", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "Legnumbnessworse",
                title: "What makes it worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using leg", "Rest", "other"
                ]
              }, {
                type: "radiogroup",
                name: "Legnumbnesshistory",
                title: "History of leg injury",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }
            ]
          }, {
            "name": "page8",
            title: "Leg Pain",
            visibleIf: "{symptom} contains 'Leg Pain'",
            questions: [
              {
                name: "Legpainlocation",
                type: "checkbox",
                title: "Please pick up the location",
                isRequired: true,
                choices: [
                  "Right", "Left"
                ]
              }, {
                name: "Legpainlocationright",
                type: "checkbox",
                title: "Where is the pain on your right",
                visibleIf: "{Legpainlocation} contains 'Right'",
                isRequired: true,
                choices: [
                  "Upper leg/thigh", "Lower leg/calf", "Foot"
                ]
              }, {
                name: "Legpainlocationrightupper",
                type: "checkbox",
                title: "Where is the pain on your right upper leg/thigh",
                visibleIf: "{Legpainlocation} contains 'Right' and {Legpainlocationright} contains 'Upper leg/thigh'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legpainlocationrightlower",
                type: "checkbox",
                title: "Where is the pain on your right lower leg/calf",
                visibleIf: "{Legpainlocation} contains 'Right' and {Legpainlocationright} contains 'Lower leg/calf'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legpainlocationrightfoot",
                type: "checkbox",
                title: "Where is the pain on your right foot",
                visibleIf: "{Legpainlocation} contains 'Right' and {Legpainlocationright} contains 'Foot'",
                isRequired: true,
                choices: [
                  "Top", "Bottom", "Inside", "Outside"
                ]
              }, {
                name: "Legpainlocationleft",
                type: "checkbox",
                title: "Where is the pain on your left",
                visibleIf: "{Legpainlocation} contains 'Left'",
                isRequired: true,
                choices: [
                  "Upper leg/thigh", "Lower leg/calf", "Foot", "Ankle"
                ]
              }, {
                name: "Legpainlocationleftupper",
                type: "checkbox",
                title: "Where is the pain on your left upper leg/thigh",
                visibleIf: "{Legpainlocation} contains 'Left' and {Legpainlocationleft} contains 'Upper leg/thigh'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legpainlocationleftlower",
                type: "checkbox",
                title: "Where is the pain on your left lower leg/calf",
                visibleIf: "{Legpainlocation} contains 'Left' and {Legpainlocationleft} contains 'Lower leg/calf'",
                isRequired: true,
                choices: [
                  "Front", "Back", "Inside", "Outside"
                ]
              }, {
                name: "Legpainlocationleftfoot",
                type: "checkbox",
                title: "Where is the pain on your left foot",
                visibleIf: "{Legpainlocation} contains 'Left' and {Legpainlocationleft} contains 'Foot'",
                isRequired: true,
                choices: [
                  "Top", "Bottom", "Inside", "Outside"
                ]
              }, {
                name: "Legpaincharacter",
                type: "checkbox",
                title: "Character– pick one that most closely applies",
                isRequired: true,
                choices: [
                  "Sharp", "Dull", "Ache", "Burning", "Tingling"
                ]
              }, {
                type: "text",
                name: "Legpainduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "dropdown",
                name: "Legpainseverity",
                title: "Rate pain on scale 1 to 10; averaged over last 2 weeks; 0= no pain; 10= worst pain you can imagine",
                isRequired: true,
                colCount: 0,
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }, {
                type: "checkbox",
                name: "Legpaintime",
                title: "Timing of pain- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Legpainbetter",
                title: "What makes pain better?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Sitting", "Lying Down", "Bending", "Extending/straightening", "Medication", "Resting", "Heat", "Ice", "Manipulation – massage, etc", "other"
                ]
              }, {
                type: "checkbox",
                name: "Legpainworse",
                title: "What makes pain worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Walking", "Standing", "Lying Down", "Bending", "Extending/straightening", "Sitting", "Lying Down", "Resting", "Manipulation – touching, pressure", "Cold weather", "other"
                ]
              }
            ]
          }, {
            "name": "page9",
            title: "Leg Weakness",
            visibleIf: "{symptom} contains 'Leg Weakness'",
            questions: [
              {
                name: "Legweaknesslocation",
                type: "checkbox",
                title: "Please pick up the location",
                isRequired: true,
                choices: [
                  "Hip", "Knee", "Anckle"
                ]
              }, {
                name: "Legweaknesslocationhip",
                type: "checkbox",
                title: "Where is the weakness on your hip",
                visibleIf: "{Legweaknesslocation} contains 'Hip'",
                isRequired: true,
                choices: [
                  "Extension", "Flexion"
                ]
              }, {
                name: "Legweaknesslocationknee",
                type: "checkbox",
                title: "Where is the weakness on your knee",
                visibleIf: "{Legweaknesslocation} contains 'Knee'",
                isRequired: true,
                choices: [
                  "Extension", "Flexion"
                ]
              }, {
                name: "Legweaknesslocationanckle",
                type: "checkbox",
                title: "Where is the weakness on your anckle",
                visibleIf: "{Legweaknesslocation} contains 'Anckle'",
                isRequired: true,
                choices: [
                  "Extension (aka plantarflexion) – standing on toes", "Flex (aka dorsiflexion), standing on heels"
                ]
              }, {
                type: "text",
                name: "Legweaknessduration",
                title: "Duration- ## yr/mo/wk/d",
                isRequired: true,
                placeHolder: "10 years"
              }, {
                type: "checkbox",
                name: "Legweaknesstime",
                title: "Timing of leg weakness- when does it occur or when is it at its worst",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping", "All the time"
                ]
              }, {
                type: "checkbox",
                name: "Legweaknessbetter",
                title: "What makes it better?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using leg", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "Legweaknessworse",
                title: "What makes it worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Activity - using leg", "Rest", "other"
                ]
              }, {
                type: "radiogroup",
                name: "Legweaknesshistory",
                title: "History of leg injury - can OMIT if already answered in Leg Numbness Algorithm",
                choices: [
                  "Yes", "No"
                ]
              }
            ]
          }, {
            "name": "page10",
            title: "Neck Pain",
            visibleIf: "{symptom} contains 'Neck Pain'",
            questions: [
              {
                name: "Neckpainlocation",
                type: "checkbox",
                title: "Please pick up the location",
                isRequired: true,
                choices: [
                  "Upper neck", "Mid neck", "Low neck"
                ]
              }, {
                name: "Neckpainlocationlow",
                type: "checkbox",
                title: "Where is the pain on your low neck",
                visibleIf: "{Neckpainlocation} contains 'Low neck'",
                isRequired: true,
                choices: [
                  "Left", "Right", "Midline"
                ]
              }, {
                type: "checkbox",
                name: "Neckpaincharacter",
                title: "Character– pick one that most closely applies",
                isRequired: true,
                choices: [
                  "Arch", "Sharp", "Stabbing", "Burning", "Dull"
                ]
              }, {
                name: "Neckpainonset",
                type: "text",
                title: "Onset – Enter nb. and units (days, weeks, months, years)",
                placeHolder: "10 years",
                isRequired: true
              }, {
                type: "checkbox",
                name: "Neckpaincause",
                title: "What causes the pain?",
                isRequired: true,
                choices: ["Trauma - Fall, MVA", "Strain – lifting, bending", "Spontaneous – nothing caused pain"]
              }, {
                "type": "checkbox",
                "name": "Neckpaincausetrauma",
                isRequired: true,
                "title": "Where do you get trauma?",
                "visibleIf": "{Neckpaincause} contains 'Trauma - Fall, MVA'",
                choices: [
                  "work", "home", "other"
                ]
              }, {
                "type": "checkbox",
                "name": "Neckpaincausestrain",
                isRequired: true,
                "title": "Where do you get strain?",
                "visibleIf": "{Neckpaincause} contains 'Strain – lifting, bending'",
                choices: [
                  "work", "home", "other"]
              }, {
                type: "dropdown",
                name: "Neckpainseverity",
                title: "Rate pain on scale 1 to 10; averaged over last 2 weeks; 0= no pain; 10= worst pain you can imagine",
                isRequired: true,
                colCount: 0,
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }, {
                type: "radiogroup",
                name: "Neckpainradiate",
                title: "Does pain Radiate?",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ],
                colCount: 1
              }, {
                type: "checkbox",
                name: "neckpainradiatelocation",
                title: "Where does the pain radiate",
                visibleIf: "{Neckpainradiate}='Yes'",
                isRequired: true,
                choices: [
                  "Back", "Arm pain algorism"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainradiatelocationback",
                title: "Where does the pain radiate on the Back",
                visibleIf: "{Neckpainradiatelocation} contains 'Back'and {Neckpainradiate} = 'Yes'",
                isRequired: true,
                choices: [
                  "To head, upper neck, lower neck", "To left, center, right"
                ]
              }, {
                type: "checkbox",
                name: "Neckpaintime",
                title: "Timing of pain- when does it occur or when is it at its worst",
                visibleIf: "{Neckpainradiate}='No'",
                isRequired: true,
                choices: [
                  "First thing in morning", "Late morning", "Mid-day", "Afternoon", "Evening", "Nighttime- while sleeping"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainsensation",
                title: "If there change in sensation: numbness or tingling?",
                choices: [
                  "Neck", "Arm"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainsensationneck",
                title: "Where is the change on back?",
                visibleIf: "{Neckpainsensation} contains 'Neck'",
                isRequired: true,
                choices: [
                  "Head, upper neck, lower neck", "Left, center, right"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainsensationarm",
                title: "Where is the change on arm?",
                visibleIf: "{Neckpainsensation} contains 'Arm'",
                isRequired: true,
                choices: [
                  "Right shoulder", "Right upper arm", "Right forearm", "Right hand", "Right fingers", "Left shoulder", "Left upper arm", "Left forearm", "Left hand", "Left fingers"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainweakness",
                title: "Is there weakness?",
                choices: [
                  "Neck", "Arm"
                ],
              }, {
                type: "checkbox",
                name: "Neckpainweaknessarm",
                title: "Where is the weakness on arm?",
                visibleIf: "{Neckpainweakness} contains 'Arm'",
                isRequired: true,
                choices: [
                  "Right shoulder", "Right upper arm", "Right forearm", "Right hand", "Right fingers", "Left shoulder", "Left upper arm", "Left forearm", "Left hand", "Left fingers"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainfunction",
                title: "Is there any change in your bowel or bladder function?",
                choices: [
                  "Bowel – constipation, loose stool, incontinence, pain , other", "Bladder – retention, hesitance, frequency, pain, incontinence, other"
                ],
              }, {
                type: "text",
                name: "Neckpainfunctionhowlongbowel",
                title: "How long is the change in bowel? - ## d/w/m/yr",
                visibleIf: "{Neckpainfunction} contains 'Bowel – constipation, loose stool, incontinence, pain , other' ",
                placeHolder: "10 days",
                isRequired: true
              }, {
                type: "text",
                name: "Neckpainfunctionhowlongbladder",
                title: "How long is the change in bladder? - ## d/w/m/yr",
                visibleIf: "{Neckpainfunction} contains 'Bladder – retention, hesitance, frequency, pain, incontinence, other' ",
                placeHolder: "10 days",
                isRequired: true
              }, {
                type: "checkbox",
                name: "Neckpainbetter",
                title: "What makes pain better?",
                isRequired: true,
                choices: [
                  "Nothing", "Moving – bending forward, bending backward", "Standing", "Sitting", "Lying Down", "Rest", "Heat", "Ice", "other"
                ]
              }, {
                type: "checkbox",
                name: "Neckpainworse",
                title: "What makes pain worse?",
                isRequired: true,
                choices: [
                  "Nothing", "Moving – bending forward, bending backward", "Standing", "Sitting", "Lying Down", "Rest", "other"
                ]
              }, {
                type: "checkbox",
                name: "Neckpaindoneyes",
                title: "What have you done for your back pain?",
                choices: [
                  "Medication", "Exercise"
                ]
              }, {
                type: "checkbox",
                name: "Neckpaindonemed",
                title: "What medication have you taken for your neck pain?",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'",
                isRequired: true,
                choices: [
                  "other-the-counter", "prescribed"
                ]
              }, {
                type: "text",
                name: "Neckpaindoneotc",
                title: "List OTC tried",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'other-the-counter'",
                isRequired: true
              }, {
                type: "checkbox",
                name: "Neckpaindoneprescribed",
                title: "What prescribed medication have you taken for your neck pain?",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'",
                isRequired: true,
                choices: [
                  "NSAIDs", "Muscle relaxant", "Opioid Medication"
                ]
              }, {
                type: "text",
                name: "NeckpaindoneNSAIDs",
                title: "List NSAIDs tried",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'NSAIDs'",
                isRequired: true
              }, {
                type: "text",
                name: "Neckpaindonemuscle",
                title: "List muscle relaxant tried",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Muscle relaxant'",
                isRequired: true
              }, {
                type: "text",
                name: "Neckpaindoneopioid",
                title: "List opioid medication tried",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "Neckpaindoneopioidtaking",
                title: "Are you currently taking opioid medication",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "Neckpaindoneopioiddose",
                title: "What is current medication and doses for opioid medication",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "Neckpaindoneopioidprovider",
                title: "Do you have a provider for opioid medication",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "Neckpaindoneopioidprovidername",
                title: "What is your provider name for opioid medication",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication' and {Neckpaindoneopioidprovider} = 'Yes'",
                isRequired: true
              }, {
                type: "radiogroup",
                name: "Neckpaindoneopioidprovidercontract",
                title: "Do you have a Pain Contract with this provider",
                visibleIf: "{Neckpaindoneyes} contains 'Medication'and {Neckpaindonemed} contains 'prescribed'and {Neckpaindoneprescribed} contains 'Opioid Medication' and {Neckpaindoneopioidprovider} = 'Yes'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "checkbox",
                name: "Neckpaindoneexercise",
                title: "What exercises have you done for your neck pain?",
                visibleIf: "{Neckpaindoneyes} contains 'Exercise'",
                isRequired: true,
                choices: [
                  "Self-mediated", "Physical Therapy", "Aqua-theropy", "Massage", "Chiropractics", "Traction", "Neck brace or collar", "TENS unit", "other"
                ]
              }, {
                name: "Neckpaindoneexercisephysical",
                type: "text",
                inputType: "date",
                title: "What is the starting date for physical exercise",
                visibleIf: "{Neckpaindoneyes} contains 'Exercise' and {Neckpaindoneexercise} contains 'Physical Therapy'",
                isRequired: true
              }, {
                name: "Neckpaindoneexercisechiro",
                type: "text",
                inputType: "date",
                title: "What is the starting date for Chiropractics",
                visibleIf: "{Neckpaindoneyes} contains 'Exercise' and {Neckpaindoneexercise} contains 'Chiropractics'",
                isRequired: true
              }, {
                type: "checkbox",
                name: "Neckpainprocesureyes",
                title: "What procedures have you done?",
                choices: [
                  "Injection", "Surgery"
                ]
              }, {
                type: "radiogroup",
                name: "Neckpainprocesureinjectionperform",
                title: "Is the injection prtformed by a doctor?",
                visibleIf: "{Neckpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "Neckpainprocesureinjectiondate",
                title: "What is the date of the injection?",
                inputType: "date",
                visibleIf: "{Neckpainprocesureyes} contains 'Injection'",
                isRequired: true,
              }, {
                type: "radiogroup",
                name: "Neckpainprocesureinjectiontype",
                title: "What is the type of the injection?",
                visibleIf: "{Neckpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Unknown", "Epidural steroid", "Facet joint or nerve block", "other"
                ]
              }, {
                type: "radiogroup",
                name: "Neckpainprocesureinjectionresult",
                title: "What is the result of the injection?",
                visibleIf: "{Neckpainprocesureyes} contains 'Injection'",
                isRequired: true,
                choices: [
                  "Better", "Worse", "No Change"
                ]
              }, {
                type: "radiogroup",
                name: "Neckpainprocesuresurgeryperform",
                title: "Is the surgery prtformed by a doctor?",
                visibleIf: "{Neckpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Yes", "No"
                ]
              }, {
                type: "text",
                name: "Neckpainprocesuresurgerydate",
                title: "What is the date of the surgery?",
                inputType: "date",
                visibleIf: "{Neckpainprocesureyes} contains 'Surgery'",
                isRequired: true,
              }, {
                type: "radiogroup",
                name: "Neckpainprocesuresurgerytype",
                title: "What is the type of the surgery?",
                visibleIf: "{Neckpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Unknown", "Discectomy", "Laminectomy", "Fusion", "other"
                ]
              }, {
                type: "radiogroup",
                name: "Neckpainprocesuresurgeryresult",
                title: "What is the result of the surgery?",
                visibleIf: "{Neckpainprocesureyes} contains 'Surgery'",
                isRequired: true,
                choices: [
                  "Better", "Worse", "No Change"
                ]
              }
            ]
          }, {
            "name": "page11",
            title: "Other Algorism",
            visibleIf: "{symptom} contains 'Other Algorism'",
            questions: [
              {
                name: "otheralgorismproblem",
                type: "text",
                title: "Describe the problem",
                isRequired: true
              }, {
                name: "otheralgorismlocation",
                type: "text",
                title: "Describe the location",
                isRequired: true
              }, {
                name: "otheralgorismduration",
                type: "text",
                title: "Duration- ## yr/mo/wk/d",
                placeHolder: "15 months",
                isRequired: true
              }, {
                name: "otheralgorismbetter",
                type: "text",
                title: "What makes it better",
                isRequired: true
              }, {
                name: "otheralgorismworse",
                type: "text",
                title: "What makes it worse",
                isRequired: true
              }
            ]
          }, {
            "name": "page12", //review of the system
            title: "review of the system",
            questions: [
              {
                name: "Reviewsymptom1",
                type: "checkbox",
                title: "Populate answer to above as needed",
                isRequired: true,
                choices: [
                  "Back pain", "Neck pain", "Hip pain", "Leg pain", "Arm pain", "Numbness", "Weakness", "Bowel change", "Bladder change"
                ]
              }, {
                name: "Reviewsymptom2",
                type: "checkbox",
                title: "Other stmptoms you have",
                isRequired: true,
                choices: [
                  "Headache", "Change in vision", "Change in hearing", "Difficulty swallowing",
                  "Difficulty breathing", "Shortness of breath", "Chest pain",
                  "Irregular heart beat", "Abdominal pain", "Seizure", "Skin rash", "Depression",
                  "Anxiety", "History of substance abuse"],
                colCount: 1

              }, {
                name: "Reviewsymptombreah",
                type: "checkbox",
                title: "Where is the shortness of breathing",
                visibleIf: "{Reviewsymptom2} contains 'Shortness of breath'",
                isRequired: true,
                choices: [
                  "With extension", "At rest"
                ]
              }
            ]
          },
        ]
      }
    }

  }


  finish(result) {
    console.log("posting...");
    console.log(JSON.stringify(result.data, null, 3));
    const r = {"result" : result.data}
    axios.post('http://localhost:5000/survey/add', r)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

  }

  render() {
    return (
      <Survey.Survey model={new Survey.Model(this.state.json)} onComplete={this.finish} />
    )
  }
}
