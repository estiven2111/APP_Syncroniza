// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const mime = require('mime');
// const request = require('request');
// const path = require('path');
// const requestPromise = require('request-promise');
// // const imagen = require("../routes/FACT2.jpeg")
// const msGraph = require('@microsoft/microsoft-graph-client');

// const SCOPES = ['offline_access', 'files.readwrite.all'];

//

// const authUpload = async(req, res) => {
//     // const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=offline_access%20Files.ReadWrite.All`
//     // res.redirect(authUrl);
//     const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPES.join(' ')}`;
//   res.redirect(authUrl);

// //todo miguel

// const uploadFiles = async (req, res) => {
//   //! aqui hacer la logica para que se seleccione el archivo de la carpeta deseada
//   const file = path.join(__dirname, "..", "routes", "imagenrender.png");
//   // const file = "../routes/FACT2.jpeg"; // Nombre del archivo que deseas subir desde tu PC local
//   const onedrive_folder =
//     "https://creameincubadora.sharepoint.com/Documentos%20compartidos/Forms/AllItems.aspx?id=%2FDocumentos%20compartidos%2FSampleFolder&p=true&ct=1689125125193&or=OWA%2DNT&cid=12a6e3c3%2Da44b%2Dd0d8%2Ddec2%2Db36a8a02075a&ga=1"; // Nombre de la carpeta en OneDrive
//   const onedrive_filename = path.basename(file); // Nombre del archivo en OneDrive
//   const authorizationCode = req.query.code;

//   request.post(
//     {
//       url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
//       form: {
//         redirect_uri: process.env.REDIRECT_URI,
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         code: authorizationCode,
//         grant_type: "authorization_code",
//       },
//     },
//     function (error, response, body) {
//       const accessToken = JSON.parse(body).access_token;

//       fs.readFile(file, function (err, data) {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         request.put(
//           {
//             url: `https://graph.microsoft.com/v1.0/drive/root:/${onedrive_folder}/${onedrive_filename}:/content`,
//             headers: {
//               Authorization: "Bearer " + accessToken,
//               "Content-Type": mime.getType(file),
//             },
//             body: data,
//           },
//           function (err, response, body) {
//             if (err) {
//               console.error(err);
//               return;
//             }
//             //   const downloadUrl = JSON.parse(body)['@microsoft.graph.downloadUrl'];
//             const accessUrl = JSON.parse(body)["webUrl"];
//             //   console.log('URL de descarga:', downloadUrl);
//             console.log("URL de acceso:", accessUrl);
//             //   res.send({downloadUrl, accessUrl});
//             res.send(accessUrl);
//           }
//         );
//       });
//     }
//   );
// };

// const uploadFiles = async (req, res) => {
//   const file = path.join(__dirname, '..', 'routes', 'imagenrender.png');
//   const onedrive_folder = '/drive/items/Eu74_dK1M35Oolvhbep29woBy6Hm9cuZGlH7Lj4sapDlcw';
// const onedrive_filename = path.basename(file);

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const tenantId = process.env.TENANT_ID;
//   const scope = 'https://graph.microsoft.com/.default';

//   const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

//   const authOptions = {
//     method: 'POST',
//     uri: authUrl,
//     form: {
//       client_id: clientId,
//       client_secret: clientSecret,
//       scope,
//       grant_type: 'client_credentials',
//     },
//     json: true,
//   };

//   try {
//     const authResponse = await requestPromise(authOptions);
//     const accessToken = authResponse.access_token;

//     const fileData = await fsPromises.readFile(file);
//     const uploadUrl = `https://graph.microsoft.com/v1.0${onedrive_folder}/${onedrive_filename}:/content`;

//     const uploadOptions = {
//       method: 'PUT',
//       uri: uploadUrl,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': mime.getType(file),
//       },
//       body: fileData,
//     };

//     await requestPromise(uploadOptions);

//     res.send('Archivo subido correctamente a tu carpeta en OneDrive.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al subir el archivo a tu carpeta en OneDrive.');
//   }
// };

// }

// const authUpload = async(req, res) => {
//   const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPES.join(' ')}`;
// res.redirect(authUrl);

// }

//  const uploadFiles = async (req,res) => {
//   const authCode = req.query.code;

//   try {
//     const tokenResponse = await msGraph.ClientCredentialAuthProvider.getToken({
//       clientID: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       scope: SCOPES,
//     });

//     const accessToken = tokenResponse.accessToken;

//     const client = msGraph.Client.init({
//       authProvider: (done) => {
//         done(null, accessToken);
//       },
//     });

//     const uploadResponse = await client.api('/me/drive/root:/path/to/upload/folder').putStream(req.file.buffer);

//     console.log('Archivo subido:', uploadResponse);

//     res.send('Archivo subido correctamente');
//   } catch (error) {
//     console.error('Error al subir el archivo:', error);
//     res.status(500).send('Error al subir el archivo');
//   }
//  }

// const authUpload = async (req, res) => {
//   const file = path.join(__dirname, '..', 'routes', 'MASCOTAS.jpg');
//   const onedrive_folder = '/drive/items/Eu74_dK1M35Oolvhbep29woBy6Hm9cuZGlH7Lj4sapDlcw';
//   const onedrive_filename = path.basename(file);

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const tenantId = process.env.TENANT_ID;
//   const scope = 'https://graph.microsoft.com/.default';

//   const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

//   const authOptions = {
//     method: 'POST',
//     url: authUrl,
//     data: new URLSearchParams({
//       client_id: clientId,
//       client_secret: clientSecret,
//       scope,
//       grant_type: 'client_credentials',
//     }),
//     headers: {
//       'Content-Type': 'application/octet-stream',
//     },
//   };
// //'Content-Type': 'application/octet-stream'
// //'Content-Type': 'application/x-www-form-urlencoded'

