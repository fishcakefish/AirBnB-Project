import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeSpot } from '../../store/spots';
import "./SpotsCurrentItem.css";

export default function SpotCurrentItem({ spot }) {
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
        <div className="spots-items-container">
            <Link to={`/spots/${spot.id}`}>
                <img src={displayImage} />
                <div className="title-rating">
                    <div>{spot.city}, {spot.state}</div>
                </div>
                <div>Rating: {rating}</div>
                <div>${spot.price} night</div>
            </Link>
            <div className='button-container'>
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    </>
  );
};
