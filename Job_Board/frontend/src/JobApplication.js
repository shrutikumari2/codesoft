import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobApplication = () => {
  const { jobId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const application = { jobId, name, email, resume };
    try {
      await axios.post('/api/applications/apply', application);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Job</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Resume URL" value={resume} onChange={(e) => setResume(e.target.value)} required />
      <button type="submit">Apply</button>
    </form>
  );
};

export default JobApplication;
