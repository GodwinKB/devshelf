import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>My Profile Dashboard</h2>
        
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Username</span>
            <span className="info-value">{user?.userName || 'Not provided'}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">Email Address</span>
            <span className="info-value">{user?.email || 'Not provided'}</span>
          </div>
          
          {/* You can add more user details here later as your backend grows */}
          <div className="info-group">
            <span className="info-label">Account Status</span>
            <span className="info-value status-active">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}