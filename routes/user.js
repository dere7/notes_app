const User = require('../models/User')
const bcrypt = require('bcrypt')
const { tokenExtractor, userExtractor } = require('../utils/middlewares')
const userRouter = require('express').Router()

userRouter.post('/', async (req, res) => {
    const { fullName, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt())
    const user = new User({ fullName, email, password: passwordHash })
    await user.save()
    res.status(201).json(user)
})

userRouter.get('/me', tokenExtractor, userExtractor, (req, res) => {
    res.json(req.user)
})

userRouter.delete('/me/delete', tokenExtractor, userExtractor, async (req, res) => {
    await User.findByIdAndDelete(req.user.id)
    res.status(201).end()
})

module.exports = userRouter