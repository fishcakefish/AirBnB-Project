import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SpotsIndex.css';
import { writeSpots } from '../../store/spots';
import SpotIndexItem from '../SpotsIndexItem';

function SpotIndex({ isLoaded }){
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots.allSpots))

  useEffect(() => {
    dispatch(writeSpots())
  }, [dispatch])

  return (
    <>
        <ul>
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
