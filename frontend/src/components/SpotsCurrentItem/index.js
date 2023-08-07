import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import React, { useState } from 'react'
import "./SpotsCurrentItem.css";
import DeleteButton from './DeleteButton';
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';

export default function SpotCurrentItem({ spot }) {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.allSpots)

  const displayImage = spot.previewImages ? spot.previewImages : null
  let rating = spot.avgRating
  if (rating === 0) rating = 'New'

  return (
    <>
        <div className="spots-items-container">
            <Link className={'no-underline'} to={`/spots/${spot.id}`}>
                <div className="spots-items-container">
                    <img className="circular-image" src={displayImage[0]} />
                    <div className="title-rating">
                        <div>{spot.city}, {spot.state}</div>
                        <div className='star'><FaStar />{rating}</div>
                    </div>
                    <div>${spot.price} night</div>
                </div>
            </Link>
            <div className='button-container'>
                <Link to={`/spots/edit/${spot.id}`}><button>Update</button></Link>
                <OpenModalButton buttonText='Delete' modalComponent={<DeleteButton spotId={spot.id}/>}/>
            </div>
        </div>
    </>
  );
};
