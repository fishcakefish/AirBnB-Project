import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEW"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

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

const deleteReview = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    reviewId,
    spotId
})

export const obtainSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: "GET"
    })
    const reviewData = await response.json()
    dispatch(getSpotReviews(reviewData, spotId))
    return reviewData
}

export const makeReview = (reviewData, spotId, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    })
    const newReview = await response.json()
    newReview.User = { id: user.id, firstName: user.firstName, lastName: user.lastName }
    newReview.ReviewImages = []
    dispatch(createReview(newReview, spotId, user))
    console.log('success!')
    return newReview
}

export const destroyReview = (reviewId, spotId) => async (dispatch) => {
    console.log('lo')
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    console.log('llo')
    const data = await response.json()
    dispatch(deleteReview(reviewId, spotId))
    return reviewId
}

const initialState = { spot: {}, user: {} }

export default function reviewsReducer(state = initialState, action) {
    let reviewState
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            reviewState = { ...state, spot: { } }
            reviewState.spot[action.spotId] = {}
            action.reviews.forEach(review => {
                reviewState.spot[action.spotId][review.id] = review
            })
            return reviewState
        case CREATE_REVIEW:
            reviewState = { ...state, spot: { ...state.spot } }
            if (!reviewState.spot[action.spotId]) {
                reviewState.spot[action.spotId] = {}
            }
            reviewState.spot[action.spotId][action.review.id] = action.review
            reviewState.user[action.user.id] = {
                ...reviewState.user[action.user.id],
                [action.review.id]: {
                    reviewData: action.review,
                    User: action.user,
                    Spot: action.spotId
                }
            }
            return reviewState
        case DELETE_REVIEW:
            reviewState = { ...state, spot: { ...state.spot } }
            console.log(reviewState)
            console.log('ello')
            delete reviewState.spot[action.spotId][action.reviewId]
            console.log(reviewState)
            console.log('hello')
            return reviewState
        default:
            return state
    }
}
