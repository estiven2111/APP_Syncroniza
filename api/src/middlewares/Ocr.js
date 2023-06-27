const Tesseract = require("tesseract.js");
const path = require("path");
const fs_extra = require("fs-extra");
const { createCanvas, loadImage } = require("canvas");
// const multer = require('multer')
const Ocr = async (req, res) => {
  // await fs_extra.unlink(`./Conversor-de-imagen-a-texto-en-Chrome (1).png`);
  let imagen;
  let uploadPath;
  imagen = req.files.imagen;
  uploadPath = `src/middlewares/${imagen.name}`; //? uploads que estatica por ende se van aguardar ahi ruta uploads/nom
  console.log(imagen);
  //console.log("sssssssssssssssssss", uploadPath);

  imagen.mv(`${uploadPath}`, (err) => {
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

  try {
    const { createWorker } = Tesseract;

    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(`src/middlewares/${imagen.name}`);

    await worker.terminate();
    // await fs_extra.unlink(`src/middlewares/${imagen.name}`);
    //   const regex = /saldo:(\d+)/;
    // const match = data.text.match(regex);

    // if (match) {
    //   // El número se encuentra en el grupo de captura (índice 1)
    //   const numero = match[1];
    //   console.log("Número de saldo:", numero);
    // } else {
    //   console.log("No se encontró un número de saldo");
    // }
    res.send(text);
  } catch (error) {
    res.send(error);
  }
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
