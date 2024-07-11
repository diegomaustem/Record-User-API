import express from 'express' 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
    let users = []

    if(req.body){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)
})

app.post('/create-user', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name:  req.body.name,
            age:   req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.put('/update-user/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name:  req.body.name,
            age:   req.body.age
        }
    })
    res.status(200).json('Success edited user!')
})

app.delete('/delete-user/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json('Success deleted user!')
})

app.listen(3000)