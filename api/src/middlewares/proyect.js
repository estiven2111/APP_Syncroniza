const { Proyect, Componet, Activity } = require("../db");
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
  const cons = await Activity.findAll({
    include:Componet
  });
// const cons = await Proyect.findAll({
//     include: Componet
//   });

//   const conse = await Componet.findAll({
//     include: [Activity,Proyect]
//   });
  res.json(cons);
};
module.exports = { proyect, componet, getComponet, activity };
