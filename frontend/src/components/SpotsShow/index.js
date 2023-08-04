import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chooseSpot } from '../../store/spots';
import './SpotsShow.css'
import ReviewCreate from '../ReviewsCreate/ReviewsCreate';
import { makeReview, obtainSpotReviews } from '../../store/reviews';
import { FaStar } from 'react-icons/fa'
import ReviewDelete from '../ReviewsDelete/ReviewsDelete';

const SpotShow = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const [goToSpot, setGoToSpot] = useState(spotId);
  const chosenSpot = useSelector(state => state.spots.singleSpot); // populate from Redux store
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.reviews.spot[spotId])
  const { spot, avgStarRating, numReviews } = chosenSpot
  const user = useSelector(state => state.session.user)

  const alerting = () => {
    alert("Feature coming soon")
  }

  useEffect(() => {
    if (!spot) {
      dispatch(chooseSpot(spotId))
    }
  }, [dispatch])

  useEffect(() => {
    if (!reviews) {
      dispatch(obtainSpotReviews(spotId))
    }
  }, [dispatch])

  if (!reviews) return null

  let reviewsArr = Object.values(reviews)
  let sortedReviews = [...reviewsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(sortedReviews)

  return (
    <section>
      <table className="spot-table">
        <thead>
          <tr>
            <th colSpan="2">Spot #{spotId}, {spot?.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td className="attribute">Location:</td> */}
            <td className="value">Location: {spot?.city}, {spot?.state}, {spot?.country}</td>
          </tr>
          <div className='stuffss'>
            <div>
              {spot?.SpotImages.map((image) => (
                <img src={image.url}/>
              ))}
            </div>
            <div className="callout">
              <div className="callout-header">${spot?.price} night</div>
              <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
              <div className="callout-container">
                <button onClick={alerting}>Reserve</button>
              </div>
            </div>
          </div>
          <tr>
            {/* <td className="attribute">Hosted By:</td> */}
            <td className="value">Hosted By: {spot?.User.firstName}, {spot?.User.lastName}</td>
          </tr>
          <tr>
            <td>Paragraph: {spot?.description}</td>
          </tr>
        </tbody>
        <ReviewCreate spotId={spotId}/>
        <section>
          <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
          <div>{sortedReviews.map((review) => {
            const date = new Date(review.createdAt)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return <div key={review.id}>
              <div>(first & last name) {review.User.firstName} - {review.User.lastName}</div>
              <div>(month year) {month} {year}</div>
              <div>(review) {review.review}</div>
              <div>{review.userId === user.id ? <ReviewDelete /> : ''}</div>
            </div>
          })}</div>
        </section>
      </table>
    </section>
  );
};

export default SpotShow;
