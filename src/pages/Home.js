import React from 'react';
import Header from '../components/header/header';
import Slider from '../components/banner/slider';

function Home() {
    return (
		<div>
           <Header />
           <Slider />
           <a href="/">Admin</a>
		</div>
	);
}

export default Home

