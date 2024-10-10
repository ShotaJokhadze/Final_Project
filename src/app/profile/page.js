import "./Profile.scss";
import { user } from "../data";

export default function Profile() {
  return (
    <div className="profile-page">
      <h2>Personal Information</h2>
      <form className="profile-form">
        <div className="form-group">
          <img
            src={user.photo.src}
            alt="User"
            className="profile-photo"
            id="profile-photo"
            width={100}
            height={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={user.firstName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={user.lastName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}
