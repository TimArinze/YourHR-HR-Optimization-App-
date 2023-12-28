import React, { useState } from 'react'
import './styles/ProfilePersonal.css'

function ProfilePersonal() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
  })

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveChanges = () => {
    // Add logic to save changes (e.g., send data to a server)
    alert('Changes saved!');
    setIsEditing(false);
  };

  return (
    <div className='personal-form-container'>
      <div className='personal-form-header'>
        <h2>Form Title</h2>
        <button onClick={toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label htmlFor='lastName'>Last Name</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <button type='button' onClick={saveChanges} style={{ display: isEditing ? 'inline-block' : 'none' }}>
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfilePersonal