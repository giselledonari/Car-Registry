const {pool}=require("../db/db.js")

const usuarios = {
  async buscarCorreo(email) {
    console.log(email)
    const client = await pool.connect();
    const respuesta = await client.query({
      text: "select * from usuarios where email = $1",
      values: [email],
    });
    client.release();
    return respuesta.rows;
  },

  async registro(email,nombre,apellido,foto,cont_encript) {
    const client = await pool.connect();
    const respuesta = await client.query({
      text: "insert into usuarios (email,nombre,apellido,foto,password) values ($1,$2,$3,$4,$5) ",
      values: [email,nombre,apellido,foto,cont_encript],
    });
    client.release();
    return respuesta.rows;
  },

  async informacion(id) {
    const client = await pool.connect();
    const respuesta = await client.query({
      text: `SELECT  autos.id,marca, modelo, year, imagen,
      usuarios.id AS usuario_id, email, nombre, apellido, foto
      FROM usuarios
      LEFT JOIN autos ON usuarios.id = autos.id_usuario
      WHERE usuarios.id = $1 `,
      values: [id],
    });
    client.release();
    return respuesta.rows;
  }
};
module.exports = { usuarios };

