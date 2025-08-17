import { useState, useEffect } from 'react';
import { Card, Descriptions, Button, message, Upload, Avatar } from 'antd';
import { EditOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';
import ResumeUploader from '../../components/ResumeUploader';
import { getMe } from '../../api/authApi';
import { updateUserProfile } from '../../api/userApi';
import LoadSpinner from '../../components/LoadSpinner';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMe();
        setProfile(response.user);
        setUser(prev => ({ ...prev, ...response.user }));
      } catch (error) {
        message.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  // Refresh profile after resume upload
  const handleResumeUpdate = async () => {
    try {
      const response = await getMe();
      setProfile(response.user);
      setUser(prev => ({ ...prev, ...response.user }));
    } catch (error) {
      message.error('Failed to refresh profile', error);
    }
  };

  // Handle profile picture upload
  const handleUpload = async file => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('profilepicture', file);

      const res = await updateUserProfile(formData);

      if (!res.user) throw new Error('Invalid server response');

      const profilePic = res.user.profile.profilepicture?.trim() || '';

      // Update local profile state
      setProfile(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          profilepicture: profilePic,
        },
      }));

      // Update Auth context
      setUser(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          profilepicture: profilePic,
        },
      }));

      message.success('Profile picture updated successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to update profile picture');
    } finally {
      setUploading(false);
    }
  };

  if (loading || !profile) return <LoadSpinner />;

  const userProfile = profile.profile || {};

  return (
    <div className="max-w-4xl mx-auto">
      <Card
        title="My Profile"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate('/profile/edit')}
          >
            Edit Profile
          </Button>
        }
      >
        {/* Profile Picture */}
        <div className="flex items-center mb-6">
          <Avatar
            size={100}
            src={
              userProfile.profilepicture
                ? `${import.meta.env.VITE_APP_TOKEN_KEY}${userProfile.profilepicture.trim()}`
                : null
            }
            icon={!userProfile.profilepicture && <UserOutlined />}
            style={{ marginRight: 16 }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={file => {
              handleUpload(file); // send single request
              return false; // prevent automatic upload
            }}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {userProfile.profilepicture ? 'Change' : 'Upload'} Picture
            </Button>
          </Upload>
        </div>

        {/* Profile Details */}
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{profile.role}</Descriptions.Item>

          {profile.role === 'jobseeker' && (
            <>
              <Descriptions.Item label="Skills">
                {userProfile.skills?.join(', ') || 'Not specified'}
              </Descriptions.Item>

              <Descriptions.Item label="Experience">
                {userProfile.experience?.length
                  ? userProfile.experience.map((exp, i) => (
                      <div key={i}>
                        {exp.title} at {exp.company} ({exp.duration})
                        {exp.description && ` - ${exp.description}`}
                      </div>
                    ))
                  : 'Not specified'}
              </Descriptions.Item>

              <Descriptions.Item label="Education">
                {userProfile.education?.length
                  ? userProfile.education.map((edu, i) => (
                      <div key={i}>
                        {edu.degree} - {edu.institution} ({edu.year})
                      </div>
                    ))
                  : 'Not specified'}
              </Descriptions.Item>

              <Descriptions.Item label="Resume">
                <ResumeUploader
                  resume={userProfile.resume}
                  onUpdate={handleResumeUpdate}
                />
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default UserProfile;
