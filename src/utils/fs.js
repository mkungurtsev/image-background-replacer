const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkFileAsync = util.promisify(fs.unlink);

module.exports = {
  writeFile: async (path, content, callback) => {
    await writeFileAsync(path, content, callback);
  },

  removeFile: async (path) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`removeFile error: file ${path} doesn't exist...`);
    }
  },
};
