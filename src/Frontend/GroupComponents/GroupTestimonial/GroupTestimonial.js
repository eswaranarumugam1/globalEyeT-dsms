
import React, { Component } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'
import './GroupTestimonial.scss'
import rounedImg from '../../assets/images/carousel-rounded-img.png'

const items = [
    {
        src: '1',
        altText: 'Slide 1',
        text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
        caption: 'Slide 1'
    },
    {
        src: '2',
        altText: 'Slide 2',
        text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
        caption: 'Slide 2'
    },
    {
        src: '3',
        altText: 'Slide 3',
        text: "Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the ",
        caption: 'Slide 3'
    }
]

class GroupTestimonial extends Component {
    constructor(props) {
        super(props)
        this.state = { activeIndex: 0 }
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToIndex = this.goToIndex.bind(this)
        this.onExiting = this.onExiting.bind(this)
        this.onExited = this.onExited.bind(this)
    }

    onExiting() {
        this.animating = true
    }

    onExited() {
        this.animating = false
    }

    next() {
        if (this.animating) return
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1
        this.setState({ activeIndex: nextIndex })
    }

    previous() {
        if (this.animating) return
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1
        this.setState({ activeIndex: nextIndex })
    }

    goToIndex(newIndex) {
        if (this.animating) return
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}>
                    <div className='carousel-content-block'>
                        <h6>Testimonials</h6>
                        <h2>The opinions of our students confirm our effectiveness</h2>
                    </div>
                    <div className='bottom-block'>
                        <img src={rounedImg} />
                        <p className='text-center'>{item.text}</p>
                    </div>

                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            )
        })

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        )
    }
}


export default GroupTestimonial