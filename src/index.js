require('dotenv').config();
const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
// const addComic = require('./add-comic');
const addHomepage = require('./add-homepage');
// const addManifest = require('./add-manifest');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

// make public directory
if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

// copy static assets to /public
fs.copy(`${ config.dev.static }`, `${ config.dev.outDir }`);

let data = {}; // need to be able to export this to manifest.json for PWA. how? no idea just yet

const initialize = async (folderName) =>
{
  // fetch all images from  cloudinary
  Object.assign(
    data,
    await cloudinary.api.resources(
      {
        type: 'upload',
        prefix: folderName,
        max_results: 500, // the limit for a single call
        context: true // allows alt text to be fetched
      },
      function (error, result)
      {
        console.log(error);
      }
    )
  );
  await console.log(data.resources);
  await addHomepage(data.resources);
};

initialize('randogram');

module.exports = data;
