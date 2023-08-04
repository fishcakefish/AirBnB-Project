import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { makeReview } from "../../store/reviews";
import StarRatingReview from "./StarsRatingInput";

export default function ReviewsPostButton({spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [disabled, setDisabled] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let reviewData = {}
        console.log('hi')
        reviewData.review = review
        reviewData.stars = rating
        console.log('heelo')
        await dispatch(makeReview(reviewData, spotId, rating))
        closeModal()
    }

    const onChange = (number) => {
        setRating(parseInt(number))
    }

    useEffect(() => {
        if (review.length < 10 || rating === 0) setDisabled(true)
        else setDisabled(false)
    }, [review, rating])

    return (
        <>
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                <section className="post-review-button-container">
                    <textarea
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <StarRatingReview
                        disabled={false}
                        onChange={onChange}
                        rating={rating}
                    />
                </section>
                <input type="submit" value="Submit Your Review" disabled={disabled}/>
            </form>
        </>
    )
}

//     function refreshPage() {
//         window.location.reload(false);
//     }

//     const onClick = (e) => {
//         dispatch(removeSpot(spotId))
//         closeModal()
//         refreshPage()
//     }

//     return (
//         <>
//             <div className="delete-button-container">
//                 <h2>Confirm Delete?</h2>
//                 <h5>Are you sure you want to remove this spot?</h5>
//                 <div className="choose-destiny-container">
//                     <button onClick={onClick} className="yes-butt">Yes (Delete Spot)</button>
//                     <button onClick={closeModal} className="no-butt">No (Keep Spot)</button>
//                 </div>
//             </div>
//         </>
//     )
// }
