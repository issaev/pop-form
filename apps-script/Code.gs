function doGet() {
  return HtmlService.createTemplateFromFile('Form').evaluate();
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
