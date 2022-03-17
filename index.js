import dotenv from 'dotenv'
import { updateSpreadSheet } from './updateSpreadSheet.js'

dotenv.config()

const main = async (req, res) => {
  const siteUrl = process.env.SITE_URL;
  const spreadsheetId = process.env.SHEET_ID;
  const sheetName = process.env.SHEET_NAME;

  await updateSpreadSheet({
    siteUrl,
    spreadsheetId,
    sheetName,
  });
};

main()