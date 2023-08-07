import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chooseSpot } from '../../store/spots';
import './SpotsShow.css'
import ReviewCreate from '../ReviewsCreate/ReviewsCreate';
import { makeReview, obtainSpotReviews } from '../../store/reviews';
import { FaStar } from 'react-icons/fa'
import ReviewDelete from '../ReviewsDelete/ReviewsDelete';
import ReviewShow from './ReviewsShow';

const SpotShow = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const [goToSpot, setGoToSpot] = useState(spotId);
  const chosenSpot = useSelector(state => state.spots.singleSpot); // populate from Redux store
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.reviews.spot[spotId])
  const { spot, numReviews } = chosenSpot
  let { avgStarRating } = chosenSpot
  let user = useSelector(state => state.session.user)
  if (!user) user = 0

  function lessThanOneDecimal(num) {
    const parts = num.toString().split('.')
    return parts.length === 1 || (parts.length === 2 && parts[1].length <= 1)
  }

  if (avgStarRating) if (!lessThanOneDecimal(avgStarRating)) avgStarRating = avgStarRating.toFixed(2)

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
  if (!spot) return null

  let reviewsArr = Object.values(reviews)
  let sortedReviews = [...reviewsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section>
      <div className="spot-table">
        <div>
          <div>
            <div className="show-header"><h1>{spot?.name}</h1></div>
          </div>
        </div>
          <div>
            <div className="header-stuff"><FaStar />{avgStarRating === 0 ? "New" + " · " : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews") + " ·"} {spot?.city}, {spot?.state}, {spot?.country}</div>
          </div>
          <div className="parent-flex-container">
            <div className='stuffss-1'>
              <img className="circular-image" src={spot?.SpotImages[0].url} />
            </div>
            <div className="mapped-images-container">
              {spot?.SpotImages.filter((image, index) => index !== 0).map((image, index) => (
                <img key={index} src={image.url} className="circular-image" />
                ))}
            </div>
            </div>
            <div className="callout">
              <div className="callout-header">${spot?.price} night</div>
              <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
              <div className="callout-container">
                <button onClick={alerting}>Reserve</button>
              </div>
            </div>
            <div className='under-image-container'>
              <div>
                {/* <td className="attribute">Hosted By:</td> */}
                <div className="under-image-text">Hosted By: {spot?.User.firstName}, {spot?.User.lastName}</div>
              </div>
              <div>
                <div className='under-image-text-2'>{spot?.description}</div>
              </div>
            </div>
            <section>
              {spot?.ownerId !== user.id && Object.keys(reviews).length === 0
              ? (user === 0 ? <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div> :
              (
                <div>
                  <div><FaStar />{avgStarRating === 0 ? "New" : (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : avgStarRating) + " · " + (numReviews === 1 ? "1 Review" : numReviews + " Reviews")}</div>
                  <div>Be the first to post a review!</div>
                  <div><ReviewCreate spotId={spotId}/></div>
                </div>
              ))
              : <ReviewShow avgStarRating={avgStarRating} reviews={reviews} user={user} numReviews={numReviews} spotId={spotId} spot={spot}/>}
            </section>
          </div>
    </section>
  );
};

export default SpotShow;
