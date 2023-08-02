import { useEffect } from 'react'
import './SpotsCurrent.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentSpots } from '../../store/spots'
import SpotCurrentItem from '../SpotsCurrentItem'
import { Link } from 'react-router-dom'

export default function SpotCurrent() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => Object.values(state.spots.allSpots))
    console.log(spots)

    useEffect(() => {
        if (user) {
            dispatch(getCurrentSpots(user))
        }
        else throw new Error('Must log in')
    }, [dispatch])

    if (spots.length === 0) {
        return (
            <>
                <div className='no-spots-container'>
                    <Link to='/spots/create'><button>Create New Spot</button></Link>
                </div>
            </>
        )
      }

    return (
        <>
            <h2>Manage Spots</h2>
            <div className='spot-container'>
                {spots?.map((spot) => (
                <SpotCurrentItem
                    spot={spot}
                    key={spot.id}
                />
                ))}
            </div>
        </>
    )
}
