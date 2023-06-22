// 上传source-map
import { createReadStream, readdir } from 'fs';
import { resolve, extname } from 'path';
// import Http from 'http';
import Https from 'https';
import FormData from 'form-data';
const __dirname = resolve();

const directoryPath = resolve(__dirname, './dist/assets');

async function getMapFileName(directoryPath) {
  return new Promise((resolve, reject) => {
    readdir(directoryPath, (err, files) => {
      if (err) {
        console.log('Error getting directory information.');
        reject('Error getting directory information.');
      } else {
        const mapFiles = files.filter(
          (file) => extname(file).toLowerCase() === '.map',
        );
        if (mapFiles.length) {
          resolve(mapFiles[0]);
        }
      }
    });
  });
}

// 获取map文件
const mapFile = await getMapFileName(directoryPath);

const form = new FormData();
form.append('file', createReadStream(`${directoryPath}/${mapFile}`));

function createHeader() {
  return {
    headers: form.getHeaders(),
    // hostname: '127.0.0.1',
    hostname: 'api.jimmyxuexue.top',
    method: 'POST',
    path: '/catch/uploadfile',
    // port: 9999,
    rejectUnauthorized: false,
  };
}

function upload() {
  return new Promise((resolve, reject) => {
    const header = createHeader();
    // const req = Http.request(header, (res) => {
    const req = Https.request(header, (res) => {
      let str = '';
      res.on('data', (buffer) => {
        console.log('buffer');
        str += buffer;
      });
      res.on('end', () => {
        resolve(str);
      });
    });
    form.pipe(req);
    req.on('error', (error) => {
      console.error(error);
    });

    form.on('end', () => {
      req.end();
    });
  });
}

const res = await upload();

console.log('res', res);
