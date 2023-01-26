const Note = require('../models/Note')
const { tokenExtractor, userExtractor } = require('../utils/middlewares')

const noteRouter = require('express').Router()

noteRouter.get('/', async (req, res) => {
    const notes = await Note.find({}).populate('author')
    res.json(notes)
})

noteRouter.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).populate('author')
    res.json(note)
})

noteRouter.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body).populate('author')
    await note.save()
    res.json(note)
})

noteRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id).populate('author')
    res.json(note)
})

noteRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
    const note = new Note({ ...req.body, author: req.user.id })
    await note.save()
    res.json(note)
})

module.exports = noteRouter