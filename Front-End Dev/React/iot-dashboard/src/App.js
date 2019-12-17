import React from 'react';
import Table from './components/Tables/tables'
import './App.css';
import Analysis from './components/analysis'
import Main from './Main';
import NavigationBar from './components/navigation'

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <header className="App-header">
          {/* <p className ="table">
           <Table/>
          </p>
          <button onClick={<a href="test.html"></a>}>
            Analytics
          </button>
          <p>
          <Analysis/>
          </p> */}
          <NavigationBar/>
          <Main/>
        </header>
      </div>
      
    );
  }
}

export default App;

