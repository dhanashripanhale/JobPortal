import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Container, Input } from 'reactstrap';
import carouselimage from "./images/carousel2.jpg"; // Replace with the path to your image file

const ImageCarousel = () => {
    const initialItems = [
        {
            src: carouselimage,
            altText: 'Slide 1',
            caption: 'Slide 1 Caption'
        },
        // Add more items as needed
    ];

    const [items, setItems] = useState(initialItems);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to filter items based on search query
    const filteredItems = items.filter(item =>
        item.caption.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update slides based on filteredItems
    const slides = filteredItems.map((item, index) => (
        <CarouselItem
            key={index}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
        >
            <img
                src={item.src}
                alt={item.altText}
                className="img-fluid"
                style={{ width: '100%', height: '200px' }} // Adjust height as needed
            />
            {/* Overlay search box using Container and Input from Reactstrap */}
            {/* <Container className="search-box-overlay">
                <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Container> */}
        </CarouselItem>
    ));

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === filteredItems.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? filteredItems.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    return (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={filteredItems} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
};

export default ImageCarousel;
