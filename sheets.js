const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const DKCT = "DKCT'";

function extractDriveImageUrls(cellValue) {
  if (!cellValue) return [];
  return cellValue
    .split(',')
    .map(link => link.trim())
    .map(link => {
      const match = link.match(/[-\w]{25,}/);
      return match ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000` : '';
    })
    .filter(Boolean);
}

async function getMotels() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${DKCT}!A2:J`,
  });

  const rows = res.data.values || [];

  return rows
    .filter(row => row[2] && row[2].trim() !== '') // cột C = Mô tả phòng
    .map(row => {
      const images = extractDriveImageUrls(row[6]); // cột G = Ảnh phòng trọ

      return {
        MSP: row[1] || '',        // cột B
        Content: row[2] || '',    // cột C
        Loai: row[3] || '',       // cột D
        Gia: row[4] || '',        // cột E
        PhongTrong: row[5] || '', // cột F
        Hinh1: images[0] || '',
        Hinh2: images[1] || '',
        Hinh3: images[2] || '',
        Hinh4: images[3] || '',
        Hinh5: images[4] || '',
        Link: row[7] || '',       // cột H
        Map: row[8] || '',        // cột I
        Tinhtrang: row[9] || 'Còn Trống', // cột J
      };
    });
}

module.exports = { getMotels };