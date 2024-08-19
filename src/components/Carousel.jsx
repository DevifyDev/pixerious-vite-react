import React, { useEffect, useState } from 'react'
import chevronLeft from '/icons/chevron-left.svg'
import chevronRight from '/icons/chevron-right.svg'
import { data }  from './data/carousel.js'

export default function Carousel() {
  const [counter, setCounter] = useState(0)

  const getCarouselElement = () => {
    const slide = document.getElementById('carousel')
      if (!slide) {
        console.error('Carousel element not found')
      return null
    }
    return slide
  }

  useEffect(() => {
    const slide = getCarouselElement()
      if (!slide) return

      const size = 298

    const updateSlidePosition = () => {
      slide.style.transform = `translateX(${-size * counter}px)`
    }

    updateSlidePosition()
  }, [counter])

  useEffect(() => {
    const slide = getCarouselElement()
      if (!slide) 
    return

    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter < slide.children.length - 1 ? prevCounter + 1 : 0
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const incrementCarousel = () => {
    const slide = getCarouselElement()
      if (!slide) 
    return

    if (counter < slide.children.length - 1) {
      setCounter(counter + 1)
    }
  }

  const decrementCarousel = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

    const createCarousel = () => {
        return data.map((x) => {
            let { id, img, alt, title } = x
                return (
                    <div className="card" key={id}>                
                        <figure className="cardImgContainer">
                            <img className="cardImg" src={img} alt ={alt} loading="lazy" />
                        </figure>
                        <h3 className="cardTitle">{`${title}`}</h3>
                    </div>
            )
        })                      
    }  
   
  return (
            <section className="carouselParentContainer">

                <figure className="carouselBtnContainer">
                    <img className="carouselBtn" id="carousel-decrement-btn" src={chevronLeft} onClick={decrementCarousel} alt="loaded" />
                </figure>

                <div className="carouselContainer">
                    <div className="carousel" id="carousel">{createCarousel()}</div>
                </div>
                
                <figure className="carouselBtnContainer">
                    <img className="carouselBtn" id="carousel-increment-btn" src={chevronRight} onClick={incrementCarousel} alt="loaded" />
                </figure>
            
            </section>  
        )
}
