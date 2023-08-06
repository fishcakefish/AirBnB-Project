import { FaStar } from "react-icons/fa"
import ReviewDelete from "../ReviewsDelete/ReviewsDelete"
import OpenModalButton from "../OpenModalButton";
import ReviewCreate from "../ReviewsCreate/ReviewsCreate";

export default function ReviewShow({ user, reviews, avgStarRating, numReviews, spotId, spot }) {
    let reviewsArr = Object.values(reviews)
    let sortedReviews = [...reviewsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let reviewCheck = sortedReviews.filter((review) => review.userId === user.id).length
    const userReview = sortedReviews.filter((review) => review.userId === user.id)[0];
    const reviewId = userReview ? userReview.id : null;
    return (
        <>
            <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
            <div>{user && reviewCheck === 0 ? (spot.ownerId !== user.id ? <ReviewCreate spotId={spotId}/> : '') : ''}</div>
            <div>{sortedReviews.map((review) => {
            const date = new Date(review.createdAt)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return <div key={review.id}>
              <div>(first & last name) {review.User.firstName} - {review.User.lastName}</div>
              <div>(month year) {month} {year}</div>
              <div>(review) {review.review}</div>
              <div>
                {review.userId === user.id && reviewId &&
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<ReviewDelete spotId={spotId} reviewId={reviewId}/>}
                    />
                }
              </div>
            </div>
            })}</div>
        </>
    )
}
