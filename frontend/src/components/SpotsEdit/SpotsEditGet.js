import { useParams } from "react-router-dom";
import './SpotsEditGet.css'
import { useSelector, useDispatch } from "react-redux";
import SpotEdit from ".";
// import { chooseSpot } from "../../store/spots";
// import {useEffect} from "react";

export default function SpotEditGet() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.allSpots[spotId])

    // useEffect(() => {
    //     dispatch(chooseSpot(spotId))
    // }, [dispatch])

    return (
        <>
            <SpotEdit userSpot={spot}/>
        </>
    )
}
