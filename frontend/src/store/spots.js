const GET_ALL_SPOTS = 'spots/getall'

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const writeSpots = (payload) => async(dispatch) => {
    const response = await fetch(`/api/spots`, {
        method: 'GET'
    })
    if (response.ok) {
        const spots = await response.json()
        console.log(spots)
        dispatch(getAllSpots(spots))
        return spots
    }
}

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_SPOTS:
            const spotsState = {}
            action.spots.forEach((spot) => {
                spotsState[spot.id] = spot
            })
            return spotsState
        default:
            return state
    }
}
