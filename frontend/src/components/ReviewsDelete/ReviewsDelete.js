import React from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { destroyReview } from "../../store/reviews";
import './ReviewsDelete.css'

export default function ReviewDelete({spotId, reviewId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    function refreshPage() {
        window.location.reload(false)
    }

    const onClick = (e) => {
        dispatch(destroyReview(reviewId, spotId))
        closeModal()
        refreshPage()
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
