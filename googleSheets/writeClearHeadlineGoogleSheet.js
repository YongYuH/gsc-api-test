import { google } from 'googleapis'

/** ref: https://github.com/Zrce/gsc-api-test-video/blob/main/googleSheets/writeGoogleSheet.js */
const writeClearHeadlineGoogleSheet = async (arr, sheetName, spreadsheetId) => {
    let res = []
  
    try {
      const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
      const sheets = await google.sheets({ version: 'v4', auth })
  
      try {
        const resp = await sheets.spreadsheets.values.clear({
          spreadsheetId: spreadsheetId,
          range: sheetName
        })
      } catch (error) {
        console.log(error)
      }
  
      const values = [arr]
  
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

export { writeClearHeadlineGoogleSheet }