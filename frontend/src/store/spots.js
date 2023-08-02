const GET_ALL_SPOTS = 'spots/getall'
const RECIEVE_SPOT = 'spots/RECIEVE_SPOT'

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const recieveSpot = (spot) => ({
    type: RECIEVE_SPOT,
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
                spotsState[spot.id] = spot
                spotsState.allSpots[spot.id] = spot
            })
            return spotsState
        case RECIEVE_SPOT:
            // console.log(action.spot)
            spotsState = { ...state, allSpots: {}, singleSpot: {} }
            spotsState.singleSpot = action.spot
            return spotsState
        default:
            return state
    }
}
