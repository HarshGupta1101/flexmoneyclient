import React, { useState } from 'react';
import '../css/register.css';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    name: '',
    age: '',
    phone: '',
    batch: '',
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handlePhoneInput = (e) => {
    setUser({ ...user, phone: e.target.value.replace(/\D/g, '') });
  };

  const handleAgeInput = (e) => {
    let newAge = e.target.value.replace(/\D/g, '');
    if (newAge.length === 2) {
      let newAgeVal = parseInt(newAge);
      if (newAgeVal >= 18 && newAgeVal <= 65) {
        setUser({ ...user, age: newAge });
      }
    } else {
      setUser({ ...user, age: newAge });
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { email, name, age, phone, batch } = user;

    const res = await fetch('https://splendid-tux-wasp.cyclic.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        age,
        phone,
        batch,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert('Registration Failed');
      console.log('Registration Failed');
    } else {
      window.alert('Registration Successful');
      console.log('Registration Successful');
      navigate(`/payments/${data.message}`);
    }
  };
  return (
    <>
      <div className='container' id='container'>
        <div className='form-container sign-in-container'>
          <form method='POST'>
            <h1>Register Here</h1>
            <input
              type='email'
              name='email'
              placeholder='Email'
              required
              value={user.email}
              onChange={handleInputs}
            />
            <input
              type='text'
              name='name'
              placeholder='Name'
              required
              value={user.name}
              onChange={handleInputs}
            />
            <input
              type='text'
              name='phone'
              placeholder='9782121132'
              minLength='10'
              maxLength='10'
              required
              value={user.phone}
              onChange={handlePhoneInput}
            />
            <input
              type='text'
              name='age'
              minLength='2'
              maxLength='2'
              required
              placeholder='Age (18-65)'
              value={user.age}
              onChange={handleAgeInput}
            />
            <select
              name='batch'
              value={user.batch}
              onChange={handleInputs}
              required
              style={{ width: '285px', marginTop: '0.5rem', height: '35px' }}
            >
              <option value=''>-- Select Batch --</option>
              <option value='6-7AM'>6-7AM</option>
              <option value='7-8AM'>7-8AM</option>
              <option value='8-9AM'>8-9AM</option>
              <option value='5-6PM'>5-6PM</option>
            </select>
            <br />
            <button
              type='button'
              name='register'
              id='register'
              onClick={PostData}
            >
              Register
            </button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start journey with us</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
