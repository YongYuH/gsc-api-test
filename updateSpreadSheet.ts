import { google } from 'googleapis'
import moment from 'moment-timezone'

import { writeGoogleSheet } from './googleSheets/writeGoogleSheet'

interface UpdateSpreadSheetArgs {
  siteUrl: string
  spreadsheetId: string
  sheetName: string
}

const updateSpreadSheet = async (args: UpdateSpreadSheetArgs) => {
  try {
    const { siteUrl, spreadsheetId, sheetName } = args
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
    const webmasters = google.webmasters({ version: "v3", auth })

    let sheet: any[][] = []
    sheet.push(["Clicks", "Impressions", "CTR"])

    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: lastWeekStart,
        endDate: lastWeekEnd,
      },
    })

    const firstRow = res?.data?.rows?.[0]
    if (firstRow) {
      let dataRow = []
      dataRow.push(firstRow.clicks)
      dataRow.push(firstRow.impressions)
      dataRow.push(firstRow.ctr)
      sheet.push(dataRow)
    }

    await writeGoogleSheet({ sheetName, spreadsheetId, values: sheet })
  } catch (error) {
    console.log(error)
  }
}

export { updateSpreadSheet }