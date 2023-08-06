import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
        <div className='container'>
            <div className='header'>
                <NavLink exact to="/">
                    <img src="/images/airbnblogo3.png" width="110" height="60" alt="AirBnB Logo" />
                </NavLink>
                <div className='subHeader'>
                    {/* <div className='header-spot-button'>
                        <button>Create a New Spot</button>
                    </div> */}
                    <ul>
                        {isLoaded && (
                            <ProfileButton user={sessionUser} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
}

export default Navigation;
