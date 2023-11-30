import React, { useState, useEffect } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '' });
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validatePersonalDetails = () => {
    const errors = {};
    if (!personalDetails.name.trim()) {
      errors.name = 'Name is required';
    }
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!personalDetails.email.trim() || !emailRegex.test(personalDetails.email.trim())) {
      errors.email = 'Valid email is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAddress = () => {
    const errors = {};
    if (!address.street.trim()) {
      errors.street = 'Street is required';
    }
    if (!address.city.trim()) {
      errors.city = 'City is required';
    }
    const zipRegex = /^\d+$/;
    if (!address.zip.trim() || !zipRegex.test(address.zip.trim())) {
      errors.zip = 'Valid ZIP code is required (numeric only)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentDetails = () => {
    const errors = {};
    const cardNumberRegex = /^\d{9}$/;
    if (!paymentDetails.cardNumber.trim() || !cardNumberRegex.test(paymentDetails.cardNumber.trim())) {
      errors.cardNumber = 'Valid card number is required (9 digits only)';
    }

    const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!paymentDetails.expiryDate.trim() || !dateRegex.test(paymentDetails.expiryDate.trim())) {
      errors.expiryDate = 'Valid expiry date is required (mm/yyyy)';
    }

    const cvvRegex = /^\d{3}$/;
    if (!paymentDetails.cvv.trim() || !cvvRegex.test(paymentDetails.cvv.trim())) {
      errors.cvv = 'Valid CVV is required (3 digits only)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePersonalDetails() && validateAddress() && validatePaymentDetails()) {
      // Do something with the form data (e.g., submit to server)
      // For demonstration, we'll just log the data
      console.log('Submitted Data:', {
        personalDetails,
        address,
        paymentDetails,
      });
      setSubmitted(true);
    }
  };

  const handleNext = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validatePersonalDetails();
    } else if (step === 2) {
      isValid = validateAddress();
    } else if (step === 3) {
      isValid = validatePaymentDetails();
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    setPersonalDetails({ name: '', email: '' });
    setAddress({ street: '', city: '', zip: '' });
    setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '' });
    setFormErrors({});
    setSubmitted(false);
    setStep(1);
  };

  useEffect(() => {
    setFormErrors({});
  }, [step]);

  return (
    <div className="multi-step-form-container">
      <h1>Multi-Step Form</h1>
      {submitted ? (
        <div className="thank-you-message">
          <p>Thank you for submitting the form!</p>
          <button onClick={handleReset}>Submit Another Form</button>
        </div>
      ) : (
        <div className="form-step">
          {step === 1 && (
            <div>
              <h2>Step 1: Personal Details</h2>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                  />
                  {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  />
                  {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
              </form>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2>Step 2: Address</h2>
              <form>
                <div className="form-group">
                  <label>Street:</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  />
                  {formErrors.street && <p className="error-message">{formErrors.street}</p>}
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                </div>
                <div className="form-group">
                  <label>ZIP:</label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  />
                  {formErrors.zip && <p className="error-message">{formErrors.zip}</p>}
                </div>
              </form>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2>Step 3: Payment Details</h2>
              <form>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  />
                  {formErrors.cardNumber && <p className="error-message">{formErrors.cardNumber}</p>}
                </div>
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                  />
                  {formErrors.expiryDate && <p className="error-message">{formErrors.expiryDate}</p>}
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  />
                  {formErrors.cvv && <p className="error-message">{formErrors.cvv}</p>}
                </div>
              </form>
            </div>
          )}
          <div className="form-navigation">
            {step > 1 && <button onClick={handlePrev}>Previous</button>}
            {step < 3 ? <button onClick={handleNext}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
