import React, { useState } from 'react';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="w-full mx-auto relative group shadow-xl rounded-2xl overflow-hidden aspect-video">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full bg-center bg-cover transition-all duration-500 ease-in-out"
            ></div>
            
            <div 
                className="absolute top-1/2 -translate-y-1/2 left-5 p-2 bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={goToPrevious}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </div>
            
            <div 
                className="absolute top-1/2 -translate-y-1/2 right-5 p-2 bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={goToNext}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 
                            ${slideIndex === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

function App() {
    const slides = [
        { url: 'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg', title: 'Forest Road' },
        { url: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg', title: 'Misty Mountains' },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-black font-sans">
            <div className="w-full max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
                     Image Slider
                </h1>
                <ImageSlider slides={slides} />
            </div>
        </div>
    );
};

export default App;