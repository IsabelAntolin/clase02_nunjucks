const express = require('express')
const fnLibro = require('../db/crudLibros')
const fn =require('../db/crudAutorLibro')
const fnAutor = require('../db/crudAutores')

const router = express.Router()
//___________________________________________________

// acá vamos a definir nuestras rutas
router.post('/autores', async (req, res) => {
    console.log(req.body.firstName, req.body.lastName, req.body.textArea);
    fnAutor.agregarAutor(req.body.firstName, req.body.lastName, req.body.textArea)
    res.redirect('/autores');
})
router.get('/autores', async (req, res) => {
    const autores = await fnAutor.mostrarAutores()
    res.render('autores.html', {autores})

})
router.get('/authors/:id',async(req,res)=>{
    const id = req.params.id
     const autor = await fnAutor.mostrarAutor(id)
     const libros = await fnLibro.mostrarLibros()
     const autorLibro = await fn.mostrarAutorLibro(id,2)

   // console.log(autorLibro);
    const obj={
       autor,
       libros,
       autorLibro
    }
    //console.log(obj);
    res.render('autor.html',{obj})
})
router.post('/authors/:id',async(req,res)=>{ 
    const id_autor = req.params.id
    const id_libro =req.body.idLibro
    await fn.insertarAutorLibro(id_libro,id_autor)
    console.log(id_autor,id_libro);
    res.redirect(`/authors/${id_autor}`)
})

module.exports = router