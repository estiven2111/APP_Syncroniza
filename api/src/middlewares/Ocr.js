const Tesseract = require("tesseract.js");
const path = require("path");
const fs_extra = require("fs-extra");

const { Client } = require("@microsoft/microsoft-graph-client");
const fs = require("fs");

// const { createCanvas, loadImage } = require("canvas");
// const multer = require('multer')
const Ocr = async (req, res) => {
  // await fs_extra.unlink(`./Conversor-de-imagen-a-texto-en-Chrome (1).png`);
  const { img } = req.files;
  let imagen;
  let uploadPath;
  imagen = req.files.img;
  uploadPath = `uploads/${imagen.name}`;
  imagen.mv(`${uploadPath}`, (err) => {
    if (err) return res.status(500).send(err);
  });

  try {
    const { createWorker } = Tesseract;
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(`uploads/${imagen.name}`);
    await worker.terminate();
//   const inputText = `FIERRO 8 BURGER ESPERANZA
// NET/Doe: 1.121.944.208
// Lair.
// Tel. 3123022442
// Factura de venta: No. 12049
// Fecha Factura: 10/11/2022 08:39:38 p. m. :
// Cliente: craams
// Tipo de L scumpnio: NIT
// Nimero de Documento: 811007547-0
// D cior 3 40 #56-11 medellin
// Medic de pago: Elccl
// Atendide Par: MARTHA
// Mesa: Donucilios 1
// Cantidad UN Producto Precio fotal
// i Und. FAFA FRANCESA § 4.500 $ 4.500
// ! Und, DON JOSE $ 20.000 § 20.000
// VALOR A PAGAR:
// ) $24.500`;
//! EXPRESSIONES REGULARES
const regexNetDoe = /NET\/Doe:\s+(.+)/;
const regexFacturaVenta = /Factura de venta: No.\s+(.+)/;
const regexNumeroDocumento = /Nimero de Documento:\s+(.+)/;
// const regexValorAPagar = /VALOR A PAGAR:\)\s+\$(.+)/;
const regexValorAPagar = /\$([\d,.]+)/;
const regexNombre = /FIERRO 8 BURGER ESPERANZA/;

const matchNetDoe = text.match(regexNetDoe);
const matchFacturaVenta = text.match(regexFacturaVenta);
const matchNumeroDocumento = text.match(regexNumeroDocumento);
const matchValorAPagar = text.match(regexValorAPagar);
const matchNombre=text.match(regexNombre)

const netDoe = matchNetDoe ? matchNetDoe[1] : null;
const facturaVenta = matchFacturaVenta ? matchFacturaVenta[1] : null;
const numeroDocumento = matchNumeroDocumento ? matchNumeroDocumento[1] : null;
const valorAPagar = matchValorAPagar ? matchValorAPagar[1] : null;
const Nombre = matchNombre ? matchNombre[0] : null;
console.log(Nombre)
const obj = {
  netDoe,
  facturaVenta,numeroDocumento,valorAPagar,Nombre
}
console.log("NET/Doe:", netDoe);
console.log("Factura de venta: No.", facturaVenta);
console.log("Nimero de Documento:", numeroDocumento);
console.log("VALOR A PAGAR:) $", valorAPagar);
res.send(obj)
  } catch (error) {
    return res.send(error)
  }
  //console.log("sssssssssssssssssss", uploadPath);

  // imagen.mv(`${uploadPath}`, (err) => {
  //   if (err) return res.status(500).send(err);
  // });

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

  // try {
  //   // const { createWorker } = Tesseract;
  //   // const worker = await createWorker();
  //   // await worker.load();
  //   // await worker.loadLanguage("eng");
  //   // await worker.initialize("eng");
  //   // const {
  //   //   data: { text },
  //   // } = await worker.recognize(`src/middlewares/${imagen.name}`);
  //   // await worker.terminate();
  //   // const text1 = text
  //   // await fs_extra.unlink(`src/middlewares/${imagen.name}`);
  //   //     const pr = "PAGAR:20000"
  //   //       const regex = /PAGAR:(\d+)/;
  //   //     const match =  pr.matchAll(regex);
  //   // console.log(match,"regesssssssssssx",regex)
  //   //     if (match) {
  //   //       // El número se encuentra en el grupo de captura (índice 1)
  //   //       const numero = match[1];
  //   //       console.log("Número de saldo:", numero);
  //   //     } else {
  //   //       console.log("No se encontró un número de saldo");
  //   //     }
  //   //     res.send("text");
  // } catch (error) {
  //   res.send(error);
  // }
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

// const Ocr = async (req, res) => {
//   const { img } = req.files;
//   let imagen;
//   let uploadPath;
//   imagen = req.files.img;
//   uploadPath = `uploads/${imagen.name}`;
//   imagen.mv(`${uploadPath}`, (err) => {
//     if (err) return res.status(500).send(err);
//   });

//   const accessToken = "422ce85a-4ac3-4bc8-8429-c79ab5d86930";
//   const folderId = "folderId";
//   const imagePath = uploadPath;
//   const imageName = imagen.name;

//   try {
//     await getFoldersInOneDrive(accessToken);
//     res.send("finss");
//     return;
//   } catch (error) {
//     res.send(error);
//   }
//   uploadImageToOneDrive(accessToken, folderId, imagePath, imageName).catch(
//     (error) => {
//       console.error("Error al subir la imagen:", error);
//     }
//   );
// };

// async function getFoldersInOneDrive(accessToken) {
//   const client = Client.init({
//     authProvider: (done) => {
//       done(null, accessToken);
//     },
//   });

//   const response = await client.api("/me/drive/root/children").get();
//   console.log("eeeeeeeeeeeeeeeeeeeeeeeee", response);
//   if (response && response.value) {
//     console.log("Carpetas en OneDrive:", response.value);
//   } else {
//     console.error("Error al obtener las carpetas de OneDrive.");
//   }
// }

// async function uploadImageToOneDrive(
//   accessToken,
//   folderId,
//   imagePath,
//   imageName
// ) {
//   const client = Client.init({
//     authProvider: (done) => {
//       done(null, accessToken);
//     },
//   });

//   const content = fs.readFileSync(imagePath);

//   const response = await client
//     .api(`/me/drive/items/${folderId}/children`)
//     .post({
//       name: imageName,
//       content: content,
//     });
//   console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", response);
//   if (response && response.id) {
//     console.log("La imagen se ha subido correctamente a OneDrive.");
//   } else {
//     console.error("Error al subir la imagen a OneDrive.");
//   }
// }

module.exports = Ocr;
