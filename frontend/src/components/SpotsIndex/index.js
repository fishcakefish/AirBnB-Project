import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SpotsIndex.css';
import { writeSpots } from '../../store/spots';

function SpotsIndex({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots))
  console.log(spots)

  useEffect(() => {
    dispatch(writeSpots())
  }, [dispatch])

  return (
    <>
        <div>hello</div>
    </>
  );
}

export default SpotsIndex;
