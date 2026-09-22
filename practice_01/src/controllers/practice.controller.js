const express = require('express')
const practiceModel = require('../models/practice.model.js')
const app = express()
app.use(express.json())


async function practiceGet(req, res) {
    try {
        const result = await practiceModel.find()//get all data 
        res.status(200).json({
            status: true,
            message: 'data is fetched successfully',
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'data is not fetched!',
            err: err.message
        })
    }
}

async function practicePost() {
    try {
        const result = await practiceModel.create()
        res.status(201).json({
            status: true,
            message: 'data is created successfully',
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'not added!',
            err: err.message
        })
    }
}

async function practiceUpdate() {
    try {
        const id = req.params.id
        const practice = req.body
        const result = await practiceModel.findByIdAndUpdate(id, practice)
        res.status(201).json({
            status: true,
            message: 'updated successfully',
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'not uppdated!',
            err: err.message
        })
    }
}

async function practiceDelete() {
    try {
        const id = req.body.id
        const result = await practiceModel.findByIdAndDelete(id)
        res.status(201).json({
            status: true,
            message: 'deleted successfully',
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'something is wrong!',
            err: err.message
        })
    }
}
//pagination kyy hota ki hmre paas page aur ussme kitne hme data display krwana h mltb ki kitne count 
//question issme yeh h ki 5 number ke page me konse number se start hoga
//page = 5
//count = 5
//total data 50
//start = (page- 1)*count => (5-1)*5=> 20  
//end = (page * count) - 1 => (5*5)-1 => 24
async function pagination() {
    try {
        const page = Number(req.body.page)
        const count = Number(req.body.count)
        const start = (page - 1) * count;
        const end = (page * count) - 1;
        const result = await practiceModel.slice(start, end)
        res.status(200).json({
            status: true,
            message: "founded",
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'something is wrong',
            result
        })
    }
}

module.export = {
    pagination, practiceDelete, practicePost, practiceUpdate, practiceGet
}