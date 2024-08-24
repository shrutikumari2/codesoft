import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      const res = await axios.get('/api/jobs/featured');
      setFeaturedJobs(res.data);
    };
    fetchFeaturedJobs();
  }, []);

  return (
    <div>
      <h1>Welcome to Job Board</h1>
      <h2>Featured Job Listings</h2>
      <ul>
        {featuredJobs.map((job) => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
