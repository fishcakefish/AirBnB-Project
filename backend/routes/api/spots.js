const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, Review, ReviewImage, SpotImage, User, Booking } = require('../../db/models')


const router = express.Router()

router.get('/:id/reviews', async(req, res, next) => {

    if (!(await Spot.findByPk(req.params.id))) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }

    let spot = await Review.findAll({
        where: {
            spotId: req.params.id
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    })

    res.json(spot)
})

router.get('/:id/bookings', async(req, res, next) => {
    if (!(await Spot.findByPk(req.params.id))) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }

    const { user } = req
    if (!user) return res.json({ user: null })
    let bookings;
    let check = await Spot.findOne({
        where: {
            id: req.params.id,
            ownerId: user.id
        }
    })

    if (check) {
        bookings = await Booking.findAll({
            where: {
                spotId: req.params.id
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
    })} else {
        bookings = await Booking.findAll({
            where: {
                spotId: req.params.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }

    res.json(bookings)
})

router.delete('/:id', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (spot.ownerId === user.id) {
        await spot.destroy()
        return res.json('Successful deletion.')
    } else {
        return res.json('You must be the owner of the given spot.')
    }
})

router.get('/:id', async(req, res, next) => {
    let spot = await Spot.findByPk(req.params.id, {
        include: [{
            model: Review,
            attributes: ['stars']
        },
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })

    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }

    spot = spot.toJSON()
    const reviews = spot.Reviews
    const numReviews = reviews.length
    let avgStarRating = 0

    if (numReviews > 0) {
        const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0)
        avgStarRating = totalStars / numReviews
    }

    delete spot.Reviews

    return res.json({
        spot,
        numReviews,
        avgStarRating
    })
})

router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: Review,
            attributes: ['stars']
        }
    })

    let spotsJSON = spots.map(spot => {
        const spotData = spot.toJSON(); // convert the data to a mutable format

        // calculate the average rating
        let avgRating = 0;
        if (spotData.Reviews.length > 0) {
            const totalStars = spotData.Reviews.reduce((sum, review) => sum + review.stars, 0);
            avgRating = totalStars / spotData.Reviews.length;
        }

        // remove the Reviews
        delete spotData.Reviews;

        // Add avgRating to spotData
        spotData.avgRating = avgRating;

        return spotData;
    })

    return res.json(spotsJSON)
})

// router.post('/', async(req, res) => {
//     const { user, address, city, state, country, lat, lng, name, description, price } = req
//     if (!user) return res.json({ user: null })
//     else {
//         const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price })
//         const safeSpot = {
//             ownerId: user.id,
//             address,
//             city,
//             state,
//             country,
//             lat,
//             lng,
//             name,
//             description,
//             price
//         }
//     }
// })

module.exports = router
