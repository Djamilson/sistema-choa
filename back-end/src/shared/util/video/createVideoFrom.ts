import { spawn } from 'child_process';
//import Slides from 'slides-js';

async function createVideoFromPhrase(inputPhrase: any, outputVideo: any) {
  return new Promise(async (resolve:any, reject) => {
    // const slides = new Slides();
    //  slides.addText(inputPhrase);
    // const inputScript = await slides.render();
    //console.log('inputScript:', inputScript);
    const ffmpeg = spawn('ffmpeg', [
      '-f',
      'lavfi',
      '-i',
      `color=c=white:s=1920x1080:d=5`,
      '-vf',
      `drawtext=text='${inputPhrase}':fontsize=60:fontcolor=black:x=(w-text_w)/2:y=(h-text_h)/2`,
      '-c:v',
      'libx264',
      '-crf',
      '18',
      '-c:a',
      'aac',
      '-b:a',
      '128k',
      outputVideo,
    ]);

    ffmpeg.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    ffmpeg.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });

    ffmpeg.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}

export { createVideoFromPhrase };
