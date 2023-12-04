function onFormSubmit(formResponseSheet) {
  try {
    var leadIdColumn = 3; // Column index for LeadID
    var agentColumn = 4; // Column index for Agent
    var managerColumn = 5; // Column index for Manager
    var agentEmailColumn = 6; // Column index for Agent's email
    var managerEmailColumn = 7; // Column index for Manager's email

  var formResponseSheetName = "Expired Leads";
  var formResponseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(formResponseSheetName);

  var lastRow = formResponseSheet.getLastRow();
  var leadId = formResponseSheet.getRange(lastRow, leadIdColumn).getValue();
  var agent = formResponseSheet.getRange(lastRow, agentColumn).getValue();
  var manager = formResponseSheet.getRange(lastRow, managerColumn).getValue();
  var agentEmail = formResponseSheet.getRange(lastRow, agentEmailColumn).getValue();
  var managerEmail = formResponseSheet.getRange(lastRow, managerEmailColumn).getValue();

  if(!agentEmail || !managerEmail) {
    throw new Error('invalid email address found.');
  }
  var emailSubject = "Expired Lead";
  var emailBody = "Dear " + agent + ",<br><br>" +
    "The following lead was placed back into your PQ, as it was expired.<br><br>" +
    leadId + "<br><br>" +
    "Please complete or ENC, and status accordingly. For a refresher on how to properly status to avoid expired leads in the future, please see <a href='LinkToStatusingDocument'>this statusing presentation</a>.<br><br>" +
    "THIS IS AN AUTOMATED EMAIL. PLEASE DO NOT RESPOND TO THIS EMAIL. If you have any questions about this, please reach out to your manager.<br><br>" +
    "Thank you!";

  // Send email to the agent with manager cc'd
  MailApp.sendEmail({
    to: agentEmail,
    cc: managerEmail,
    subject: emailSubject,
    htmlBody: emailBody
  });
} catch (error) {
    // Log the error and alert an admin 
    Logger.log(error.message);
    var adminEmail = "admin@company.com"
    MailApp.sendEmail(adminEmail, 'Script Error Notification', error.message);
  }
}
