import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch()
//   const handleDelete = (e) => {
//     e.preventDefault();
//     dispatch(deleteReports(report.id))
//   };

  return (
    <li>
      <div className="li-contents-flex">
        <Link to={`api/spots/${spot.id}`}>Report #{spot.id}</Link>
        {/* <div className="buttons-container">
          <button onClick={handleDelete}>Delete</button>
        </div> */}
      </div>
    </li>
  );
};

export default SpotIndexItem;
