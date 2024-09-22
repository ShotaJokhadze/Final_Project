import React from 'react'
import img from './assets/image1.jpg'
import './Content.scss'

export default function Content() {
  return (
    <>
      <div className="hero">
        <div className="hero-container">
          <div className="img">
            <img src={img} alt="" />
          </div>
          <h3>This is main content</h3>
        </div>
      </div>
    </>
  )
}
