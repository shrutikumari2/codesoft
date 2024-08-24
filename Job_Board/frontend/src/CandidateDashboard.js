import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get('/api/candidate/applications');
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  return (
    <div>
      <h2>Candidate Dashboard</h2>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            <h3>{application.job.title}</h3>
            <p>{application.job.company}</p>
            <p>{application.appliedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateDashboard;
