import React, { useState } from 'react';

function App() {
    const [rotation, setRotation] = useState(0);

    const handleRotate = () => {
        setRotation(prevRotation => prevRotation + 90);
    };

    return (
        <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 p-8">
            
            <div className="w-64 h-64 mb-8 overflow-hidden rounded-lg shadow-lg">
                <img 
                    src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg"
                    alt="Rotatable"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>

            <button
                onClick={handleRotate}
                className="px-5 py-2 bg-gray-200 text-black border border-gray-400 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                Rotate Image
            </button>

        </div>
    );
}

export default App;