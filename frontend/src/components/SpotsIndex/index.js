import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SpotsIndex.css';
import { writeSpots } from '../../store/spots';
import SpotIndexItem from '../SpotsIndexItem';

function SpotIndex({ isLoaded }){
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots))
  // console.log(spots[1].previewImages[0])

  useEffect(() => {
    dispatch(writeSpots())
  }, [dispatch])

  return (
    <>
        <ul>
          {/* <li>{spots[1].previewImages[0]}, rating: {spots[1].avgRating}</li>
          <li>{spots[1].city}, {spots[1].state}</li>
          <li>${spots[1].price} night</li>
          {spots.map((spot) => {
            <SpotIndexItem
              spot={spot}
              key={spot.id}
            />
          })} */}
          hello
        </ul>
    </>
  );
}

export default SpotIndex;
