import React, { useState, useEffect } from 'react';

// --- STYLES (Save as App.css or similar and import it) ---
/*
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f7f8fc;
}

// Carousel fade animation
.carousel-item {
    transition: opacity 1s ease-in-out;
}

// Floating animation for category images
@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}
.animate-float {
    animation: float 4s ease-in-out infinite;
}
*/


// --- MOCK DATA (Replace with API calls) ---

const heroImages = [
    './image1.jpg',
    './image2.jpg',
    './image3.jpg',
    './image4.jpg',
    './image5.jpg',
];

const journeySubjects = [
    { name: 'Space', icon: 'Rocket' },
    { name: 'Biology', icon: 'Flask' },
    { name: 'Chemistry', icon: 'Beaker' },
    { name: 'Engineering', icon: 'Atom' },
    { name: 'Programming', icon: 'Code' },
];

const subjectCategories = [
    { title: 'Science Wiz', image: 'https://cdn-icons-png.flaticon.com/512/3000/3000863.png', bgColor: 'bg-orange-100' },
    { title: 'Tech Master', image: 'https://cdn-icons-png.flaticon.com/512/4726/4726433.png', bgColor: 'bg-sky-100' },
    { title: "Engineer's Workshop", image: 'https://cdn-icons-png.flaticon.com/512/3409/3409549.png', bgColor: 'bg-green-100' },
    { title: 'Math Magician', image: 'https://cdn-icons-png.flaticon.com/512/10328/10328302.png', bgColor: 'bg-purple-100' },
];

const leaderboardData = [
    { name: 'Priya Sharma', score: 'Grades 09-12', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Amit Kumar', score: 'Grades 10-12', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Sunita Devi', score: 'Grades 11-12', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const successStoriesData = [
    { name: 'Ramesh & Family', role: 'Students and Parents', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Anjali Singh', role: 'Students and Parents', avatar: 'https://i.pravatar.cc/150?img=5' },
];


// --- SVG ICONS ---
const JourneyIcon = ({ name }) => {
    const icons = {
        Rocket: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-7.38 5.84m2.56-5.84a6 6 0 015.84-7.38m-5.84 2.56a6 6 0 017.38-5.84m-2.56 5.84l-2.16-2.16m-2.16 2.16l2.16 2.16m-2.16-2.16l-2.16 2.16m2.16-2.16l2.16-2.16" />,
        Flask: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" />,
        Beaker: <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 00.553.894l3.197 2.132a1 1 0 001.447-.894V12.062a1 1 0 00-.553-.894z" />,
        Atom: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />,
        Code: <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    };
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{icons[name] || ''}</svg>;
};


// --- COMPONENTS ---

function Navbar() {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex justify-between items-center p-4 text-gray-800">
                <a href="#" className="flex items-center gap-2">
                    <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className="text-2xl font-bold">LearnSphere</span>
                </a>
                <nav className="hidden md:flex items-center gap-8 text-gray-600 font-semibold">
                    <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
                </nav>
                <div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-transform transform hover:scale-105 shadow-md">
                        Login / Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
}

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[60vh]">
            {heroImages.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className={`carousel-item absolute inset-0 w-full h-full object-cover ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x600/cccccc/FFFFFF?text=Image+Not+Found'; }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto p-4 md:p-8 text-white max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Start Your Adventure!</h1>
                    <p className="mb-6 text-lg md:text-xl drop-shadow-md">
                        Build a gamified digital platform to enhance learning outcomes for students in rural schools.
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 shadow-lg">Explore Subjects</button>
                        <button className="bg-black/30 backdrop-blur-sm border-2 border-white/50 hover:bg-white hover:text-black font-bold py-3 px-6 rounded-full transition-all shadow-lg">Explore</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JourneyTracker() {
    const progress = 60; // Example progress
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hero's Journey</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-around items-center text-center">
                {journeySubjects.map((subject, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 text-gray-600 transition-transform transform hover:scale-110 hover:text-blue-600 cursor-pointer">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <JourneyIcon name={subject.icon} />
                        </div>
                        <span className="text-sm font-semibold">{subject.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SubjectCategories() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjectCategories.map((cat, index) => (
                    <div key={index} className={`${cat.bgColor} p-6 rounded-2xl flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-2`}>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{cat.title}</h3>
                        <img 
                            src={cat.image} 
                            alt={cat.title} 
                            className="w-32 h-32 object-contain animate-float"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/cccccc/FFFFFF?text=Icon'; }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function CommunityHub() {
    const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'community'

    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4 border-b">
                    <button
                        onClick={() => setActiveTab('leaderboard')}
                        className={`flex-1 font-bold py-2 transition-colors ${activeTab === 'leaderboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Leaderboard
                    </button>
                    <button
                        onClick={() => setActiveTab('community')}
                        className={`flex-1 font-bold py-2 transition-colors ${activeTab === 'community' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Community
                    </button>
                </div>
                
                {activeTab === 'leaderboard' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Student Leaderboard</h3>
                        <ul className="space-y-4">
                            {leaderboardData.map((user, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-gray-700">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.score}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'community' && (
                     <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Success Stories</h3>
                        <ul className="space-y-4">
                            {successStoriesData.map((story, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-gray-700">{story.name}</p>
                                        <p className="text-sm text-gray-500">{story.role}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">LearnSphere</h3>
                    <p className="text-gray-400">Gamified learning for a brighter future in rural education.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                     <div className="flex gap-4 text-gray-400">
                       <a href="#" className="hover:text-white transition-colors">
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                       </a>
                       <a href="#" className="hover:text-white transition-colors">
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.336.213-2.033.188.606 1.956 2.358 3.379 4.441 3.421-1.717 1.34-3.881 2.112-6.217 2.112-.403 0-.799-.024-1.185-.069 2.189 1.408 4.795 2.229 7.616 2.229 9.141 0 14.137-7.567 14.098-14.156 1.001-.715 1.868-1.613 2.554-2.646z"/></svg>
                       </a>
                       <a href="#" className="hover:text-white transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                       </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-center p-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} LearnSphere. All Rights Reserved.
            </div>
        </footer>
    );
}

export default function App() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <div className="container mx-auto p-4 md:p-8 mt-[-80px] relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <main className="w-full lg:w-2/3 flex flex-col gap-8">
                        <JourneyTracker />
                        <SubjectCategories />
                    </main>
                    
                    {/* Sidebar */}
                    <CommunityHub />
                </div>
            </div>
            <Footer />
        </>
    );
}

