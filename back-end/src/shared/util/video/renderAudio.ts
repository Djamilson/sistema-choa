//import {} from 'child_process';

const exec = require('child_process').exec;

function renderAudio(narrative: any) {
  exec(
    `espeak "${narrative}" -w audio.wav`,
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    },
  );
}

export { renderAudio };
