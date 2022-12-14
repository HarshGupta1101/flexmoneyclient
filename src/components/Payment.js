import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/register.css';
import { useNavigate } from 'react-router-dom';

function PaymentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [payment, setPayment] = useState({
    amount: '',
    cardno: '',
    cvv: '',
    otp: '',
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value.replace(/\D/g, '');
    setPayment({ ...payment, [name]: value });
  };

  const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    setPayment({ ...payment, otp: OTP });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { cardno, cvv, amount, otp } = payment;

    const res = await fetch(
      `https://splendid-tux-wasp.cyclic.app/payment/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardno,
          cvv,
          amount,
          otp,
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert('Payment Failed');
      console.log('Payment Failed');
    } else {
      window.alert('Payment Successful');
      console.log('Payment Successful');
      navigate('/');
    }
  };
  return (
    <>
      <div className='container' id='container'>
        <div className='form-container sign-in-container'>
          <form method='PUT'>
            <h1>Make Payment</h1>
            <input
              type='text'
              name='cardno'
              placeholder='Card Number'
              minLength='16'
              maxLength='16'
              required
              value={payment.cardno}
              onChange={handleInputs}
            />
            <input
              type='text'
              name='cvv'
              placeholder='Enter CVV'
              minLength='3'
              maxLength='3'
              required
              value={payment.cvv}
              onChange={handleInputs}
            />
            <button type='button' onClick={generateOTP}>
              Generate OTP
            </button>
            <input
              type='text'
              name='otp'
              readOnly
              required
              value={payment.otp}
            />
            <select
              name='amount'
              value={payment.amount}
              onChange={handleInputs}
              required
              style={{ width: '285px', marginTop: '0.5rem', height: '35px' }}
            >
              <option value=''>-- Amount To Pay --</option>
              <option value='500'>500</option>
            </select>
            <br />
            <button type='button' name='pay' onClick={PostData}>
              Pay
            </button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-right'>
              <h1>Make, Payment!</h1>
              <p>To get started with training</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
