import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SpotsCreate.css'

export default function SpotCreate() {
    const history = useHistory()
    const [country, setCountry] = useState('')
    return (
        <>
            <h1>Create a New Spot</h1>
            <form>
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
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type='text'
                            placeholder='city'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type='text'
                            placeholder='state'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                </section>
                <section>
                    <h2>Describe your place to guests</h2>
                    <div>Mention the best features of your space, any special amenitities like fast wifi or parking, and what you love about the neighborhood.</div>
                    <textarea
                        placeholder='Please write at least 30 characters'
                    />
                </section>
                <section>
                    <h2>Create a title for your spot</h2>
                    <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                    <input
                        type='text'
                        placeholder="Name of your spot"
                    />
                </section>
                <section>
                    <h2>Set a base price for your spot</h2>
                    <div>Competitive pricing can help your listing stand out and rank higher in search results</div>
                    <input
                        type='number'
                        placeholder='Price per night (USD)'
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
            {/* <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <div className="errors">{errors.understanding}</div>
            <label>
            Understanding:
            <input
                type="text"
                value={understanding}
                onChange={(e) => setUnderstanding(e.target.value)}
            />
            </label>
            <div className="errors">{errors.improvement}</div>
            <label>
            Improvement:
            <textarea
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
            />
            </label>
            <button type="submit">{formType}</button>
        </form> */}
      </>
    )
}
