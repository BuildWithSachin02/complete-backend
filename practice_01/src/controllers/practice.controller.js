const express = require('express')
const practiceModel = require('../models/practice.model.js')



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

async function practicePost(req,res) {
    try {
        const practice = req.body
        const result = await practiceModel.create(practice)
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

async function practiceUpdate(req,res) {
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

async function practiceDelete(req,res) {
    try {
        const id = req.params.id
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
async function pagination(req,res) {
    try {
        const page = Number(req.query.page)
        const count = Number(req.query.count)
        const start = (page - 1) * count;
        // const end = (page * count) - 1;
        const result = await practiceModel.find().skip(start).limit(count)
        res.status(200).json({
            status: true,
            message: "founded",
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'something is wrong',
            err:err.message
        })
    }
}

module.exports = {
    pagination, practiceDelete, practicePost, practiceUpdate, practiceGet
}