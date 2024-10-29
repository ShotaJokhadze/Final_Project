"use client";

import { useEffect, useState } from "react";
import { getCurrentAuthUser } from "../../Services/authService";
import Image from "next/image";
import "./Profile.scss";
import Link from "next/link";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentAuthUser();
      setUser(userData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <main id="prof">
        <div className="loader"></div>
      </main>
    );
  }

  if (!user) {
    return <p>User not found or not authenticated.</p>;
  }

  return (
    <div id="profile-page">
      <div className="prof-header-cont">
        <div className="profile-header">
          {user.image && (
            <Image
              src={user.image}
              alt="User Profile Avatar"
              width={72}
              height={72}
              className="profile-avatar"
            />
          )}
          <div className="header-text">
            <p className="F-name">{user.firstName}</p>
            <p className="L-name">{user.lastName}</p>
          </div>
        </div>
      </div>
      <div className="grid-cont">
        <div className="personal-info grid-item">
          <h6>{user.username}</h6>
          <p className="age">
            <span>Age:</span> {user.age}{" "}
          </p>
          <p className="address">
            <span>Address: </span>
            {user.address.country}/{user.address.address}
          </p>
        </div>
        <div className="education  grid-item">
          <h6>Education</h6>
          <p className="uni">{user.university}</p>
        </div>
        <div className="workplace  grid-item">
          <h6>Workplace</h6>
          <p className="company">{user.company.name} </p>
          <p className="comp-title">{user.company.title}</p>
        </div>
        <div className="contacts  grid-item">
          <h6>Contact info</h6>
          <p className="mail">
            <span>mail:</span>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </p>
          <p className="phone">
            <span>phone:</span>
            <Link href={`tel:${user.phone}`}>{user.phone}</Link>
          </p>
        </div>
        <div className="payment-info">
          <h6 className="payment-title">Payment Information</h6>
          <div className="payment-types">
            <div className="cards">
              <h5>Banking Cards</h5>
              <p>
                <span>{user.bank.cardType}:</span>{" "}
                {" " + "**** ****" + " " + user.bank.cardNumber.slice(-4)}
              </p>
            </div>
            <div className="wallets">
              <h5>Crypto Wallets</h5>
              <p>
                <span>{user.crypto.coin}:</span>{" "}
                {user.crypto.wallet.slice(0, 4) +
                  " " +
                  "**** ****" +
                  " " +
                  user.crypto.wallet.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
