import React, { useState } from 'react';
import './LeadForm.css'; // import the CSS styles

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await fetch('https://lead-format-backend-d44t6zqla-ganesh11-ps-projects.vercel.app/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});


    if (response.ok) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } else {
      alert('Failed to submit the lead.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
};


  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h2>Lead Generation Form</h2>

      {success && <p className="success">Lead submitted successfully!</p>}

      <label>
        Name <span>*</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>

      <label>
        Email <span>*</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>

      <label>
        Company
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LeadForm;
