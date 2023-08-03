import React from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { removeSpot } from "../../store/spots";
import './DeleteButton.css'

export default function DeleteButton({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    function refreshPage() {
        window.location.reload(false);
    }

    const onClick = (e) => {
        dispatch(removeSpot(spotId))
        closeModal()
        refreshPage()
    }

    return (
        <>
            <div className="delete-button-container">
                <h2>Confirm Delete?</h2>
                <h5>Are you sure you want to remove this spot?</h5>
                <div className="choose-destiny-container">
                    <button onClick={onClick} className="yes-butt">Yes (Delete Spot)</button>
                    <button onClick={closeModal} className="no-butt">No (Keep Spot)</button>
                </div>
            </div>
        </>
    )
}
