const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')


const router = express.Router()

router.get('/myreviews', async(req, res) => {
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
                    exclude: ['description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        })
        res.json(reviews)
    }
})

router.delete('/:id', async(req, res, next) => {
    const review = await Review.findByPk(req.params.id)
    if (!review) {
        const err = new Error("Spot not found")
        err.status = 404
        return next(err)
    }
    const { user } = req
    if (!user) return res.json({ user: null })
    if (review.userId === user.id) {
        review.destroy()
        return res.json('Successful deletion.')
    } else {
        return res.json('You must be the owner of the given spot.')
    }
})

module.exports = router
