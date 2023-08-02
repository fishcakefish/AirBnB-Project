import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SpotsCreate.css'
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';

export default function SpotCreate() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [lat, setLat] = useState(1.1234)
    const [lng, setLng] = useState(-1.1234)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const spot = { address, city, state, country, lat, lng, name, description, price }
        const newSpot = await dispatch(createSpot(spot, user))
        // history.push(`/spots/${newSpot.id}`)
    }
    return (
        <>
            <h1>Create a New Spot</h1>
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
                <button type="submit">Create Spot</button>
            </form>
      </>
    )
}
