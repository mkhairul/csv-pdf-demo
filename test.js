const HTML5ToPDF = require("html5-to-pdf")
const path = require("path")

const run = async () => {
  const html5ToPDF = new HTML5ToPDF({
    options: {
        landscape: true
    },
    inputPath: path.join(__dirname, "src", "index.html"),
    outputPath: path.join(__dirname, "output.pdf"),
    //templatePath: path.join(__dirname, "templates", "basic"),
    include: [
      path.join(__dirname, "src", "css", "bootstrap.min.css"),
      path.join(__dirname, "src", "css", "custom.css"),
    ],
  })

  //console.log(html5ToPDF);
  //process.exit();

  await html5ToPDF.start()
  await html5ToPDF.build()
  await html5ToPDF.close()
  console.log("DONE")
  process.exit(0)
}

try {
    run()
  } catch (error) {
    console.error(error)
  }