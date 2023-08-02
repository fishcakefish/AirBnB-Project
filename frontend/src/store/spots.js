import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getall'
const RECIEVE_SPOT = 'spots/RECIEVE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

const recieveSpot = (spot) => ({
    type: RECIEVE_SPOT,
    spot
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

const getUserSpots = (spots) => ({
    type: GET_USER_SPOTS,
    spots
})

export const writeSpots = (payload) => async(dispatch) => {
    const response = await fetch(`/api/spots`, {
        method: 'GET'
    })
    if (response.ok) {
        const spots = await response.json()
        dispatch(getAllSpots(spots))
        return spots
    }
}

export const chooseSpot = (spotId) => async(dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'GET'
    })
    if (response.ok) {
        const spot = await response.json()
        dispatch(recieveSpot(spot))
        return spot
    }
}

export const createSpot = (spot, user) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        if (!user) throw new Error('Please log in to create a spot')
        const newSpot = await response.json()
        dispatch(recieveSpot(newSpot))
        return newSpot
    }
    else {
        const errors = await response.json()
        return errors
    }
}

export const removeSpot = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const spotId = await response.json()
        dispatch(deleteSpot(spotId))
        return response
    }
}

export const getCurrentSpots = () => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/current`, {
        method: 'GET'
    })

    if (response.ok) {
        const spots = await response.json()
        dispatch(getUserSpots(spots))
        return spots
    }
}

// export default function spotsReducer(state = {}, action) {
//     switch (action.type) {
//         case GET_ALL_SPOTS:
//             const spotsState = {}
//             action.spots.forEach((spot) => {
//                 spotsState[spot.id] = spot
//             })
//             return spotsState
//         case RECIEVE_SPOT:
//             // console.log(action.spot)
//             return { ...state, [action.spot.id]: action.spot }
//         default:
//             return state
//     }
// }

const initialState = { allSpots: {}, singleSpot: {} }

export default function spotsReducer(state = initialState, action) {
    let spotsState
    switch (action.type) {
        case GET_ALL_SPOTS:
            spotsState = {...state, allSpots: {}, singleSpot: {}}
            action.spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot
            })
            return spotsState
        case RECIEVE_SPOT:
            // console.log(action.spot)
            spotsState = { ...state, allSpots: {}, singleSpot: {} }
            spotsState.singleSpot = action.spot
            return spotsState
        case GET_USER_SPOTS:
            spotsState = { ...state, allSpots: {}, singleSpot: {} }
            action.spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot
            })
            return spotsState
        default:
            return state
    }
}
