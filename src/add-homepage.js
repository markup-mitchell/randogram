const config = require('./config')
const fs = require('fs')

const homepage = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${ config.description }" />
        <title>${ config.siteName }</title>
        <link rel="stylesheet" href="style.css"/>
        <meta name="apple-mobile-web-app-status-bar" content="#333"/>
        <meta name="theme-color" content="#333"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">
    </head>
    <body>
        <main class='p4'>
          <div class="gallery">
            <div class="gallery__item">
              <h1 class="title">Randogram</h1>
            </div>
              ${ data.map((imgObj) => {
                  return `
                  <article class="gallery__item">
                    <header></header>
                    <figure>
                      <img class="photo" src="${ imgObj.url }" alt="" loading="lazy"/>
                    </figure>
                    </article>
                    `
                  }).reverse().join('')
                }
            </div>
        </main>
        <!-- empty script tag (must include space) is to resolve a chrome bug that fires CSS transitions on page load -->
        <script> </script>  <!-- needed with script below? -->
        <script src="./app.js"></script>
    </body>
</html>
`

const addHomepage = (data) =>
{
  fs.writeFile(`${ config.dev.outDir }/index.html`, homepage(data), (err) =>
  {
    if (err) throw err
    console.log(`index.html was created successfully`)
  })
}

module.exports = addHomepage
