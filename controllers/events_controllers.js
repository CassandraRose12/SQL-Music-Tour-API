// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Events } = db 
const { Op } = require('sequelize')


//Find All Events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [[ 'date', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%` }
            }
        })
        res.status(200).json(foundEvents)
     } catch (error) {
        res.status(500).json(error)
    }
});

//Find a specific event
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create An Event
events.post('/', async (req, res) => {
    try{
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: `Successfully inserted a new event`,
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//Update an event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }

})

// DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = events
