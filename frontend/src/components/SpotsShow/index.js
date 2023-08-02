import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chooseSpot } from '../../store/spots';
import './SpotsShow.css'

const SpotShow = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const [goToSpot, setGoToSpot] = useState(spotId);
  const chosenSpot = useSelector(state => state.spots.singleSpot); // populate from Redux store
  const dispatch = useDispatch()

  // const { city, state, country, description } = spot.spot
  // const { firstName, lastName } = spot.spot.User

  const { spot } = chosenSpot

  useEffect(() => {
    if (!spot) {
      dispatch(chooseSpot(spotId))
      console.log('hi')
    }
  }, [dispatch])

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
          <div>
            {spot?.SpotImages.map((image) => (
              <img src={image.url}/>
            ))}
          </div>
          <tr>
            {/* <td className="attribute">Hosted By:</td> */}
            <td className="value">Hosted By: {spot?.User.firstName}, {spot?.User.lastName}</td>
          </tr>
          <tr>
            <td>Paragraph: {spot?.description}</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="footer">
        <Link
          className="back-button"
          to="/"
        >
          Back to Report Index
        </Link>
        <form className="go-to-report-form" onSubmit={handleSubmit}>
          Go to Report #
          <input
            type="number"
            min={1}
            max={99}
            value={goToReport}
            onChange={(e) => setGoToReport(e.target.value)}
            required
          />
        </form>
      </div> */}
    </section>
  );
};

export default SpotShow;
