import { useEffect, useState } from "react"
import { FaStar } from 'react-icons/fa'
import './StarsRatingReview.css'

export default function StarRatingReview({ rating, disabled, onChange }) {
    const [activeRating, setActiveRating] = useState(rating)

    useEffect(() => {
        setActiveRating(rating)
    }, [rating])

    const starsIcon = (number) => {
        const props = {}
        if (!disabled) {
            props.onMouseEnter = () => setActiveRating(number)
            props.onMouseLeave = () => setActiveRating(rating)
            props.onClick = () => onChange(number)
        }
        return (
            <div key={number} className={activeRating >= number ? "filled" : "empty"} {...props}>
                <FaStar />
            </div>
        )
    }

    return (
        <>
            <div className="rating-input">
                {[1, 2, 3, 4, 5].map(number => starsIcon(number))}
                <div>Stars</div>
            </div>
        </>
    )
}
