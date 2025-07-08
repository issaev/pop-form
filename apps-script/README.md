# Google Apps Script Web App

This folder contains a minimal example of using **HtmlService.createTemplateFromFile** to serve the POP form directly from Google Apps Script and store results in a Google Sheet.

## Setup

1. Open a new or existing Google Spreadsheet.
2. Select **Extensions → Apps Script** to open the script editor.
3. Create the following files in the Apps Script project:
   - **Code.gs** – server side logic (see `Code.gs` in this folder).
   - **Form.html** – POP submission form.
   - **Manager.html** – page for browsing and editing existing records.
4. Deploy the project as a **Web App** (Deploy → New deployment → Select "Web app").
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Open the provided URL to view the form. Submissions are appended to the spreadsheet.

The form uses `google.script.run` to call the `handleForm` function, so no extra CORS configuration is required.
