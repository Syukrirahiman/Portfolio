import React from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Table from './components/Tables/tables';
import TableS from './components/Tables/tablesSystem';
import Analysis from './components/analysis';
import Client from './components/client';
import './Main.css';


const Main = () => (
    <main>
        <Router>
            <Switch>
                <Route exact path='/' render={props =>
                    <div>
                        <p className="table">
                            <Table />
                        </p>


                    </div>
                } />

                <Route exact path='/analytics' render={props =>
                    <div>
                        <p className="table">
                            <Analysis />
                        </p>
                    </div>
                } />
                   <Route exact path='/client' component={Client} />
                   <Route exact path='/systemmonitoring' component={TableS} />


                {/* <Route exact path='/analytics' component={Analysis} /> */}

            </Switch>
        </Router>
    </main>
)

export default Main