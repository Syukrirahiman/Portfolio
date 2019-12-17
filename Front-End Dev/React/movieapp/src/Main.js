import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './Main.css';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import Slider from './Slider';
import Showtimes from './Showtimes';
import Cinemas from './Cinemas';
import NowShowing from './NowShowing';
import Maps from './Maps';
import Review from './Review';
import Plan from './Plan';
import FormPlan from './FormPlan';
import PlanToMeet from './PlanToMeet';
import SuccessfulForm from './SuccessfulForm';
import RecommendMovies from './RecommendMovies';
import VideoBanner from "./VideoBanner";
import FooterPage from "./FooterPage";
import CinemasNearby from "./CinemasNearby";
import CinemasNearbyHeader from "./CinemasNearbyHeader";


const Main = () => (
    <main>
        <Router>
        <Switch>
            <Route exact path='/' render={props =>
                <div>
                    <SearchBar />
                    <VideoBanner />
                    <RecommendMovies />
                    {/* <CinemasNearby /> */}
                    <CinemasNearbyHeader />  
                </div>
            } />
            {/* <Route exact path='/NavigationBar' component={NavigationBar} />
            <Route exact path='/Footer' component={FooterPage}/> */}
            <Route exact path='/slider' component={Slider} />
            <Route exact path='/showtimes' component={Showtimes} />
            <Route exact path='/nowshowing' component={NowShowing} />
            <Route exact path='/cinemas' component={Cinemas}/>
            <Route exact path='/reviews' component={Review}/>
            <Route exact path='/getdirections' component={Maps}/>
            <Route exact path='/plan' component={Plan}/>
            <Route exact path='/form' component={FormPlan}/>
            <Route exact path='/plantomeet' component={PlanToMeet}/>
            <Route exact path='/successfulform' component={SuccessfulForm}/>
            <Route exact path ='/cinemasnearby' component = {CinemasNearby}/>
            
        </Switch>
        </Router>
    </main>
)

export default Main