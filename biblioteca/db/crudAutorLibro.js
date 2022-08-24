const pool = require('./conexion')

const insertarAutorLibro = async (libro_id, autor_id) => {
  const client = await pool.connect()
  const resp = await client.query({
    text: `insert into autor_libro(libro_id,autor_id)values($1,$2)`,
    values: [libro_id, autor_id]
  })
  client.release()
}
const mostrarAutorLibro = async (id, accion) => {
  let resp
  const client = await pool.connect()
  if (accion == 1) {
    resp = await client.query({
      text: `select autores.nombre,autores.apellido from autores 
        join autor_libro on autores.id=autor_libro.autor_id
        join libros on libros.id= autor_libro.libro_id
        where libros.id = $1
        order by 1`,
      values: [id]
    })
  } else {
    resp = await client.query({
      text: `select libros.titulo from libros 
        join autor_libro on libros.id=autor_libro.libro_id
        join autores on autores.id= autor_libro.autor_id
        where autores.id = $1
        order by 1`,
      values: [id]
    })
  }
  client.release()
  return resp.rows
}

module.exports = { insertarAutorLibro,mostrarAutorLibro }