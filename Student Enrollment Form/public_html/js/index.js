

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "SCHOOL-DB";
var stdRelationName = "STUDENT-TABLE";
var connToken = "90931444|-31949324937321833|90950083";


$("#rollNo").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getRollNoAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        id: rollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#rollNo").val(record.id);

    $("#fullName").val(record.name);
    $("#stdclass").val(record.stdclass);
    $("#birthDate").val(record.birthDate);
    $("#address").val(record.address);
    $("#enrollmentDate").val(record.enrollmentDate);
}




// Function to reset the form
function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#stdclass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollNo").focus();
}

function validateData() {

    var rollNo, fullName, stdclass, birthDate, address, enrollmentDate;
    rollNo = $("#rollNo").val();
    fullName = $("#fullName").val();
    stdclass = $("#stdclass").val();
    birthDate = $("#birthDate").val();
    address = $("#address").val();
    enrollmentDate = $("#enrollmentDate").val();


    if (rollNo === "") {
        alert("Student's Rollno missing");
        $("#rollNo").focus();
        return "";
    }
    if (fullName === "") {
        alert("Student's FullName missing");
        $("#fullName").focus();
        return "";
    }
    if (stdclass === "") {
        alert("Student's class  missing");
        $("#stdclass").focus();
        return "";
    }
    if (birthDate === "") {
        alert("HRA missing");
        $("#birthDate").focus();
        return "";
    }
    if (address === "") {
        alert("Address missing");
        $("#address").focus();
        return "";
    }
    if (enrollmentDate === "") {
        alert("EnrollmentDate  missing");
        $("#enrollmentDate").focus();
        return;
    }

    var jsonStrObj = {
        id: rollNo,
        name: fullName,
        stdclass: stdclass,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}



function getStd() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);

 if ($("#rollNo").val() === "") {
        $("#save").prop("disabled", true);
        $("#reset").prop("disabled", true);
        return;
    }

    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullName").focus();
    } else if (resJsonObj.status === 200) {

        $("#rollNo").prop("disabled", true);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullName").focus();


    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    resetForm();
    $("#rollNo").focus();


}

function updateData() {
    $("#update").prop("disabled", true);
    jsonChg = validateData();

    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollNo").focus();


}



