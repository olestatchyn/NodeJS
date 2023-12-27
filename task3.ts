import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const csvFilePath = path.join(__dirname, './csvdirectory/example.csv');
const txtFilePath = path.join(__dirname, './csvdirectory/output.txt');

const readStream = fs.createReadStream(csvFilePath);
const jsonArray: any[] = [];

readStream
  .pipe(csv())
  .on('data', (data: Buffer) => {
    jsonArray.push(JSON.parse(data.toString('utf8')));
  })
  .on('error', (error: Error) => {
    console.error('Read error:', error);
  })
  .on('end', () => {
    fs.writeFile(txtFilePath, JSON.stringify(jsonArray, null, 2), (err) => {
      if (err) {
        console.error('Write error:', err);
      } else {
        console.log('Data written to file');
      }
    });
  });
