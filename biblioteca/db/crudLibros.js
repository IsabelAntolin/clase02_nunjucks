const pool = require('./conexion')


const agregarLibro = async (titulo, descripcion) => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `insert into libros(titulo,descripcion)values($1,$2)`,
    values: [titulo, descripcion]
  })
  client.release()
}
const mostrarLibros = async () => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `select * from libros order by id `
    // rowMode: 'array'
  })
  client.release()
  return resp.rows
}
const mostrarLibro = async (id) => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `select * from libros where id=$1`,
    values: [id]
    // rowMode: 'array'
  })
  client.release()
  return resp.rows[0]
}
//_______________________________________________________________________



module.exports = { agregarLibro, mostrarLibros, mostrarLibro }