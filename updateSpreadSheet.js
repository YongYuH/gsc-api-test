import { google } from 'googleapis'
import moment from 'moment-timezone'

import { writeGoogleSheet } from './googleSheets/writeGoogleSheet.js'

const updateSpreadSheet = async ({
  siteUrl,
  spreadsheetId,
  sheetName,
}) => {
  const lastWeekStart = moment()
    .subtract(1, "weeks")
    .startOf("isoWeek")
    .format("YYYY-MM-DD")
  const lastWeekEnd = moment()
    .subtract(1, "weeks")
    .endOf("isoWeek")
    .format("YYYY-MM-DD")

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  })
  const gsc = await google.webmasters({ version: "v3", auth })

  let sheet = []
  sheet.push(["Clicks", "Impressions", "CTR"])

  let res = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: lastWeekStart,
      endDate: lastWeekEnd,
    },
  })

  let dataRow = []
  dataRow.push(res.data.rows[0].clicks)
  dataRow.push(res.data.rows[0].impressions)
  dataRow.push(res.data.rows[0].ctr)
  sheet.push(dataRow)

  try {
    await writeGoogleSheet(sheet, sheetName, spreadsheetId)
  } catch (error) {
    console.log(error)
  }
}

export { updateSpreadSheet }