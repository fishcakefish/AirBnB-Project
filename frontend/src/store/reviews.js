import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEW"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"

const getSpotReviews = (reviews, spotId) => ({
    type: GET_SPOT_REVIEWS,
    reviews,
    spotId
})

const createReview = (review, spotId, user) => ({
    type: CREATE_REVIEW,
    review,
    spotId,
    user
})

export const obtainSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "GET"
    })
    const reviewData = await response.json()
    dispatch(getSpotReviews(reviewData, spotId))
    return reviewData
}

export const makeReview = (review, spotId, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review)
    })
    const newReview = await response.json()
    newReview.User = { id: user.id, firstName: user.firstName, lastName: user.lastName }
    newReview.ReviewImages = []
    dispatch(createReview(newReview, spotId, user))
    console.log('success!')
    return newReview
}

const initialState = { spot: {}, user: {} }

export default function reviewsReducer(state = initialState, action) {
    let reviewState
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            reviewState = { ...state, spot: { ...state.spot } }
            reviewState.spot[action.spotId] = {}
            action.reviews.forEach(review => {
                reviewState.spot[action.spotId][review.id] = review
            })
            return reviewState
        case CREATE_REVIEW:
            reviewState = { ...state }
            const reviewId = action.review.id
            reviewState.spot[reviewId] = {
                reviewData: action.review,
                User: action.user,
                ReviewImages: action.review.ReviewImages
            }
            reviewState.user[reviewId] = {
                reviewData: action.review,
                User: action.user,
                Spot: action.spotId
            }
            return reviewState
        default:
            return state
    }
}
