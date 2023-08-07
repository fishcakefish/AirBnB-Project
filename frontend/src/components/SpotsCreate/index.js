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
    const [errors, setErrors] = useState({});
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')

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
        if (!img1) validationErrors.img1 = 'Please provide a valid image url'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }

        const spot = { address, city, state, country, lat, lng, name, description, price }
        const imgArray = [img1, img2, img3, img4, img5].filter(img => img)

        try {
            const newSpot = await dispatch(createSpot(spot, user, imgArray))
            history.push(`/spots/${newSpot.id}`)
        } catch (error) {
            console.error('Error creating spot:', error)
        }
    }
    //test
    return (
        <>
        <div className='create-spot-container'>
            <h1>Create a New Spot</h1>
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
                <section>
                    <h2>Liven up your spot with photos</h2>
                    <div>Submit a link to at least one photo to publish your spot.</div>
                    <input
                        type='text'
                        placeholder='Preview Image URL'
                        value={img1}
                        onChange={(e) => setImg1(e.target.value)}
                    />
                    {errors.img1 && <p>{errors.img1}</p>}
                    <input
                        type='text'
                        placeholder='Image URL'
                        value={img2}
                        onChange={(e) => setImg2(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                        value={img3}
                        onChange={(e) => setImg3(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                        value={img4}
                        onChange={(e) => setImg4(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Image URL'
                        value={img5}
                        onChange={(e) => setImg5(e.target.value)}
                    />
                </section>
                </div>
                <button type="submit" className='submit-booton'>Create Spot</button>
            </form>
        </div>
      </>
    )
}
