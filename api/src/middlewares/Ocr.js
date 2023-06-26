const Tesseract = require("tesseract.js");
const path = require("path");
const fs_extra = require("fs-extra");
// const multer = require('multer')
const Ocr = async (req, res) => {
  // await fs_extra.unlink(`./Conversor-de-imagen-a-texto-en-Chrome (1).png`);
  let imagen;
  let uploadPath;
  imagen = req.files.imagen;
  uploadPath = `${imagen.name}`; //? uploads que estatica por ende se van aguardar ahi ruta uploads/nom
  console.log(imagen);
  console.log("sssssssssssssssssss", uploadPath);
  res.send("enviado")
  return
  imagen.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
  });

  // const storage = multer.diskStorage({
  //     destination: function (req, file, cb) {
  //         cb(null, 'uploads')
  //     },
  //     filename: function (req, file, cb) {
  //         cb(null, `${Date.now()}-${file.originalname}`)
  //     }
  // })

  // const upload = multer({ storage: storage })

  // exports.upload = upload.single('myFile')

  // exports.uploadFile = (req, res) => {
  //     res.send({ data: 'Enviar un archivo' })
  // }

  //   const image = path.resolve(
  //     __dirname,
  //     (`../../../${imagen.name}`)
  //   );

  const { createWorker } = Tesseract;

  const worker = await createWorker();

  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);

  await worker.terminate();

  res.send(text);
  // todo esto es otro

  //   const { createWorker, PSM } = Tesseract;

  //   const worker = await createWorker();

  //   await worker.loadLanguage("eng");
  //   await worker.initialize("eng");
  //   await worker.setParameters({
  //     tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  //   });
  //   const {
  //     data: { text },
  //   } = await worker.recognize(`../../uploads/${imagen.name}`);
  //   console.log(text);
  //   await worker.terminate();
  //   return
  //   let text;
  //   Tesseract.recognize("./tese.png", "eng", {
  //     logger: (e) => console.log(""),
  //   }).then((out) => {
  //     {
  //       text = out.data.text;
  //     }
  //   });

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
  //   res.send(text);
};

module.exports = Ocr;
