import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'
import { Table, Jumbotron, Container, Row, Col, Button, Pagination } from 'react-bootstrap';

const beaconlist = { "c2af522362be": "Client A", "e20200bc8540": "Client B" }
const imagelist = { "c2af522362be": require(".././img/clienta.png"), "e20200bc8540": require(".././img/clienta.png") }
class TableDashboardSystem extends React.Component {
   constructor(props) {
      super(props)
      const beaconlist = { "c2af522362be": "Client A", "e20200bc8540": "Client B" }
      var self = this;
      const rootRef = firebase.database().ref();
      const beaconRef = rootRef.child('deployment').orderByChild("dateAdded");
      //sort by timestamp
      const tableval = beaconRef.limitToLast(1).on('child_added', function (snapshot) {
         var data = snapshot.val();

         console.log(data);
         console.log(beaconlist[0]);
         var beacon_1 = data[Object.keys(beaconlist)[0]];
         var beacon_2 = data[Object.keys(beaconlist)[1]];
         var dateAddedString = data.dateAdded;
         console.log(beacon_1);


         self.setState({
            beaconArray: [
               {
                  id: beacon_1.id,
                  lastSeen: beacon_1.lastSeen,
                  rssi_da1: beacon_1.rssi_da1,
                  lastSeen_da1: beacon_1.lastSeen_da1,
                  rssi_ma1: beacon_1.rssi_ma1,
                  last_seen_ma1: beacon_1.last_seen_ma1,
                  rssi_r1: beacon_1.rssi_r1,
                  last_seen_r1: beacon_1.last_seen_r1,
                  statusMsg: beacon_1.statusMsg,
               },

               {
                  id: beacon_2.id,
                  lastSeen: beacon_2.lastSeen,
                  rssi_da1: beacon_2.rssi_da1,
                  lastSeen_da1: beacon_2.lastSeen_da1,
                  rssi_ma1: beacon_2.rssi_ma1,
                  last_seen_ma1: beacon_2.last_seen_ma1,
                  rssi_r1: beacon_2.rssi_r1,
                  last_seen_r1: beacon_2.last_seen_r1,
                  statusMsg: beacon_2.statusMsg
               }

            ],
            dateAddedString: dateAddedString,

         })

      });

      this.state = {
         beaconArray: []
      }
   }


   renderTableHeader() {

      let header = Object.keys(this.state.beaconArray)
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      var beaconArray = this.state.beaconArray;
      console.log(beaconArray)

      var latest_da1 = JSON.parse(beaconArray[0].lastSeen_da1);
      var latest_ma1 = JSON.parse(beaconArray[0].last_seen_ma1);
      var latest_r1 = JSON.parse(beaconArray[0].last_seen_r1);
      var dateAddedString = JSON.parse(this.state.dateAddedString);

      for (let i = 1; i < beaconArray.length; i++) {

         var current_da1 = JSON.parse(beaconArray[i].lastSeen_da1);
         var current_ma1 = JSON.parse(beaconArray[i].last_seen_ma1);
         var current_r1 = JSON.parse(beaconArray[i].last_seen_r1);


         if (new Date(current_da1) > new Date(latest_da1)) {
            latest_da1 = current_da1
         }

         if (new Date(current_ma1) > new Date(latest_ma1)) {
            latest_ma1 = current_ma1
         }

         if (new Date(current_r1) > new Date(latest_r1)) {
            latest_r1 = current_r1
         }

      }

      return (

         <tbody>

            <tr>
               <td>Gateway</td>
               <td>{new Date(dateAddedString).toString().substring(0, 25)}</td>
               <td>{this.diff_hours(new Date(dateAddedString))}</td>
               <td>{this.checkStatusGateway(new Date(dateAddedString))}</td>
            </tr>

            <tr>
               <td>Receiver 1</td>
               <td>{new Date(latest_da1).toString().substring(0, 25)}</td>
               <td>{this.diff_hours(new Date(latest_da1))}</td>
               <td>{this.checkStatusReceiver(new Date(latest_da1))}</td>

            </tr>

            <tr>
               <td>Receiver 2</td>
               <td>{new Date(latest_r1).toString().substring(0, 25)}</td>
               <td>{this.diff_hours(new Date(latest_r1))}</td>
               <td>{this.checkStatusReceiver(new Date(latest_r1))}</td>

            </tr>

            <tr>
               <td>Receiver 3</td>
               <td>{new Date(latest_ma1).toString().substring(0, 25)}</td>
               <td>{this.diff_hours(new Date(latest_ma1))}</td>
               <td>{this.checkStatusReceiver(new Date(latest_ma1))}</td>

            </tr>
         </tbody>
      )

      // <td>{new Date(latest_da1).toString().substring(0, 25)}</td>
      // <td>{new Date(latest_r1).toString().substring(0, 25)}</td>
      // <td>{new Date(latest_ma1).toString().substring(0, 25)}</td>


   }

