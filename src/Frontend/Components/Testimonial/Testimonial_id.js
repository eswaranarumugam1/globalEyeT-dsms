
import React, { Component, useState, useEffect  } from 'react'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler"
import { Testimonial_list_id } from "../../../services/home/admin"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'
import './Testimonial.scss'
import rounedImg from '../../assets/images/carousel-rounded-img.png'
const Testimonial_id = ({ id }) => {
const [Testimonials, SetTestimonials] = useState([])
const [activeIndex, setActiveIndex] = React.useState(0)
const [animating, setAnimating] = React.useState(false)

const [entestimonial_title, setEnTestinomialTitle] = useState('')
const [entestimonial_description, setEnTestinomialDes] = useState('')
const getTestimonials = async () => {
  try {
    const response = await Testimonial_list_id(id)
    if (response) {
      if (response.data) {
        console.log(response.data.data.result)
        SetTestimonials(response.data.data.result)
      }
    }
  } catch (e) {
    //  ErrorHandler(e)
    console.log(e)
  }
}
useEffect(() => {
  getTestimonials()
}, [])
const items = [
  {
    id: 1,
    altText: "Slide 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
    caption: "Slide 1"
  },
  {
    id: 2,
    altText: "Slide 2",
    text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
    caption: "Slide 2"
  },
  {
    id: 3,
    altText: "Slide 3",
    text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
    caption: "Slide 3"
  }
]

// const items = Testimonials 

const next = () => {
  if (animating) return
  const nextIndex = activeIndex === Testimonials.length - 1 ? 0 : activeIndex + 1
  setActiveIndex(nextIndex)
}

const previous = () => {
  if (animating) return
  const nextIndex = activeIndex === 0 ? Testimonials.length - 1 : activeIndex - 1
  setActiveIndex(nextIndex)
}

const goToIndex = newIndex => {
  if (animating) return
  setActiveIndex(newIndex)
}
const  getTestinomials = async () => {
    try {
        const response = await LandingPageData()
        if (response) {
            console.log(response)
            const { data: { result: { testimonial } } }  = response.data
            console.log(testimonial)
          if (testimonial) {
            const { testimonial_title, testimonial_description } = testimonial
            setEnTestinomialTitle(testimonial_title)
            setEnTestinomialDes(testimonial_description)
          }
        }
    } catch (e) {
      ErrorHandler(e)
    }
}

useEffect(() => {
    getTestinomials()
  }, [])

const slides = Testimonials.map(item => {
  return (
    <CarouselItem
      className="custom-tag"
      tag="div"
      key={item.id}
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
    >
     <div className='carousel-content-block'>
                        <h6>{item.designation}</h6>
                        <h3>{item.title}</h3>
                    </div>
                    <div className='bottom-block'>
                        <img style={{width: 150, height: 150, borderRadius: 400 / 2}} src={item.image} />
                        <p className='text-center'>{item.description}</p>
                    </div>
    </CarouselItem>
  )
})


return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={Testimonials}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
)
}


export default Testimonial_id