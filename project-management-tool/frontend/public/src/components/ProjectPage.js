import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProject(res.data);
    };
    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Tasks</h2>
      {project.tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>{task.deadline}</p>
          <p>{task.status}</p>
        </div>
      ))}
      <Link to={`/projects/${id}/add-task`}>Add Task</Link>
    </div>
  );
};

export default ProjectPage;
