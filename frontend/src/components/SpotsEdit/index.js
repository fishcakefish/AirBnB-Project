import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SpotsEdit.css'
import { useDispatch } from 'react-redux';
import { editCurrentSpot } from '../../store/spots';

export default function SpotEdit({ userSpot }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(userSpot?.country)
    const [address, setAddress] = useState(userSpot?.address)
    const [city, setCity] = useState(userSpot?.city)
    const [state, setState] = useState(userSpot?.state)
    const [name, setName] = useState(userSpot?.name)
    const [price, setPrice] = useState(userSpot?.price)
    const [description, setDescription] = useState(userSpot?.description)
    const [lat, setLat] = useState(userSpot?.lat)
    const [lng, setLng] = useState(userSpot?.lng)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!country) validationErrors.country = 'Please provide a valid country'
        if (!address) validationErrors.address = 'Please provide a valid address'
        if (!city) validationErrors.city = 'Please provide a valid city'
        if (!state) validationErrors.state = 'Please provide a valid state'
        if (!name) validationErrors.name = 'Please provide a valid name'
        if (name.length >= 50) validationErrors.name = 'Name must be less than 50 characters'
        if (!price) validationErrors.price = 'Please provide a valid price'
        if (!description) validationErrors.description = 'Please provide a valid description'
        if (description.length < 30) validationErrors.description = 'Description needs 30 or more characters'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }

        const spot = { address, city, state, country, lat, lng, name, description, price }
        try{
            await dispatch(editCurrentSpot(spot, userSpot.id))
            history.push(`/spots/${userSpot.id}`)
        } catch (error){
            console.error('Error creating spot:', error)
        }
    }
    return (
        <>
        <div className='create-spot-container'>
            <h1>Update your Spot</h1>
            <form onSubmit={handleSubmit}>
            <div className='create-spot-sub'>
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
                    {errors.country && <p>{errors.country}</p>}
                    <label>
                        Street Adress:
                        <input
                            type='text'
                            placeholder='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    {errors.address && <p>{errors.address}</p>}
                    <label>
                        City:
                        <input
                            type='text'
                            placeholder='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {errors.city && <p>{errors.city}</p>}
                    <label>
                        State:
                        <input
                            type='text'
                            placeholder='state'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    {errors.state && <p>{errors.state}</p>}
                </section>
                <section>
                    <h2>Describe your place to guests</h2>
                    <div>Mention the best features of your space, any special amenitities like fast wifi or parking, and what you love about the neighborhood.</div>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p>{errors.description}</p>}
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
                    {errors.name && <p>{errors.name}</p>}
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
                    {errors.price && <p>{errors.price}</p>}
                </section>
                </div>
                <button type="submit">Update your Spot</button>
            </form>
        </div>
      </>
    )
}
