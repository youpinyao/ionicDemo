const path = require('path');
const fs = require('fs');
const config = require('../config/config.js');
const cheerio = require('cheerio');

const buildPath = path.resolve(__dirname, config.path);

module.exports = function() {
  fs.readdir(buildPath, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach(filename => {
      fs.stat(path.join(buildPath, filename), (ferr, fstats) => {
        if (ferr) {
          throw ferr;
        }

        if (fstats.isFile()) {
          if (filename.indexOf('.html') !== -1) {
            convertFile(path.join(buildPath, filename));
          }
        }
      });
    });
  });

  function copyFile(copyPath, toPath) {
    fs.mkdirSync(toPath);
    fs.readdir(copyPath, (err, files) => {
      if (err) {
        throw err;
      }

      files.forEach(filename => {
        fs.stat(path.join(copyPath, filename), (ferr, fstats) => {
          if (ferr) {
            throw ferr;
          }

          const isImg = /.(jpeg|jpg|png|gif|psd)$/g.test(filename);

          if (fstats.isFile()) {
            fs.readFile(path.join(copyPath, filename), isImg ? 'binary' : 'utf-8', (
              err, data) => {
              if (err) {
                throw err;
              }
              console.log('copy ' + path.join(copyPath, filename) + ' to ' + path
                .join(toPath, filename));
              fs.writeFile(path.join(toPath, filename), data, {
                encoding: isImg ? 'binary' : 'utf-8'
              });
            });
          } else {
            copyFile(path.join(copyPath, filename), path.join(toPath, filename));
          }
        });
      });
    });
  }

  function convertFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }

      const $ = cheerio.load(data, {
        decodeEntities: false
      });

      const replaceAttrs = ['href', 'src', 'data-src'];

      $('link, script, img, video, audio, div[data-src]').each(function() {
        replaceAttrs.forEach(d => {
          const attr = $(this).attr(d);

          if (attr && !/base64/g.test(attr)) {
            const nAttr = attr.replace(/\.\.\//g, './');

            $(this).attr(d, nAttr);

            console.log(attr, 'to', nAttr);
            console.log('----------');
          }
        });
      });

      fs.writeFile(filePath, $.html(), {
        encoding: 'utf-8'
      });

    });
  }
};