const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Booking, Spot, SpotImage } = require('../../db/models')

const router = express.Router()

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .toDate(),
    check('endDate')
        .exists({ checkFalsy: true })
        .toDate()
        .custom((endDate, { req, next }) => {
            if (endDate <= new Date(req.body.startDate)) {
                const err = new Error("endDate cannot be on or before startDate")
                err.status(400)
                return next(err)
                //???
            }
            return true
        }),
    handleValidationErrors
]

router.delete('/:id', async(req, res, next) => {
    const booking = await Booking.findByPk(req.params.id)
    if (!booking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }
    const currentDate = new Date()
    if (booking.startDate < currentDate) {
        const err = new Error("Bookings that have been started can't be deleted")
        err.status = 400
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (booking.userId === user.id) {
        await booking.destroy()
        return res.json("Successfully deleted")
    } else {
        return res.json('You must be the owner of the given booking.')
    }
})

router.put("/:id", validateBooking, async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const booking = await Booking.findByPk(req.params.id)
    if (!booking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }
    if (booking.userId !== user.id) {
        return res.json('You must be the owner of the given booking.')
    }
    const { startDate, endDate } = req.body
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    const currentDate = new Date()
    if (currentDate > booking.endDate) {
        const err = new Error("Past bookings can't be modified")
        err.status = 400
        return next(err)
    }
    const spot = await Spot.findByPk(booking.spotId, {
        include: {
            model: Booking,
            attributes: ["startDate", "endDate"]
        }
    })
    for (let i = 0; i < spot.Bookings.length; i++) {
        let booking = spot.Bookings[i]
        let currentStartDate = new Date(booking.startDate)
        let currentEndDate = new Date(booking.endDate)
        if ((newStartDate >= currentStartDate && newStartDate <= currentEndDate) ||
            (newEndDate >= currentStartDate && newEndDate <= currentEndDate)) {
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            return next(err)
        }
    }
    await booking.update({
        startDate: newStartDate,
        endDate: newEndDate
    })
    return res.json(booking)
})

router.get('/', async(req, res) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    else {
        const reviews = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [{
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage,
                    attributes: ['url']
                }
            }]
        })
        res.json(reviews)
    }
})

module.exports = router
