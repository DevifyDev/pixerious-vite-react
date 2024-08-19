import { useState, useEffect } from 'react'

export default function Header() {
    const [isActive, setIsActive] = useState(false)
    
    const toggleActiveClass = () => {
      setIsActive(!isActive)
    }
   
    const removeActive = () => {
      setIsActive(false)
    }

    useEffect(() => {
      const handleScroll = () => {
          if (isActive) {
              removeActive()
          }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
    }, [isActive])

    return (
        <header className="header">
          <nav className="navbar">
            <a href='#home' className="websiteName">Pixerious</a>
            <ul className={`navMenu ${isActive ? 'active' : ''}`}>
              <li onClick={removeActive}>
                <a href="#news" className="navLink">News</a>
              </li>
              <li onClick={removeActive}>
                <a href="#selections" className="navLink">Selections</a>
              </li>
            </ul>
            <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </nav>
        </header>
    )
  }