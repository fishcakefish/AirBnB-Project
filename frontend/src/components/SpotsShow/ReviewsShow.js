import { FaStar } from "react-icons/fa"
import ReviewDelete from "../ReviewsDelete/ReviewsDelete"
import OpenModalButton from "../OpenModalButton";

export default function ReviewShow({ user, reviews, avgStarRating, numReviews }) {
    let reviewsArr = Object.values(reviews)
    let sortedReviews = [...reviewsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <>
            <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
            <div>{sortedReviews.map((review) => {
            const date = new Date(review.createdAt)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return <div key={review.id}>
              <div>(first & last name) {review.User.firstName} - {review.User.lastName}</div>
              <div>(month year) {month} {year}</div>
              <div>(review) {review.review}</div>
              <div>{review.userId === user.id ? <OpenModalButton buttonText='Delete' modalComponent={<ReviewDelete />}/> : ''}</div>
            </div>
            })}</div>
        </>
    )
}
