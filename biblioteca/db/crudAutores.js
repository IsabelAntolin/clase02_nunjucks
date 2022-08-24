const pool = require('./conexion')

const agregarAutor = async (nombre, apellido, nota) => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `insert into autores(nombre,apellido,nota)values($1,$2,$3)`,
    values: [nombre, apellido, nota]
  })
  client.release()
}
const mostrarAutores = async () => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `select * from autores`
    // rowMode: 'array'
  })
  client.release()
  return resp.rows
}
const mostrarAutor = async (id) => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `select * from autores where id=$1`,
    values: [id]
    // rowMode: 'array'
  })
  client.release()
  return resp.rows[0]
}

//_______________________________________________________________________



module.exports = { mostrarAutor, agregarAutor, mostrarAutores}