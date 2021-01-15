const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vickyP:Vicky29@cluster0.dorw7.mongodb.net/<sign>?retryWrites=true&w=majority', { useNewUrlParser: true })
const signSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Sign = mongoose.model('Sign', signSchema)
app.use(express.json())

app.post('/signup', async (req, res) => {
    try {
        const email=req.body.email
        const password = req.body.password
        const userdoc = await Sign.findOne({ email: email })
        if (userdoc) {
            return res.status(400).json({msg:"user already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new Sign({
            email:email,
            password:hashedPassword        })
        user.save()
        res.status(400).json({msg:"you have successfully been registered ! please login to continue"})
    } catch (err) {
        console.log(err)
    }
})









app.listen(8000, () => {
    console.log('running on port 8000')
})