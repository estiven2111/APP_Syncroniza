const async = require("async");
const fs = require("fs");
const path = require("path");
const sleep = require("util").promisify(setTimeout);
const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

const key = "292641e03431470eb7f5c30132318dd7";
const endpoint = "https://erpocr.cognitiveservices.azure.com";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

function Ocr(req, res) {
  const { imagen } = req.files;
  console.log(imagen);
  let imgs;
  let uploadPath;
  imgs = req.files.imagen;
  uploadPath = `uploads/${imgs.name}`;
  imgs.mv(`${uploadPath}`, (err) => {
    if (err) return res.status(500).send(err);
  });

  const imagePath = uploadPath;
  const imageBuffer = fs.readFileSync(uploadPath);
  let texto = [
    {
      name: "",
      num: 0,
    },
  ];
  let cont = 0;
  async.series(
    [
      async function () {
        console.log("-------------------------------------------------");
        console.log("READ PRINTED, HANDWRITTEN TEXT AND PDF");
        console.log();

        console.log(
          "Read printed text from local file:",
          imagePath.split("/").pop()
        );
        const printedResult = await readTextFromStream(
          computerVisionClient,
          imageBuffer
        );
        printRecText(printedResult);

        async function readTextFromStream(client, image) {
          let result = await client.readInStream(image);
          let operation = result.operationLocation.split("/").slice(-1)[0];

          while (result.status !== "succeeded") {
            await sleep(1000);
            result = await client.getReadResult(operation);
          }
          return result.analyzeResult.readResults;
        }

        async function printRecText(readResults) {
          console.log("Recognized text:");

          for (const page in readResults) {
            if (readResults.length > 1) {
              console.log(`==== Page: ${page}`);
            }
            const result = readResults[page];
            if (result.lines.length) {
              for (const line of result.lines) {
                // line.words.map((w) =>{

                //   texto.push({
                //     name:w.text,
                //     num:cont++
                //   })
                // })

                texto.push({
                  name: line.words.map((w) => w.text).join("  "),
                  num: cont++,
                });
                // console.log( line.words.map((w) => w.text).join(" "));
              }
            } else {
              console.log("No recognized text.");
            }
          }
          // await fs.unlink(uploadPath);
        }
      },
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al procesar la imagen" });
      } else {
        console.log(texto);
        res.json(texto);
      }
    }
  );
}

module.exports = Ocr;
