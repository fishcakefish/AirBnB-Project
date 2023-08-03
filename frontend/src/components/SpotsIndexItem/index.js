import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeSpot } from '../../store/spots';
import "./SpotsIndexItem.css";

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch()
  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(removeSpot(spot.id))
  //   console.log('did')
  // };

  const displayImage = spot.previewImages ? spot.previewImages : null
  let rating = spot.avgRating
  if (rating === 0) rating = 'New'

  return (
    <>
      <Link to={`/spots/${spot.id}`}>
        <div className="spots-items-container">
          <img src={displayImage} />
          <div className="title-rating">
            <div>{spot.city}, {spot.state}</div>
            {/* <div>Rating: {spot.avgRating}</div> */}
          </div>
          <div>Rating: {rating}</div>
          <div>${spot.price} night</div>
        </div>
      </Link>
      {/* <button onClick={handleDelete}>delete {spot.id}</button> */}
    </>
  );
};

export default SpotIndexItem;

      {/* <div className="buttons-container">
        <button onClick={handleDelete}>Delete</button>
      </div> */}
