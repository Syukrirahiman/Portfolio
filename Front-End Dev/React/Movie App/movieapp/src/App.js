import React from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import Main from './Main';
import FooterPage from "./FooterPage";


import { withRouter, Redirect } from 'react-router-dom';

// if (this.props.location.pathname !== "/getdirections") {
//   const App = () => (
  
//     <div>
//       <NavigationBar />
//       <Main /> 
//       <FooterPage/>
//     </div>
//   )
// } else {
//   const App = () => (
  
//     <div>
//       <NavigationBar />
//       <Main /> 
//     </div>
//   )
// }
const App = () => (
  
  <div>
    <NavigationBar />
    <Main /> 
    <FooterPage/>
  </div>
)

export default withRouter(App);
