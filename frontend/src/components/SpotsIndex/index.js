import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SpotsIndex.css';
import { writeSpots } from '../../store/spots';
import SpotIndexItem from '../SpotsIndexItem';

function SpotIndex({ isLoaded }){
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots.allSpots))
  // console.log(spots[1].previewImages[0])

  useEffect(() => {
    dispatch(writeSpots())
  }, [dispatch])

  return (
    <>
        <ul>
          <div className='spot-containers'>
            {/* {spots.map((spot) => (
              <ul>
                <li>{spot.previewImages[0]}, rating: {spot.avgRating}</li>
                <li>{spot.city}, {spot.state}</li>
                <li>${spot.price} per night</li>
              </ul>
            ))} */}
          </div>
          <div className='spot-container'>
            {spots.map((spot) => (
              <SpotIndexItem
                spot={spot}
                key={spot.id}
              />
            ))}
          </div>
        </ul>
    </>
  );
}

export default SpotIndex;
