const entrys = require('../config.js').entrys;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const del = require('delete');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const config = require('../config/config.js');

module.exports = {
  copyFile(copyPath, toPath) {
    if (fs.existsSync(toPath)) {
      del.sync([toPath], {
        force: true
      });
    }

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

          const isImg = /.(jpeg|jpg|png|gif|psd|svg|woff|eot|ttf)$/g.test(filename);

          if (fstats.isFile()) {
            fs.readFile(path.join(copyPath, filename), isImg ? 'binary' : 'utf-8', (
              err, data) => {
              if (err) {
                throw err;
              }
              console.log('');
              console.log('copy ' + path.join(copyPath, filename) + ' to ' + path
                .join(toPath, filename));
              fs.writeFile(path.join(toPath, filename), data, {
                encoding: isImg ? 'binary' : 'utf-8'
              });
            });
          } else {
            this.copyFile(path.join(copyPath, filename), path.join(toPath, filename));
          }
        });
      });
    });
  },
  compareDll(filePath, output) {
    let version = {
      hash: '',
    };
    const options = {
      encoding: 'utf-8',
    };
    const venderPath = path.join(output, 'version.json');

    if (fs.existsSync(venderPath)) {
      version = JSON.parse(fs.readFileSync(venderPath, options));
    }

    const file = fs.readFileSync(filePath, options);
    const fileHash = md5(file);

    if (version.hash === fileHash) {
      return false;
    }
    version.hash = fileHash;

    this.delDll();
    fs.mkdirSync('.dll');

    fs.writeFileSync(venderPath, JSON.stringify(version), options);
    return true;
  },
  delDll() {
    del.sync(['.dll'], {
      force: true
    });
    console.log('\r\ndelete .dll complete\r\n');
  },
  delDist() {
    del.sync(['www'], {
      force: true
    });
    fs.mkdirSync('www');

    console.log('\r\ndelete ../www complete\r\n');
  },
  getName(p) {
    let name = p.split('/');

    name = name[name.length - 1].split('.')[0];

    return name;
  },
  htmls(isDev) {
    const plugins = [];

    entrys.forEach(v => {
      const htmlName = this.getName(v.html);
      const jsName = this.getName(v.js);
      const chunks = [jsName];

      if (isDev !== true) {
        chunks.push('vendor');
      }

      plugins.push(new HtmlWebpackPlugin({
        title: htmlName,
        minify: false,
        chunksSortMode(chunk1, chunk2) {
          var order = ['vendor', 'app'];
          var order1 = order.indexOf(chunk1.names[0]);
          var order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        },
        filename: v.outHtml || v.html,
        template: v.html,
        chunks,
        inject: 'body', // true | 'head' | 'body' | false
      }));
    });

    return plugins;
  },
  entrys(isDev) {
    let entry = {};

    entrys.forEach(v => {
      const jsName = this.getName(v.js);

      entry[jsName] = [v.js];

      if (isDev) {
        entry[jsName] = entry[jsName].concat([
          `webpack-dev-server/client?http://${config.host}:${config.port}/`,
          'webpack/hot/dev-server',
        ]);
      }
    });

    return entry;
  }
};
