import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./SpotsIndexItem.css";
import { FaStar } from 'react-icons/fa'

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch()

  const displayImage = spot.previewImages ? spot.previewImages : null
  let rating = spot.avgRating
  if (rating === 0) rating = 'New'

  return (
    <>
      <Link className="no-underline" to={`/spots/${spot.id}`}>
        <div className="spots-items-container" title={spot.name}>
          <img className="circular-image" src={displayImage[0]} />
          <div className="title-rating">
            <div>{spot.city}, {spot.state}</div>
            <div className='star'><FaStar />{rating}</div>
          </div>
          <div>${spot.price} night</div>
        </div>
      </Link>
      {/* <button onClick={handleDelete}>delete {spot.id}</button> */}
    </>
  );
};

export default SpotIndexItem;
