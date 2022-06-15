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
    </head>
    <body>
        <main class='p4'>
            <header>
                <!-- <h1>${ config.siteName }</h1> -->
            </header>

            <ul class="gallery">
                ${ data.map((imgObj) =>
{
  return `<li class="gallery__item"><img class="photo" src="${ imgObj.url }" alt="" loading="lazy"/></li>`
}
).reverse().join('') }
            </ul>
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
