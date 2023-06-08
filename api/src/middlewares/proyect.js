// const { Op } = require("sequelize");
const { sequelize } = require("../db");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./local-storage");

const LoadProyect = async (Doc_id) => {
  //? se piden los datos del usuario en el localStorage
  // const user = JSON.parse(localStorage.getItem("user"));
  console.log(Doc_id);
  //? se selecciona los idNodo para saber que proyectos tiene el usuario
  const idnodo = await sequelize.query(
    `SELECT idNodoProyecto FROM TBL_SER_ProyectoActividadesEmpleados where N_DocumentoEmpleado = ${Doc_id} `
  );

  let proyect;
  let Cod_parte;
  let obj_proyecto = {
    proyectos: [],
  };
  let con = 0;

  for (const i of idnodo[0]) {
    proyect = await sequelize.query(
      `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) 
      FROM TBL_SER_ProyectoActividadesEmpleados WHERE 
      N_DocumentoEmpleado = :docId AND idNodo = ${i.idNodoProyecto}) ORDER BY sku, idNodo`,
      { replacements: { docId: Doc_id } }
    );
    
    let ID_parte = parseInt(proyect[0][0].Cod_parte) ;
    let idPadre = proyect[0][0].idPadre;
    let tipoParte;
    let Parte = idPadre;
    let actividad = "";
    let componente = "";
    let proyecto = "";
    let fecha = "";
    let frecuencia = 0
    let entregable = false
    Cod_parte = await sequelize.query(
      `select* from TBL_ESP_Procesos  where ID = ${ID_parte}`,
      // {replacements:{Codigo:}}
    )
    if (proyect[0][0].TipoParte === "Actividad") {
      actividad = proyect[0][0].Nombre;
      frecuencia = Cod_parte[0][0].FrecuenciaVeces
      entregable = Cod_parte[0][0].AplicaEntregables
      
    }
    do {
      tipoParte = await sequelize.query(
        `SELECT * FROM TBL_SER_PROYECTOS WHERE SKU IN (SELECT DISTINCT(SKU_Proyecto) FROM TBL_SER_ProyectoActividadesEmpleados WHERE N_DocumentoEmpleado = :docId AND idNodo = ${Parte}) ORDER BY sku, idNodo`,
        { replacements: { docId: Doc_id } }
      );
      Parte = tipoParte[0][0].idPadre;
      if (tipoParte[0][0].TipoParte === "PP") {
        componente = tipoParte[0][0].Nombre;
      }
      if (tipoParte[0][0].TipoParte === "Cabecera") {
        proyecto = tipoParte[0][0].Nombre;
         fecha = new Date(proyect[0][0].Fecha).toISOString().split("T")[0];
       
      }
      //? Verificar si el proyecto ya existe en el objeto obj_proyecto
      let proyectoExistente = obj_proyecto.proyectos.find(
        (p) => p.proyecto === proyecto
      );

      if (proyectoExistente) {
        //? Verificar si el componente ya existe en el proyecto
        let componenteExistente = proyectoExistente.componentes.find(
          (c) => c.componente === componente
        );

        if (componenteExistente) {
          //? Agregar la actividad al componente existente
          
          componenteExistente.actividades.push({ actividad: actividad,frecuencia,entregable });
        } else {
          //? Agregar un nuevo componente con la actividad al proyecto existente
          proyectoExistente.componentes.push({
            componente: componente,
            actividades: [{ actividad: actividad,frecuencia,entregable }],
          });
        }
      } else {
        //? Agregar un nuevo proyecto con el componente y actividad
        if (proyecto !== "") {
         
          obj_proyecto.proyectos?.push({
            fecha,
            proyecto: proyecto,
            componentes: [
              {
                componente: componente,
                actividades: [{ actividad: actividad,
                                frecuencia,entregable}],
              },
            ],
          });
        }
      }
    } while (tipoParte[0][0].TipoParte !== "Cabecera");
  }

  localStorage.setItem(`Proyecto`, JSON.stringify(obj_proyecto));
  //! en el deploy validar que el archivo no se sobreescriba
};

//todo hacer consulta para proyectos enviando respuesta automatica
const getProyectName = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  const proyects = JSON.parse(localStorage.getItem(`Proyecto`));
  // localStorage.removeItem(`Proyecto`)
  const NomProyect = proyects.proyectos
    .filter((obj) => obj.proyecto.includes(search.toUpperCase()))
    .map((obj) => obj.proyecto);

  if (NomProyect.length <= 0) {
    return res.json("No hay royectos con este nombre ");
  }
  // const proyect = proyects.proyectos.filter((obj) => {
  //   return obj.proyecto.includes(search);
  // });
  res.json(NomProyect);
};

//todo hacer consulta para enviar el proyectos
const getProyect = async (req, res) => {
  const { search } = req.query;
  const proyects = JSON.parse(localStorage.getItem(`Proyecto`));
  //? me devuelve todo el objeto
  const proyect = proyects.proyectos.filter((obj) => {
    return obj.proyecto.includes(search.toUpperCase());
  });
  res.json(proyect);
};

const logout = (req, res) => {
  localStorage.removeItem(`Proyecto`);
  res.json("Logout seccesfull");
};

//todo debe enviar el arbol del proyecto con componente y actividad y verificar si requiere entregables
//todo hacer el post de entregable

module.exports = {
  getProyectName,
  getProyect,
  LoadProyect,
  logout,
};
