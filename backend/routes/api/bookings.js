const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Booking } = require('../../db/models')

const router = express.Router()

router.delete('/:id', async(req, res, next) => {
    const booking = await Booking.findByPk(req.params.id)
    console.log(booking.startDate)
    if (!booking) {
        const err = new Error("Booking not found")
        err.status = 404
        return next(err)
    }
    const currentDate = new Date()
    if (booking.startDate < currentDate) {
        const err = new Error("Booking has already been started/completed, can no longer remove booking.")
        err.status = 400
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (booking.userId === user.id) {
        await booking.destroy()
        return res.json('Successful deletion.')
    } else {
        return res.json('You must be the owner of the given booking.')
    }
})

module.exports = router