   checkStatusReceiver(date){
      var current = new Date()

      // get total seconds between the times
      var delta = Math.abs(current - date) / 1000;

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = Math.round(delta % 60);

      if (hours > 11) {
         return (<p>Requires Maintenance</p>)
      }

      if (days > 1) {
         return (<p>Requires Maintenance</p>)
      }

      return "Device is working"

   }

   checkStatusGateway(date) {

      var current = new Date()

      // get total seconds between the times
      var delta = Math.abs(current - date) / 1000;

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = Math.round(delta % 60);

      if (minutes > 1) {
         return (<p>Requires Maintenance</p>)
      }

      if (hours > 1) {
         return (<p>Requires Maintenance</p>)
      }

      if (days > 1) {
         return (<p>Requires Maintenance</p>)
      }

      return "Device is working"
   }

   renderTableData2() {
      var beaconArray = this.state.beaconArray;
      console.log(beaconArray)

      var latest_da1 = JSON.parse(beaconArray[0].lastSeen_da1);
      var latest_ma1 = JSON.parse(beaconArray[0].last_seen_ma1);
      var latest_r1 = JSON.parse(beaconArray[0].last_seen_r1);
      var dateAddedString = JSON.parse(this.state.dateAddedString);

      for (let i = 1; i < beaconArray.length; i++) {

         var current_da1 = JSON.parse(beaconArray[i].lastSeen_da1);
         var current_ma1 = JSON.parse(beaconArray[i].last_seen_ma1);
         var current_r1 = JSON.parse(beaconArray[i].last_seen_r1);


         if (new Date(current_da1) > new Date(latest_da1)) {
            latest_da1 = current_da1
         }

         if (new Date(current_ma1) > new Date(latest_ma1)) {
            latest_ma1 = current_ma1
         }

         if (new Date(current_r1) > new Date(latest_r1)) {
            latest_r1 = current_r1
         }

      }

      return (
         <tr>
            <td>{this.diff_hours(new Date(latest_da1)) + " hr(s)"}</td>
            <td>{this.diff_hours(new Date(latest_r1)) + " hr(s)"}</td>
            <td>{this.diff_hours(new Date(latest_ma1)) + " hr(s)"}</td>
            <td>{this.diff_hours(new Date(dateAddedString)) + " hr(s)"}</td>
         </tr>
      )


   }

   diff_hours(date) {

      var current = new Date()

      // get total seconds between the times
      var delta = Math.abs(current - date) / 1000;

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = Math.round(delta % 60);  // in theory the modulus is not required


      return days + " Day " + hours + " Hr " + minutes + " Min " + seconds + " Sec "

      // var diff = (date.getTime() - current.getTime()) / 1000;
      // diff /= (60 * 60);
      // return Math.abs(Math.round(diff));

   }

   render() {
      if (this.state.beaconArray.length > 0) {


         return (


            /* font-size: calc(10px + 2vmin); */
            <div style={{ marginTop: "10px", paddingBottom: "20px", fontSize: "calc(10px + 2vmin)" }}>
               {/* <Container>
                  <Row>
                     <Col>
                        <img style={{ width: "190px", height: "190px", marginRight: "30px", marginLeft: "30px" }} src={require(".././img/BEARCONS.png")} />
   
                     </Col>
                  </Row>
               </Container> */}

               <h1 id='title' style={{ color: "white", marginBottom: "15px" }}>System Monitoring Dashboard</h1>
               <img style={{ width: "700px", height: "400px", marginLeft: "10px", backgroundColor: "White" }} src={require(".././img/layout.jpg")} />
               <br></br>
               <p>Latest Datetime Data Retrieved from Gateway: <b style={{ color: "OrangeRed" }}>{new Date(JSON.parse(this.state.dateAddedString)).toString().substring(0, 25)}</b></p>
               <hr
                  style={{
                     color: "white",
                     backgroundColor: "white",
                     height: 1
                  }}
               />



               <h3>Device List</h3>
               <Table striped bordered hover variant="dark"  >

                  <thead>
                     {/* <tr>{this.renderTableHeader()}</tr> */}
                     <tr>
                        <th>Device</th>
                        <th>Latest Data Timestamp</th>   
                        <th>Amount of Duration <br></br>Device has Stopped Sending Data</th>
                        <th>Status</th>

                     </tr>
                  </thead>

                  {this.renderTableData()}


               </Table>

               <span style ={{fontSize : "large", fontStyle: "italic"}}>If any of the devices' status is reflected as "Requires Maintenance", please ensure that the device is turned on. <br></br>Otherwise, please contact Bearcons' IT helpdesk for maintenance service. </span>





            </div>
         )
      }

      return (
         <div></div>
      )
   }

}

export default TableDashboardSystem