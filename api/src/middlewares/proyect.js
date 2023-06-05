const { Op } = require("sequelize");
const { Proyect, Componet, Activity, sequelize } = require("../db");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./local-storage");
const proyect = async (req, res) => {
  const { proyect, description } = req.body;

  await Proyect.create({ proyect, description });

  res.send("ok");
};

const componet = async (req, res) => {
  const { componet, proy_id } = req.body;
  const proy = await Componet.create({ componet });
  proy.setProyect(proy_id);

  res.send(proy);
};

const activity = async (req, res) => {
  const { activity, description, com_id } = req.body;
  const acti = await Activity.create({ activity, description });
  acti.setComponet(com_id);

  res.json(acti);
};

const getComponet = async (req, res) => {
  //   const cons = await Activity.findAll({
  //     include:Componet
  //   });
  // const cons = await Proyect.findAll({
  //     include: Componet
  //   });
  // todo esta consulta si sirve para enviar todos los proyector
  // const conse = await Proyect.findAll({
  //   include: {
  //     model: Componet,
  //     include: Activity,
  //   },
  // });
  const user = JSON.parse(localStorage.getItem("user"));
  // SELECT idNodoProyecto FROM TBL_SER_ProyectoActividadesEmpleados where N_DocumentoEmpleado = '1016029114'
  // todo *************************************
  const idnodo = await sequelize.query(
    `SELECT idNodoProyecto FROM TBL_SER_ProyectoActividadesEmpleados where N_DocumentoEmpleado = ${user.Doc_id} `
  );
  let results;
  let proyect;
  // let nodo_padre = idnodo[0].map(async (nodo) => {
  //    proyect = await sequelize.query(
  //     `select * from TBL_SER_PROYECTOS where SKU IN ( SELECT distinct(SKU_Proyecto)
  //      FROM TBL_SER_ProyectoActividadesEmpleados
  //     where N_DocumentoEmpleado = ${user.Doc_id} and idNodo = ${nodo.idNodoProyecto} ) order by sku,idNodo`
  //   );
  //   return {
  //     user: "proyect"
  //   }
  //   // console.log(proyect[0][0])
  //   //  return proyect[0][0]
  //   // console.log(proyect[0][0])
  // });
  let obj_proyecto = {
    proyecto: "",
    componente: "",
    actividad: "",
  };

  let con = 0;
  // let nodo_padre = await Promise.all(
  //   idnodo[0].map(async (nodo) => {
  //     // Consulta modificada con marcadores de posición
  //     let proyect = await sequelize.query(
  //       `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${nodo.idNodoProyecto}) ORDER BY sku, idNodo`,
  //       { replacements: { docId: user.Doc_id } }
  //     );
  //     let idPadre = proyect[0][0].idPadre;
  //     let nombre = proyect[0][0].Nombre;
  //     let tipoParte;
  //     let Parte = idPadre;
  //     console.log("proyecto numero, ",con++,"  ",proyect[0][0])
  //     do {
  //       tipoParte = await sequelize.query(
  //         `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${Parte}) ORDER BY sku, idNodo`,
  //         { replacements: { docId: user.Doc_id } }
  //       );
  //       Parte = tipoParte[0][0].idPadre;

  //       console.log("parte numero, ",con++,"  ",tipoParte[0][0]);
  //     } while (tipoParte[0][0].TipoParte !== "Cabecera");

  //     // res.json("hola")
  //     // if (idPadre !== 0) {
  //     //   switch (proyect[0][0].TipoParte) {
  //     //     case "PP":
  //     //       obj_proyecto = {
  //     //         ...obj_proyecto,
  //     //         componente: nombre,
  //     //       };
  //     //     case "Actividad":
  //     //       let tipoParte = await sequelize.query(
  //     //         `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${idPadre}) ORDER BY sku, idNodo`,
  //     //         { replacements: { docId: user.Doc_id } }
  //     //       );
  //     //       obj_proyecto = {
  //     //         ...obj_proyecto,
  //     //         actividad: nombre,
  //     //       };
  //     //     default:
  //     //       break;
  //     //   }
  //     // }

  //     // if (idPadre === 0) {
  //     //   obj_proyecto = {
  //     //     ...obj_proyecto,
  //     //     proyecto: nombre,
  //     //   };
  //     //   return;
  //     // }

  //     // if (proyect[0][0].TipoParte === "Actividad") {
  //     // }
  //     // console.log(idPadre);
  //     // let prt = obj_proyecto;
  //     // return {
  //     //   ...prt,
  //     //   prt,
  //     // };
  //   })
  // );

  // let obj_proyecto = {
  //   proyecto:{proyecto:"",
  //   componente:{componente:"",
  //   actividad:{actividad:""}
  // }
  // },
  // };
  // let obj_proyecto = {
  //   proyectos:[]
  // };

  for (const i of idnodo[0]) {
    proyect = await sequelize.query(
      `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${i.idNodoProyecto}) ORDER BY sku, idNodo`,
      { replacements: { docId: user.Doc_id } }
    );
    let idPadre = proyect[0][0].idPadre;
    let nombre = proyect[0][0].Nombre;
    let tipoParte;
    let Parte = idPadre;
    if (proyect[0][0].TipoParte === "Actividad") {
      obj_proyecto = {
        ...obj_proyecto,
        actividad: { actividad: proyect[0][0].Nombre },
      };
      // obj_proyecto.proyecto.componente.actividad = actividad.proyect[0][0].Nombre
      // obj_proyecto.proyectos[0]=({
      //   proyecto:"",
      //   componentes:[{
      //     componente:"",
      //     actividades:[{actividad:proyect[0][0].Nombre}]
      //   }]
      //  })
    }
    let PP = "";
    let cabecera = "";
    do {
      tipoParte = await sequelize.query(
        `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${Parte}) ORDER BY sku, idNodo`,
        { replacements: { docId: user.Doc_id } }
      );

      if (tipoParte[0][0].TipoParte === "PP") {
        PP = tipoParte[0][0].Nombre;
      }
      if (tipoParte[0][0].TipoParte === "Cabecera") {
        cabecera = tipoParte[0][0].Nombre;
      }

      Parte = tipoParte[0][0].idPadre;
      console.log("parteeeeeeeee", tipoParte[0][0].TipoParte);

      if (tipoParte[0][0].TipoParte === "PP") {
        obj_proyecto = {
          ...obj_proyecto,
          componente: { componente: tipoParte[0][0].Nombre },
        };
        // obj_proyecto.proyecto.componente = tipoParte[0][0].Nombre
        // obj_proyecto.proyectos[0]=({
        //   proyecto:cabecera,
        //   componentes:[{
        //     componente:PP,
        //     actividades:[{actividad:proyect[0][0].Nombre}]
        //   }]
        //  })
      }
      if (tipoParte[0][0].TipoParte === "Cabecera") {
        obj_proyecto = {
          ...obj_proyecto,
          proyecto: tipoParte[0][0].Nombre,
        };
        // obj_proyecto.proyecto = tipoParte[0][0].Nombre
        // obj_proyecto.proyectos[0]=({
        //   proyecto:cabecera,
        //   componentes:[{
        //     componente:PP,
        //     actividades:[{actividad:proyect[0][0].Nombre}]
        //   }]
        //  })
      }
      console.log(obj_proyecto);
    } while (tipoParte[0][0].TipoParte !== "Cabecera");
  }

  
  res.json("hola");
  // res.json(nodo_padre);
};

//todo hacer consulta para proyectos enviando respuesta automatica
const getProyectName = async (req, res) => {
  const { search } = req.body;
  console.log(search);
  const searchs = await Proyect.findAll({
    where: {
      proyect: { [Op.substring]: `%${search}%` },
    },
  });
  res.json(searchs);
};
//todo debe enviar el arbol del proyecto con componente y actividad y verificar si requiere entregables
//todo hacer el post de entregable

module.exports = { proyect, componet, getComponet, activity, getProyectName };
