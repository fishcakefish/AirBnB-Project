import './ReviewsCreate.css'
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import React from 'react'
import ReviewPostButton from './ReviewsPostButton';

export default function ReviewCreate({spotId}) {
    const userId = useSelector(state => state.session.user.id)
    return (
        <>
            <OpenModalButton buttonText='Post Your Review' modalComponent={<ReviewPostButton spotId={spotId}/>}/>
        </>
    )
}
