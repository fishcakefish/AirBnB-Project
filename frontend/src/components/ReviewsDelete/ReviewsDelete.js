import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { destroyReview } from "../../store/reviews";
import './ReviewsDelete.css'

export default function ReviewDelete({spotId, reviewId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [reviewsUpdated, setReviewsUpdated] = useState(false)

    const onClick = (e) => {
        dispatch(destroyReview(reviewId, spotId))
        closeModal()
        window.location.reload()
    }

    return (
        <div className="reviews-delete-container">
            <h2>Confirm Delete</h2>
            <h5>Are you sure you want to delete this review?</h5>
            <div className="choose-destiny-2-container">
                <button onClick={onClick} className="yes-butt">Yes (Delete Review)</button>
                <button onClick={closeModal} className="no-butt">No (Keep Review)</button>
            </div>
        </div>
    )
}
