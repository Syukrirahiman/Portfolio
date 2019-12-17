import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'
import { objectExpression } from '@babel/types';
import "./analysis.css"
import CanvasJSReact from '../assets/canvasjs.react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Jumbotron, Container, Row, Col, Button, Pagination } from 'react-bootstrap';

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const beaconlist = { "c2af522362be": "Client A", "e20200bc8540": "Client B" }
class Analysis extends React.Component {
    constructor(props) {
        super(props)
        const beaconlist = { "c2af522362be": "Client A", "e20200bc8540": "Client B" }
        var self = this;
        this.onClick = this.onClick.bind(this);

        this.state = {
            beaconlist: [
                {
                    id: "c2af522362be",
                    name: "Client A",
                    timeLeftHistory: [],
                    numberOfLeft: 0,
                    category: "good",
                    numberOfLeftDuringOperatingHours: 0,
                },
                {
                    id: "e20200bc8540",
                    name: "Client B",
                    timeLeftHistory: [],
                    numberOfLeft: 0,
                    category: "good",
                    numberOfLeftDuringOperatingHours: 0,
                }
            ],
            data: '',
            periodTracker: {
                morning: 0,
                noon: 0,
                afternoon: 0,
                nonOperatingHour: 0,

            },
            selectedBeacon: {},
            redirectToClient: false,
        }



    }
    componentDidMount() {
        var recentPostsRef = firebase.database().ref('/deployment');
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            this.setState({
                data: snapshot.val()
            }, () => {

                this.generateClientData();
            })
        });

    }

    render() {

        console.log(this.state)

        if (this.state.redirectToClient) {
            return (
                <Redirect push from='/' to={{
                    pathname: '/client',
                    state: {
                        beacon: this.state.selectedBeacon,
                    }
                }} />
            )
        }

        if (this.state.data != '') {
            return (
                <div>
                    {this.renderTables()}
                </div>
            )
        }

        return (

            <div style={{ color: "white" }}>
                <h1>Fetching data.... Please wait.  </h1>
                <div className="loader"></div>
            </div>

        )

    }



    generateClientDataPoints(dataList) {
        var result = new Array();
        for (let i = 0; i < dataList.length; i++) {
            var client = dataList[i];
            var clientObj = { label: '', y: '' };
            clientObj.label = client.name;
            clientObj.y = client.numberOfLeftDuringOperatingHours;
            result.push(clientObj);
        }

        return result;

    }

    onClick(e) {
        // alert(  e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
        var name = e.dataPoint.label;
        var beaconlist = this.state.beaconlist;
        var selectedClient = '';
        for (let i = 0; i < beaconlist.length; i++) {
            var beacon = beaconlist[i];
            var beaconName = beacon.name;
            if (name == beaconName) {
                console.log("YAAS")
                this.setState({
                    redirectToClient: true,
                    selectedBeacon: beacon,
                })


            }
        }

    }
    renderClientTableChart() {
        var dataList = this.state.beaconlist
        var dataPoints = this.generateClientDataPoints(dataList);
        const options = {
            axisY: {
                title: "No. Of Time left",  
                includeZero: true,
                // suffix: "%"
            },
            theme: "light2",    // "light1", "dark1", "dark2"
            title: { text: "Total number of times each client left" },
            animationEnabled: true,
            data: [
                {
                    click: this.onClick,
                    type: "column",
                    dataPoints: dataPoints,
                }
            ]
        }

        return (
            <div>
                {/* <h1>React Column Chart</h1> */}
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>

        )
    }

    renderPeriodTableChart() {
        var data = this.state.periodTracker
        const options = {
            // title: { text: "Period Tracker" },
            axisY: {
                title: "No. Of Time left",
                includeZero: false,
                // suffix: "%"
            },
            theme: "light2", 
       
            animationEnabled: true,
            data: [
                {
                    type: "column",
                    dataPoints: [
                        { label: "Morning (7.00 AM to 11.59 AM) ", y: data.morning },
                        { label: "Noon (12.00 PM to 2.59 PM)", y: data.noon },
                        { label: "Afternoon (3.00 PM to 5.59 PM)", y: data.afternoon },
                    ]
                }
            ]
        }

        return (
            <div>
                {/* <h1>React Column Chart</h1> */}
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>

        )
    }

    renderTables() {

        return (

            <div style={{ color: "white", paddingBottom: "20px" }}>

<Container style ={{marginBottom:"20px"}}>
                <Row>
                   <Col>
                
                   <img style={{ width: "190px", height: "190px",marginRight:"30px", marginLeft:"30px" }} src={require("./img/BEARCONS.png")}/>

                   </Col>
                </Row>
             </Container>
                <div>
                    <h3>Client List</h3>

                    <Table striped bordered hover variant="dark"  >
                        <table style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>No. of Times Left</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>{this.renderTableHeader()}</tr> */}

                                {this.renderTableData()}
                            </tbody>
                        </table>

                    </Table>

                    {this.renderClientTableChart()}
                </div>




                <br></br>
            
                <hr
                    style={{
                        color: "white",
                        backgroundColor: "white",
                        height: 1
                    }}
                />
                <br></br>
                <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}>
                    <h3>Number of Times Clients Left During:</h3>
                    <Table striped bordered hover variant="dark"  >
                        <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <thead>
                                {/* <tr>{this.renderTableHeader()}</tr> */}
                                <tr>
                                    <th><div>Morning</div> (7.00 AM to 11.59 AM) </th>
                                    <th><div>Noon</div> (12.00 PM to 2.59 PM)</th>
                                    <th><div>Afternoon</div> (3.00 PM to 5.59 PM)</th>
                                    <th><div>Non-Operating Hours</div> (6.00 PM Onwards)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTablePeriodData()}
                            </tbody>
                        </table>
                    </Table>
                    {this.renderPeriodTableChart()}
                </div>


            </div>

        )

    }

    renderTableData() {

        return this.state.beaconlist.map((value, index) => {
            const { id, category, name, numberOfLeft, numberOfLeftDuringOperatingHours, timeLeftHistory } = value //destructuring
            // var d = JSON.parse(lastSeen)
            // var x = new Date(d);
            // console.log(x);

            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{id}</td>
                    <td>{numberOfLeftDuringOperatingHours}</td>
                    <td>{category}</td>
                </tr>
            )
        })
    }


    renderTablePeriodData() {

        var periodTrackerObj = this.state.periodTracker;


        return (
            <tr>
                <td>{periodTrackerObj.morning}</td>
                <td>{periodTrackerObj.noon}</td>
                <td>{periodTrackerObj.afternoon}</td>
                <td>{periodTrackerObj.nonOperatingHour}</td>
            </tr>
        )

    }


    generateClientData() {
        console.log(this.state.beaconlist);
        var data = this.state.data;

        var beaconlist = this.state.beaconlist;

        var entries = Object.entries(data)




        // console.log(entries)

        // var updateBeaconList = new Array();

        for (let i = 0; i < entries.length; i++) {
            // console.log(data[i]);

            var data = entries[i][1] // to geth the object of beacons and its value
            console.log(data);


            for (let j = 0; j < beaconlist.length; j++) {
                console.log(data)

                //value of current beaconin the beaconlist
                var beacon = beaconlist[j];

                var currObj = {
                    id: beacon.id,
                    name: beacon.name,
                    timeLeftHistory: beacon.timeLeftHistory,
                    numberOfLeft: beacon.numberOfLeft,
                    category: beacon.category,
                    numberOfLeftDuringOperatingHours: beacon.numberOfLeftDuringOperatingHours,
                }

                var beaconid = beacon.id;
                console.log(beaconid)
                var timeLeftHistory = beacon.timeLeftHistory; // array of timeLeftHistory

                var noOfLeft = beacon.numberOfLeft;

                // var t = "e20200bc8540";

                //value of beacon from data in firebase
                var beaconData = data[beaconid];
                console.log(beaconData)
                var lastSeenData = beaconData.lastSeen;
                var statusMsgData = beaconData.statusMsg;

                if (!(timeLeftHistory.includes(lastSeenData))) {
                    if (statusMsgData == "left") {
                        noOfLeft += 1;
                        timeLeftHistory.push(lastSeenData);
                        console.log(noOfLeft);
                        console.log("yes")
                    }
                }



                currObj.timeLeftHistory = timeLeftHistory;
                currObj.numberOfLeft = noOfLeft;
                currObj.numberOfLeftDuringOperatingHours = noOfLeft;


                console.log(currObj.numberOfLeft)

                beaconlist[j] = currObj

            }

        }

        this.setState({
            beaconlist: beaconlist,
        }, () => {
            this.generatePeriodTrackerData();
        })
    }


    generatePeriodTrackerData() {
        var beaconlist = this.state.beaconlist;
        var periodTracker = this.state.periodTracker;



        for (let i = 0; i < beaconlist.length; i++) {
            var beacon = beaconlist[i];
            var timeLeftHistory = beacon.timeLeftHistory;
            // var numberOfLeftDuringOperatingHours = beacon.numberOfLeftDuringOperatingHours;
            var numberOfLeftDuringNonOperatinghours = 0;

            for (let j = 0; j < timeLeftHistory.length; j++) {
                var datetimestr = JSON.parse(timeLeftHistory[j]);
                var datetime = new Date(datetimestr);
                var time = datetime.toLocaleTimeString();
                console.log(time)


                //set opening and closing time
                var closing = "18:00:00";
                var closingDate = Date.parse("01/01/2011 " + closing);
                var opening = "07:00:00";
                var openingDate = Date.parse("01/01/2011 " + opening);

                var noon = "12:00:00";
                var noonDate = Date.parse('01/01/2011 ' + noon)
                var afternoon = "15:00:00";
                var afternoonDate = Date.parse("01/01/2011 " + afternoon);

                var timeDate = Date.parse("01/01/2011 " + time);

                if (timeDate >= openingDate && timeDate < closingDate) {
                    if (timeDate < noonDate) {
                        periodTracker.morning += 1;
                    } else if (timeDate < afternoonDate) {
                        periodTracker.noon += 1;
                    } else {
                        periodTracker.afternoon += 1;
                    }

                } else {
                    periodTracker.nonOperatingHour += 1;
                    numberOfLeftDuringNonOperatinghours += 1

                }
            }


            beacon.numberOfLeftDuringOperatingHours -= numberOfLeftDuringNonOperatinghours;

            //update their cateogry
            if (beacon.numberOfLeftDuringOperatingHours < 1) {
                beacon.category = "Low Risk"
            } else if (beacon.numberOfLeftDuringOperatingHours < 2) {
                beacon.category = "Medium Risk"
            } else {
                beacon.category = "High Risk"
            }

            beaconlist[i] = beacon;

        }

        this.setState({
            periodTracker: periodTracker,
            beaconlist: beaconlist,
        })
    }

}

export default Analysis