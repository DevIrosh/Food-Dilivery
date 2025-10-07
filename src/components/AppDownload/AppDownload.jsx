import React from 'react'
import './AppDownload.css'  


export const AppDownload = () => {
  return (
    <div className="app-download">
      <h2>Download Our App</h2>
      <p>Get the best food delivery experience at your fingertips.</p>
      <div className="app-download-buttons">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Download on Google Play" className="app-badge" />
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="app-badge" />
      </div>
    </div>
  )
}
export default AppDownload  