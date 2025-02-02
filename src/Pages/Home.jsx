import React, { useRef } from 'react';
import Background from '../assets/images/Cover2.jpg';
import Header from '../Components/Header';
import Cards from '../Components/Cards';

const Home = () => {
    const cardsRef = useRef(null);

    const handleScrollToCards = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="relative h-screen w-full">
                <Header dark={true} />
                <img src={Background} alt="Background" className="absolute inset-0 w-full h-full object-cover brightness-20" />
                <div className="absolute inset-0 flex justify-center items-center text-center flex-col">
                    <div className="text-white xss:text-7xl text-5xl font-pbold">
                        All What you need
                        <br />
                        <span className="text-yellow-400">is here !</span>
                    </div>
                    <div className="flex-col xss:flex-row flex gap-y-5 gap-x-6 mt-8">
                        <button
                            onClick={handleScrollToCards}
                            className="bg-transparent hover:bg-gray-100 hover:cursor-pointer rounded-sm border-1 hover:text-black border-gray-100 text-white duration-500 transform transition-colors font-pm px-8 py-2"
                        >
                            See listed items
                        </button>
                        <button onClick={() => window.location.href = '/createproduct'} className="bg-yellow-700 hover:bg-yellow-900 hover:cursor-pointer rounded-sm text-white duration-300 transform transition-colors font-pm px-8 py-2">
                            Create an Item
                        </button>
                    </div>
                </div>
            </div>
            <div ref={cardsRef}>
                <Cards />
            </div>
        </div>
    );
};

export default Home;
