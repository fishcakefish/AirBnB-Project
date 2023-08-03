import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "reviews/GET_ALL"

const getAllReveiws = (reviews) => {
    type: GET_ALL_REVIEWS,
    reviews
}

const initialState = { spot: {}, user: {}, optionalOrderedList: {} }

export default function reviewsReducer(state = initialState, action) {
    let reviewState
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return
        default:
            return state
    }
}
