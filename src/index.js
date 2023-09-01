#!/usr/bin/env node

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import childProcess from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = path.join(__dirname, 'song.mp3');

const play = () => {
  if (!respawn) {
    return;
  }

  proc = childProcess.spawn(bin, args);
  proc.stdout.resume();
  proc.stderr.resume();
  proc.unref();
  proc.on('exit', play);

  if (process.argv[2]) {
    proc.stdout.unref();
    proc.stderr.unref();
    proc.stdin.unref();
  }
};

const has = (cmd) => {
  try {
    childProcess.execSync(`which ${cmd} 2>/dev/null 2>/dev/null`);
    return true;
  } catch (err) {
    return false;
  }
};

let bin = 'play';
let args = [FILENAME];

if (process.platform == 'darwin') {
  bin = 'afplay';
}

if (process.platform == 'win32') {
  bin = 'powershell';
  args = [
    '-c',
    'Add-Type -AssemblyName PresentationCore; ' +
      '$MediaPlayer = New-Object System.Windows.Media.Mediaplayer; ' +
      `$MediaPlayer.Open("${FILENAME}"); ` +
      '$MediaPlayer.Play(); ' +
      'Start-Sleep 273',
  ];
}

if (has('mplayer')) {
  bin = 'mplayer';
  args = ['-really-quiet', FILENAME];
}

let proc;
let respawn = true;

play();

if (process.argv[2]) {
  childProcess.spawn(process.argv[2], process.argv.slice(3), {
    stdio: 'inherit',
  });
}

process.on('exit', function () {
  respawn = false;
  proc.kill();
});
