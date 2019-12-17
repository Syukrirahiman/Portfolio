import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'
import { objectExpression } from '@babel/types';
import "./analysis.css"
import CanvasJSReact from '../assets/canvasjs.react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Jumbotron, Container, Row, Col, Button, Pagination } from 'react-bootstrap';

var CanvasJSChart = CanvasJSReact.CanvasJSChart

class Analysis extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            beacon: this.props.location.state.beacon,
            timelineCount: {
                seven: 0,
                eight: 0,
                nine: 0,
                ten: 0,
                eleven: 0,
                twelve: 0,
                thirteen: 0,
                fourteen: 0,
                fifteen: 0,
                sixteen: 0,
                seventeen: 0,
                nonOperatingHour: 0,

            },
            closingTime: "18:00:00",
            openingTime: "07:00:00",
            dataGenerated: false,
        }



    }

    componentDidMount() {

        this.generateTimelineCount();

    }

    generateTimelineCount() {
        var timeLeftHistory = this.state.beacon.timeLeftHistory;
        var timelineCount = this.state.timelineCount;


        var closing = this.state.closingTime;
        var closingDate = Date.parse("01/01/2011 " + closing);

        var opening = this.state.openingTime;
        var openingDate = Date.parse("01/01/2011 " + opening);


        var eight = "08:00:00";
        var eightDate = Date.parse('01/01/2011 ' + eight)

        var nine = "09:00:00";
        var nineDate = Date.parse('01/01/2011 ' + nine)

        var ten = "10:00:00";
        var tenDate = Date.parse('01/01/2011 ' + ten)

        var eleven = "11:00:00";
        var elevenDate = Date.parse('01/01/2011 ' + eleven)

        var twelve = "12:00:00";
        var twelveDate = Date.parse('01/01/2011 ' + twelve)

        var thirteen = "13:00:00";
        var thirteenDate = Date.parse('01/01/2011 ' + thirteen)

        var fourteen = "14:00:00";
        var fourteenDate = Date.parse('01/01/2011 ' + fourteen)

        var fifteen = "15:00:00";
        var fifteenDate = Date.parse('01/01/2011 ' + fifteen)

        var sixteen = "16:00:00";
        var sixteenDate = Date.parse('01/01/2011 ' + sixteen)

        var seventeen = "17:00:00";
        var seventeenDate = Date.parse('01/01/2011 ' + seventeen)

        var eightteen = "18:00:00";
        var eightteenDate = Date.parse('01/01/2011 ' + eightteen)



        for (let j = 0; j < timeLeftHistory.length; j++) {
            var datetimestr = JSON.parse(timeLeftHistory[j]);
            var datetime = new Date(datetimestr);
            var time = datetime.toLocaleTimeString();
            // console.log(time)


            //set opening and closing time

            var timeDate = Date.parse("01/01/2011 " + time);

            console.log(timeDate);
            console.log(openingDate);
            console.log(closingDate);


            if (timeDate >= openingDate && timeDate < closingDate) {
                if (timeDate < eightDate) {
                    timelineCount.seven += 1;
                } else if (timeDate < nineDate) {
                    timelineCount.eight += 1;
                } else if (timeDate < tenDate) {
                    timelineCount.nine += 1;
                } else if (timeDate < elevenDate) {
                    timelineCount.eleven += 1;
                } else if (timeDate < twelveDate) {
                    timelineCount.eleven += 1;
                } else if (timeDate < thirteenDate) {
                    timelineCount.twelve += 1;
                } else if (timeDate < fourteenDate) {
                    timelineCount.thirteen += 1;
                } else if (timeDate < fifteenDate) {
                    timelineCount.fourteen += 1;
                } else if (timeDate < sixteenDate) {
                    timelineCount.fifteen += 1;
                } else if (timeDate < seventeenDate) {
                    timelineCount.sixteen += 1;
                } else {
                    timelineCount.seveteen += 1;
                }


            } else {
                timelineCount.nonOperatingHour += 1

            }
        }

        this.setState({
            timelineCount: timelineCount,
            dataGenerated: true,
        })


    }

    render() {

        console.log(this.state)

        if (this.state.dataGenerated) {
            const options = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2", // "light1", "dark1", "dark2"
                title: {
                    
                },
                axisY: {
                    title: "No. Of Time left",
                    includeZero: false,
                    // suffix: "%"
                },
                axisX: {
                    title: "Hour",
                    // prefix: "W",
                    // interval: 2
                },
                data: [{
                    type: "line",
                    toolTipContent: "No. of time left at this hour ({label}): {y}",
                    dataPoints: [
                        { label: "07:00 to 07:59", x: 7, y: this.state.timelineCount.seven },
                        { label: "08:00 to 09:59",x: 8, y: this.state.timelineCount.eight },
                        { label: "09:00 to 09:59",x: 9, y: this.state.timelineCount.nine },
                        { label: "10:00 to 10:59", x: 10, y: this.state.timelineCount.ten },
                        { label: "11:00 to 11:59", x: 11, y: this.state.timelineCount.eleven },
                        { label: "12:00 to 12:59", x: 12, y: this.state.timelineCount.twelve },
                        { label: "13:00 to 13:59", x: 13, y: this.state.timelineCount.thirteen },
                        { label: "14:00 to 14:59", x: 14, y: this.state.timelineCount.fourteen },
                        { label: "15:00 to 15:59", x: 15, y: this.state.timelineCount.fifteen },
                        { label: "16:00 to 16:59", x: 16, y: this.state.timelineCount.sixteen },
                        { label: "17:00 to 17:59", x: 17, y: this.state.timelineCount.seventeen },
                  
                    ]
                }]
            }

            return (
                <div style ={{width: "100%"}}>
                    <h1>Total number of time left per hour for {this.state.beacon.name}</h1>
                    <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

                 <br></br>
                    

                    <Link
                  to={{
                    pathname: "/analytics"
               
                }} >
                    <Button variant="info" >Back</Button>
                </Link>
                </div>
            )


        }

        return (
            <div>
                <h1>Fetching data.... Please wait.  </h1>
                <div className="loader"></div>
            </div>
        )


    }




}

export default Analysis