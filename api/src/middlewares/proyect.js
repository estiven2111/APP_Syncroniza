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
  // const { componet, proy_id } = req.body;
  // const proy = await Componet.create({ componet });
  // proy.setProyect(proy_id);

  // res.send(proy);
  localStorage.removeItem("proyect")
  res.json("proyecto eliminado del localstorage")
};

const activity = async (req, res) => {
  const { activity, description, com_id } = req.body;
  const acti = await Activity.create({ activity, description });
  acti.setComponet(com_id);

  res.json(acti);
};

const getComponet = async (req, res) => {
  // todo esta consulta si sirve para enviar todos los proyector
  // const conse = await Proyect.findAll({
  //   include: {
  //     model: Componet,
  //     include: Activity,
  //   },
  // });
  // todo *************************************

  //? se piden los datos del usuario en el localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  //? se selecciona los idNodo para saber que proyectos tiene el usuario 
  const idnodo = await sequelize.query(
    `SELECT idNodoProyecto FROM TBL_SER_ProyectoActividadesEmpleados where N_DocumentoEmpleado = ${user.Doc_id} `
  );

  let proyect;
  let obj_proyecto = {
    proyectos:[]
  };
  let con = 0;
  
  for (const i of idnodo[0]) {
    proyect = await sequelize.query(
      `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${i.idNodoProyecto}) ORDER BY sku, idNodo`,
      { replacements: { docId: user.Doc_id } }
    );
    let idPadre = proyect[0][0].idPadre;
    let tipoParte;
    let Parte = idPadre;
    let actividad  = "";
    let componente  = "";
    let proyecto  = "";
    if (proyect[0][0].TipoParte === "Actividad") {
      actividad  = proyect[0][0].Nombre
    }
    do {
      tipoParte = await sequelize.query(
        `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${Parte}) ORDER BY sku, idNodo`,
        { replacements: { docId: user.Doc_id } }
      );
      Parte = tipoParte[0][0].idPadre;
      if (tipoParte[0][0].TipoParte === "PP") {
        componente  = tipoParte[0][0].Nombre;
      }
      if (tipoParte[0][0].TipoParte === "Cabecera") {
        proyecto  = tipoParte[0][0].Nombre;
      }
 // Verificar si el proyecto ya existe en el objeto obj_proyecto
  let proyectoExistente = obj_proyecto.proyectos.find((p) => p.proyecto === proyecto);

if (proyectoExistente) {
   // Verificar si el componente ya existe en el proyecto
    let componenteExistente = proyectoExistente.componentes.find((c) => c.componente === componente);

    if (componenteExistente) {
      // Agregar la actividad al componente existente
      componenteExistente.actividades.push({ actividad: actividad });
    } else {
     // Agregar un nuevo componente con la actividad al proyecto existente
      proyectoExistente.componentes.push({
        componente: componente,
        actividades: [{ actividad: actividad }]
      });
    }
  } else {
    // Agregar un nuevo proyecto con el componente y actividad
   if (proyecto !== "") {
    obj_proyecto.proyectos?.push({
      proyecto: proyecto,
      componentes: [{
        componente: componente,
        actividades: [{ actividad: actividad }]
      }]
    });
  }
   }
    } while (tipoParte[0][0].TipoParte !== "Cabecera");
  }

  localStorage.setItem("proyect", JSON.stringify(obj_proyecto))
  res.json(obj_proyecto);
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
