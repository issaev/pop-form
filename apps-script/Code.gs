function doGet(e) {
  var page = e && e.parameter.page === 'manager' ? 'Manager' : 'Form';
  return HtmlService.createTemplateFromFile(page).evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function handleForm(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Form');
  }
  sheet.appendRow([
    data.missionId,
    data.mapLink,
    data.leadName,
    data.leadPhone,
    data.lead2,
    data.clubs,
    data.missionType,
    (data.risk || []).join(', '),
    data.riskOtherText,
    data.description,
    data.rallyLocation,
    data.rallyDateTime,
    data.stateContact,
    data.radio,
    data.duration,
    data.weather,
    data.medical,
    data.evac,
    data.equipment,
    data.attachment,
    new Date()
  ]);
  return 'OK';
}

function getSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Form');
  }
  return sheet;
}

function listRecords() {
  var sheet = getSheet();
  var last = sheet.getLastRow();
  var records = [];
  for (var i = 1; i <= last; i++) {
    var missionId = sheet.getRange(i, 1).getValue();
    records.push({ row: i, missionId: missionId });
  }
  return records;
}

function getRecord(row) {
  var sheet = getSheet();
  var values = sheet.getRange(row, 1, 1, 21).getValues()[0];
  return {
    missionId: values[0],
    mapLink: values[1],
    leadName: values[2],
    leadPhone: values[3],
    lead2: values[4],
    clubs: values[5],
    missionType: values[6],
    risk: (values[7] || '').split(/,\s*/),
    riskOtherText: values[8],
    description: values[9],
    rallyLocation: values[10],
    rallyDateTime: values[11],
    stateContact: values[12],
    radio: values[13],
    duration: values[14],
    weather: values[15],
    medical: values[16],
    evac: values[17],
    equipment: values[18],
    attachment: values[19],
    timestamp: values[20]
  };
}

function updateRecord(data) {
  var sheet = getSheet();
  var row = Number(data.row);
  var values = [
    data.missionId,
    data.mapLink,
    data.leadName,
    data.leadPhone,
    data.lead2,
    data.clubs,
    data.missionType,
    (data.risk || []).join(', '),
    data.riskOtherText,
    data.description,
    data.rallyLocation,
    data.rallyDateTime,
    data.stateContact,
    data.radio,
    data.duration,
    data.weather,
    data.medical,
    data.evac,
    data.equipment,
    data.attachment,
    sheet.getRange(row, 21).getValue()
  ];
  sheet.getRange(row, 1, 1, values.length).setValues([values]);
  return 'OK';
}

function exportRecordPdf(row) {
  var data = getRecord(row);
  var doc = DocumentApp.create('POP Record ' + data.missionId);
  var body = doc.getBody();
  for (var key in data) {
    body.appendParagraph(key + ': ' + data[key]);
  }
  doc.saveAndClose();
  var pdf = DriveApp.getFileById(doc.getId()).getBlob();
  DriveApp.getFileById(doc.getId()).setTrashed(true);
  return Utilities.base64Encode(pdf.getBytes());
}
