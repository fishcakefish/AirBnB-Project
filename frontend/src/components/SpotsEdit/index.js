import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './SpotsEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentSpot } from '../../store/spots';

export default function SpotEdit({ userSpot }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log(userSpot)
    const [country, setCountry] = useState(userSpot?.country)
    const [address, setAddress] = useState(userSpot?.address)
    const [city, setCity] = useState(userSpot?.city)
    const [state, setState] = useState(userSpot?.state)
    const [name, setName] = useState(userSpot?.name)
    const [price, setPrice] = useState(userSpot?.price)
    const [description, setDescription] = useState(userSpot?.description)
    const [lat, setLat] = useState(userSpot?.lat)
    const [lng, setLng] = useState(userSpot?.lng)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const spot = { address, city, state, country, lat, lng, name, description, price }
        await dispatch(editCurrentSpot(spot, userSpot.id))
        history.push(`/spots/${userSpot.id}`)
    }
    return (
        <>
            <h1>Update your Spot</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <h2>Where's your place located?</h2>
                    <div>Guests will only get your exact address once they booked a reservation.</div>
                    <label>
                        Country:
                        <input
                            type='text'
                            placeholder='country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        Street Adress:
                        <input
                            type='text'
                            placeholder='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type='text'
                            placeholder='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type='text'
                            placeholder='state'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </section>
                <section>
                    <h2>Describe your place to guests</h2>
                    <div>Mention the best features of your space, any special amenitities like fast wifi or parking, and what you love about the neighborhood.</div>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </section>
                <section>
                    <h2>Create a title for your spot</h2>
                    <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                    <input
                        type='text'
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </section>
                <section>
                    <h2>Set a base price for your spot</h2>
                    <div>Competitive pricing can help your listing stand out and rank higher in search results</div>
                    <input
                        type='number'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </section>
                <section>
                    <h2>Liven up your spot with photos</h2>
                    <div>Submit a link to at least one photo to publish your spot.</div>
                    <input
                        type='text'
                        placeholder='Preview Image URL'
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                    />
                </section>
                <button type="submit">Update your Spot</button>
            </form>
      </>
    )
}
