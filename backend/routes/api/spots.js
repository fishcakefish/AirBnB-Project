const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, Review, ReviewImage, SpotImage, User, Booking } = require('../../db/models')

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Must be a number'),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Must be a number'),
    check('name')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Must be a number'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Must be a string'),
    check('stars')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Must be a number'),
    handleValidationErrors
]

const router = express.Router()

router.post('/:id/reviews', validateReview, async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const spot = await Spot.findByPk(req.params.id, {
        include: {
            model: Review,
            attributes: ['userId', 'review']
        }
    })
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    for (let i = 0; i < spot.Reviews.length; i++) {
        console.log(spot.Reviews[i].userId)
        if (spot.Reviews[i].userId === user.id) {
            const err = new Error("Review of this spot already exists from you")
            err.status = 403
            return next(err)
        }
    }
    const { review, stars } = req.body
    const newReview = await Review.create({
        spotId: spot.id,
        userId: user.id,
        review,
        stars
    })
    res.json(newReview)
})

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

router.post('/:id/bookings', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.id, {
        include: {
            model: Booking,
            attributes: ['startDate', 'endDate']
        }
    })
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (spot.ownerId === user.id) {
        return res.json("You can't make a booking to your own spot.")
    }

    const { startDate, endDate } = req.body
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    console.log(newStartDate)

    for (let i = 0; i < spot.Bookings.length; i++) {
        let booking = spot.Bookings[i]
        console.log(booking.startDate)
        let currentStartDate = new Date(booking.startDate)
        let currentEndDate = new Date(booking.endDate)
        if ((newStartDate >= currentStartDate && newStartDate <= currentEndDate) ||
            (newEndDate >= currentStartDate && newEndDate <= currentEndDate)) {
            const err = new Error("Booking for this timeslot already exists.")
            err.status = 403
            return next(err)
        }
    }

    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: user.id,
        startDate: newStartDate,
        endDate: newEndDate
    })

    res.json(newBooking)
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

router.delete('/:id/images/:imageid', async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const spot = await Spot.findByPk(req.params.id)
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    if (spot.ownerId !== user.id) return res.json("You must own the spot to delete.")
    const spotImage = await SpotImage.findByPk(req.params.id)
    if (!spotImage) {
        const err = new Error("SpotImage not found")
        err.status = 404
        return next(err)
    }
    await spotImage.destroy()
    return res.json("Successful deletion.")
})

router.post('/:id', async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const spot = await Spot.findByPk(req.params.id)
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    if (spot.ownerId !== user.id) return res.json("You must be the owner of the given spot.")
    const { url, preview } = req.body
    const newSpotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })
    res.json(newSpotImage)
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

router.put('/:id', validateSpot, async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const spot = await Spot.findByPk(req.params.id)
    if (!spot) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    if (spot.ownerId !== user.id) {
        return res.json('You must be the owner of the given spot.')
    }
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.json(spot)
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
        const spotData = spot.toJSON();

        let avgRating = 0;
        if (spotData.Reviews.length > 0) {
            const totalStars = spotData.Reviews.reduce((sum, review) => sum + review.stars, 0);
            avgRating = totalStars / spotData.Reviews.length;
        }

        delete spotData.Reviews;
        spotData.avgRating = avgRating;

        return spotData;
    })

    return res.json(spotsJSON)
})

router.post('/', validateSpot, async(req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (!user) return res.json({ user: null })
    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.json(newSpot)
})

module.exports = router
