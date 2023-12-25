// const https = require('https');

// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (response) => {
//  let data = '';

//  // A chunk of data has been received.
//  response.on('data', (chunk) => {
//    data += chunk;
//  });

//  // The whole response has been received. Print out the result.
//  response.on('end', () => {
//    console.log(JSON.parse(data).explanation);
//  });

// }).on('error', (error) => {
//  console.log("Error: " + error.message);
// });


// function getWeather(){
//   return new Promise(function(resolve, reject){

//   })
// }
// weather = getWeather();
// console.log(weather);








// const childProcess = require('child_process');

// const execProcess = (command) => {
//   childProcess.exec(command, (error, stdout, stderr) => {
//     // console.clear();
//     console.log(`${stdout}`);

//     if (error !== null || stderr !== null) {
//       console.log(`error: ${error}`);
//       console.log(`stderr: ${stderr}`);
//     }
//   });
// }

// execProcess("Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }");



const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

const command = os.platform() === 'win32' ? 'powershell.exe' : 'ps';
const args = os.platform() === 'win32'
  ? ["-Command", "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"]
  : ["-eo", "pid,%cpu,%mem,cmd", "--sort=-%cpu", "--no-headers"];

function execProcess(command, args, callback) {
  const child = spawn(command, args);

  let result = '';

  child.stdout.on('data', (data) => {
    result += data;
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    callback(result.trim());
  });
}

function logToFile(data) {
  const logFileName = 'activityMonitor.log';
  const logEntry = `${Date.now()} : ${data}\n`;

  fs.appendFile(logFileName, logEntry, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}

function execProcessCycle(func) {
  setInterval(() => {
    console.clear();
    func(command, args, (result) => {
      console.log(result);
    });
  }, 100);
}

setInterval(() => {
  execProcess(command, args, (result) => {
    logToFile(result);
  });
}, 60000);

execProcessCycle(execProcess);