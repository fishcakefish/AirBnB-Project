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

module.exports = router
