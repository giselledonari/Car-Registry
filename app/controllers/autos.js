const {pool}=require("../db/db.js")

const autos = {
  async registro(marca,modelo,year,imagen,id_usuario) {
    const client = await pool.connect();
    const respuesta = await client.query({
      text: "insert into autos (marca,modelo,year,imagen,id_usuario) values ($1,$2,$3,$4,$5) ",
      values: [marca,modelo,year,imagen,id_usuario],
    });
    client.release();
    return respuesta.rows;
  },
  async getAutos() {
    const client = await pool.connect();
    const respuesta = await client.query({
      text: `SELECT  *FROM autos`
    });
    client.release();
    return respuesta.rows;
  }
};
module.exports = { autos };
