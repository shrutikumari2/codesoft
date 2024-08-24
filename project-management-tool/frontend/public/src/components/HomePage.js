import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/projects', { headers: { Authorization: `Bearer ${token}` } });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <div>
        {projects.map((project) => (
          <div key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <h2>{project.name}</h2>
            </Link>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <Link to="/create-project">Create Project</Link>
    </div>
  );
};

export default HomePage;
