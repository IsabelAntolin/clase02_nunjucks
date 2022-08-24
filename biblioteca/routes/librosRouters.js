const express = require('express')
const fnLibro = require('../db/crudLibros')
const fn =require('../db/crudAutorLibro')
const fnAutor = require('../db/crudAutores')

const router = express.Router()
//___________________________________________________

// acá vamos a definir nuestras rutas
router.get('/', async (req, res) => {
    const libros = await fnLibro.mostrarLibros()
    res.render('index.html',{libros})
    //res.json(libros)
})
router.post('/libros', async (req, res) => {
    fnLibro.agregarLibro(req.body.title, req.body.description)
    res.redirect('/')
})

router.get('/books/:id',async(req,res)=>{
    const id = req.params.id
    const libro = await fnLibro.mostrarLibro(id)
    const autores = await fnAutor.mostrarAutores()
    const autorLibro = await fn.mostrarAutorLibro(id,1)

    console.log(autorLibro);
    const obj={
       libro,
       autores,
       autorLibro
    }
    //console.log(obj);
    res.render('libro.html',{obj})
})
router.post('/books/:id',async(req,res)=>{ 
    const id_libro = req.params.id
    const id_autor =req.body.idAutor
    await fn.insertarAutorLibro(id_libro,id_autor)
    res.redirect(`/books/${id_libro}`)
})
//___________________________________________________________

module.exports = router