const Tesseract = require("tesseract.js")
const Ocr = async (req,res) => {
    
    console.log(req.files)
    res.send("imagen")
    return
const { createWorker, PSM } = require('tesseract.js');

const worker = await createWorker();

await worker.loadLanguage('eng');
await worker.initialize('eng');
await worker.setParameters({
  tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
});
const { data: { text } } = await worker.recognize('./tesseract.png');
console.log(text);
await worker.terminate();

// (async () => {
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   await worker.setParameters({
//     tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
//   });
//   const { data: { text } } = await worker.recognize('./tesseract.png');
//   console.log(text);
//   await worker.terminate();
// })();
res.send(text)
}

module.exports = Ocr