import { google } from 'googleapis'

/** ref: https://github.com/Zrce/gsc-api-test-video/blob/main/googleSheets/writeGoogleSheet.js */
const writeGoogleSheet = async (arr, sheetName, spreadsheetId) => {
  let res = []

  try {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
    const sheets = await google.sheets({ version: 'v4', auth })

    const values = arr

    const resource = {
      values,
    }

    try {
      const resp = await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: sheetName,
        valueInputOption: 'RAW',
        resource,
      })
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }

  return res
}

export { writeGoogleSheet }