//   try {
//     const authResponse = await axios(authOptions);
//     const accessToken = authResponse.data.access_token;

//     const fileData = fs.readFileSync(file);
//     const uploadUrl = `https://graph.microsoft.com/v1.0${onedrive_folder}/${onedrive_filename}:/content`;

//     const uploadOptions = {
//       method: 'PUT',
//       url: uploadUrl,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': mime.getType(file),
//       },
//       data: fileData,
//     };

//     await axios(uploadOptions);

//     res.send('Archivo subido correctamente a tu carpeta en OneDrive.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al subir el archivo a tu carpeta en OneDrive.');
//   }
// };

// const authUpload = async (req, res) => {
//   const file = path.join(__dirname, '..', 'routes', 'MASCOTAS.jpg');
//   const onedrive_folder = '/drive/items/Eu74_dK1M35Oolvhbep29woBy6Hm9cuZGlH7Lj4sapDlcw';
//   const onedrive_filename = path.basename(file);

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const tenantId = process.env.TENANT_ID;
//   const redirectUri = process.env.REDIRECT_URI;
//   const scope = 'https://graph.microsoft.com/.default';

//   // const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

//   // const authOptions = {
//   //   method: 'POST',
//   //   url: authUrl,
//   //   data: new URLSearchParams({
//   //     client_id: clientId,
//   //     client_secret: clientSecret,
//   //     scope,
//   //     grant_type: 'client_credentials',
//   //     redirect_uri: redirectUri,
//   //   }),
//   //   headers: {
//   //     'Content-Type': 'application/x-www-form-urlencoded',
//   //   },
//   // };

//   // try {
//   //   const authResponse = await axios(authOptions);
//   //   const accessToken = authResponse.data.access_token;

//   //   const fileData = fs.readFileSync(file);
//   //   const uploadUrl = `https://graph.microsoft.com/v1.0${onedrive_folder}/${onedrive_filename}:/content`;

//   //   const uploadOptions = {
//   //     method: 'PUT',
//   //     url: uploadUrl,
//   //     headers: {
//   //       Authorization: `Bearer ${accessToken}`,
//   //       'Content-Type': mime.getType(file),
//   //     },
//   //     data: fileData,
//   //   };

//   //   await axios(uploadOptions);

//   //   res.send('Archivo subido correctamente a tu carpeta en OneDrive.');
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).send('Error al subir el archivo a tu carpeta en OneDrive.');
//   // }

//   const fileData = fs.readFileSync(filePath);

//   try {
//     const response = await axios.put(uploadUrl, fileData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/octet-stream',
//       },
//     });

//     console.log('Archivo subido correctamente');
//     console.log('Respuesta:', response.data);
//   } catch (error) {
//     console.error('Error al subir el archivo:', error.response.data);
//   }
// };
require("dotenv").config();
const msGraph = require("msgraph-sdk-javascript");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const msal = require("@azure/msal-node");


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TENANT_ID = process.env.TENANT_ID;
 const SCOPES = ["https://graph.microsoft.com/.default"];
//  const SCOPES = ['offline_access', 'files.readwrite.all'];
const onedrive_folder_url =
  "https://creameincubadora-my.sharepoint.com/:f:/g/personal/simerp1_creame_com_co/Eo9hZL4U8-hLjKjmJXs5AoYBiwXDqmM8jV71L090fWRn4g?e=rD1p7P";

// Extraer el ID de la carpeta compartida de la URL
const sharedFolderId = onedrive_folder_url.split("/g/")[1].split("/")[0];
const file = path.join(__dirname, "..", "routes", "MASCOTAS.jpg");
const onedrive_folder = `/drive/items/${sharedFolderId}`;


const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

// Crear una instancia del cliente de MSAL
const cca = new msal.ConfidentialClientApplication(msalConfig);

const authUpload = async (req, res) => {
      // const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPES.join(' ')}`;
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=offline_access%20Files.ReadWrite.All`;
  // const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=online_access%20Files.ReadWrite.All`;
  res.redirect(authUrl);
};
const uploadFiles = async (req, res) => {
 

  try {
    // Obtener un token de acceso usando el flujo de autenticación "client_credentials"
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: SCOPES.join(" "),
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;


    const client = msGraph.Client.init({
      defaultVersion: "beta",
      debugLogging: true,
      authProvider: (done) => {
        done(null, accessToken);
      },
    });




    // Leer el archivo desde el sistema de archivos
    const imageBuffer = fs.readFileSync(file);
console.log(imageBuffer)
    // Subir el archivo a OneDrive
    const uploadResponse = await client
    .api(`${onedrive_folder}/filename.jpg/content`)
    .headers({
      "Content-Type": "application/json",
    })
    .put(imageBuffer);

    console.log("Archivo subido:", uploadResponse);

    // Hacer algo con el resultado de la subida...

    res.send("Archivo subido correctamente");
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).send("Error al subir el archivo");
  }
};

// async function getToken() {
//   try {
//     let SCOPES = ["https://graph.microsoft.com/.default"];
//     // Obtener el token de acceso
//     const tokenResponse = await cca.acquireTokenByClientCredential({
//       SCOPES,
//     });

//     // Retornar el token de acceso
//     return tokenResponse.accessToken;
//   } catch (error) {
//     console.log("Error al obtener el token de acceso:", error);
//     throw error;
//   }
// }

module.exports = { authUpload, uploadFiles };

// const formData = new FormData();
// formData.append("file", YOUR_IMAGE_BUFFER_OR_PATH, "yourimage.jpg");

// await axios.post(uploadUrl, formData, {
//     headers: {
//         Authorization: `Bearer ${accessToken}`,
//         ...formData.getHeaders(),
//     },
// });
