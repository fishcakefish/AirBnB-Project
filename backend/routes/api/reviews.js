const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const router = express.Router()

router.delete('/:id/:imageid', async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const review = await Review.findByPk(req.params.id)
    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (review.userId !== user.id) return res.json("You must own the spot to delete.")
    const reviewImage = await ReviewImage.findByPk(req.params.imageid)
    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found")
        err.status = 404
        return next(err)
    }
    reviewImage.destroy()
    return res.json("Successfully deleted")
})

router.delete('/:id', async(req, res, next) => {
    const review = await Review.findByPk(req.params.id)
    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (review.userId === user.id) {
        await review.destroy()
        return res.json("Successfully deleted")
    } else {
        return res.json('You must be the owner of the given review.')
    }
})

router.post('/:id', async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const review = await Review.findByPk(req.params.id)
    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (review.userId !== user.id) return res.json("You must be the owner of the given review.")
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        },
        attributes: ['id']
    })
    console.log(reviewImages.length)
    if (reviewImages.length > 10) {
        const err = new Error("Maximum number of images for this resource was reached")
        err.status = 403
        return next(err)
    }
    const { url } = req.body
    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
    })
    return res.json(newReviewImage)
})

router.put("/:id", validateReview, async(req, res, next) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    const findReview = await Review.findByPk(req.params.id)
    if (!findReview) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (findReview.userId !== user.id) {
        return res.json('You must be the owner of the given review.')
    }
    const { review, stars } = req.body
    await findReview.update({
        review,
        stars
    })
    return res.json(findReview)
})

router.get('/', async(req, res) => {
    const { user } = req
    if (!user) return res.json({ user: null })
    else {
        const reviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage,
                    attributes: ['url']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        })
        // reviews.forEach(review => {
        //     review.Spot.previewImages = review.Spot.SpotImages.map(image => image.url)
        // })
        res.json(reviews)
    }
})

module.exports = router
