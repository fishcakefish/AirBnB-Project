import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getall'
const RECIEVE_SPOT = 'spots/RECIEVE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
// const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'

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

// const getUserSpots = (spots) => ({
//     type: GET_USER_SPOTS,
//     spots
// })

const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
})

const makeSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
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

export const createSpot = (spot, user, imgArray) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    console.log(imgArray)

    if (response.ok) {
        if (!user) throw new Error('Please log in to create a spot')
        const newSpot = await response.json()
        dispatch(makeSpot(newSpot))
        for (let i = 0; i < imgArray.length; i++) {
            const imgUrl = imgArray[i]
            let img = {
                url: imgUrl,
                preview: i === 0 ? true : false
            }
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(img)
            })
        }
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
        return spotId
    }
}

export const getCurrentSpots = () => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/current`, {
        method: 'GET'
    })

    if (response.ok) {
        const spots = await response.json()
        dispatch(getAllSpots(spots))
        return spots
    }
}

export const editCurrentSpot = (spot, spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(editSpot(spot))
        return spot
    }
}

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
            spotsState = { ...state, allSpots: {}, singleSpot: {} }
            spotsState.singleSpot = action.spot
            return spotsState
        // case GET_USER_SPOTS:
        //     spotsState = { ...state, allSpots: {}, singleSpot: {} }
        //     action.spots.forEach((spot) => {
        //         spotsState.allSpots[spot.id] = spot
        //     })
        //     return spotsState
        case CREATE_SPOT:
            spotsState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...action.spot } }
            spotsState.allSpots[action.spot.id] = action.spot
            return spotsState
        case DELETE_SPOT:
            spotsState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete spotsState.allSpots[action.spotId]
            return spotsState
        case EDIT_SPOT:
            spotsState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            spotsState.allSpots[action.spot.id] = action.spot
            spotsState.singleSpot = action.spot
            return spotsState
        default:
            return state
    }
}
