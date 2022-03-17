import dotenv from 'dotenv'
import { runWithSpreadSheetId } from './runWithSpreadSheetId.js'

dotenv.config()

const main = async (req, res) => {
  const spreadsheetId = process.env.SHEET_ID;
  await runWithSpreadSheetId(spreadsheetId);
};

main()