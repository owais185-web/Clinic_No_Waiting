
/**
 * GOOGLE APPS SCRIPT: No-Wait Clinics Integration
 * This script serves as a simple webhook to append patient data from 
 * the Flutter/React frontend into a central Google Sheet for audit.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("ActiveQueue");
    
    // Append [Timestamp, Token, Name, Phone, Status, PaymentType]
    sheet.appendRow([
      new Date(),
      data.token,
      data.name,
      "'" + data.phone, // Ensure phone is treated as string
      "WAITING",
      data.paymentMethod
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "SUCCESS",
      message: "Token " + data.token + " recorded in Master Sheet"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "ERROR",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Clinic Logic')
      .addItem('Advance Queue', 'advanceQueue')
      .addItem('Trigger Emergency Delay', 'triggerDelay')
      .addToUi();
}
