'use strict';

const { ReviewImage, Review } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const reviewImages = [
  {
    reviewNumber: 1,
    url: 'wowza.com'
  },
  {
    reviewNumber: 3,
    url: 'wowza2.com'
  },
  {
    reviewNumber: 2,
    url: 'wowza3.com'
  },
  {
    reviewNumber: 4,
    url: 'wowza4.com'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    for (let reviewImageInfo of reviewImages) {
      const { url } = reviewImageInfo
      const foundReview = await Review.findByPk(reviewImageInfo.reviewNumber)
      await ReviewImage.create({
        reviewId: foundReview.id,
        url
      }, {})
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, {
      createdAt: reviewImages.map(reviewImage => reviewImage.createdAt)
    }, {})
  }
};
