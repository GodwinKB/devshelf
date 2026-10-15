import { useState, useEffect } from 'react';
import api from '../api/client';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState('');

  const fetchTasks = async (statusFilter = '') => {
    try {
      setLoading(true);
      const url = statusFilter ? `/tasks?status=${statusFilter}` : '/tasks';
      const res = await api.get(url);
      setTasks(res.data);
    } catch (err) {
      alert('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filterStatus);
  }, [filterStatus]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', {
        title,
        description,
        status: 'todo',
        priority,
        project,
      });
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
      setProject('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create task');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/tasks/${id}/status`, { status: newStatus });
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <div>
          <h1>Developer Tasks</h1>
          <p>Track your feature backlog, bugs, and learning roadmap.</p>
        </div>

        <div className="filter-group">
          <label className="filter-label">Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)} 
            className="filter-select"
          >
            <option value="">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleCreate} className="task-form">
        <h3>Create New Task</h3>
        <div className="form-grid">
          <InputField 
            label="Title *" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Implement refresh token flow" 
            required 
          />
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)} 
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-grid">
          <InputField 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Details or acceptance criteria" 
          />
          <InputField 
            label="Project" 
            value={project} 
            onChange={(e) => setProject(e.target.value)} 
            placeholder="e.g. DevShelf Frontend" 
          />
        </div>

        <Button type="submit" className="btn-primary">
          Add Task
        </Button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found for this filter.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status === 'done' ? 'task-done' : ''}`}>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className={`task-priority priority-${task.priority}`}>
                  {task.priority}
                </span>
                {task.project && (
                  <span className="task-project">[{task.project}]</span>
                )}
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="status-select"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <Button onClick={() => handleDelete(task.id)} className="btn-danger">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}