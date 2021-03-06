import React from 'react';
import Row from './components/row/Row';
import requests from './requests';
import Nav from './components/nav/Nav';
import Banner from './components/banner/Banner';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
        {/** NavBar Component */}
        <Nav />

        {/** Banner Component */}
        <Banner />

        {/** Row Components */}
        <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
