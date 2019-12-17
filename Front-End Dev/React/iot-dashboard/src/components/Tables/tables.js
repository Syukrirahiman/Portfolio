import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'
import { Table, Jumbotron, Container, Row, Col, Button, Pagination } from 'react-bootstrap';

const beaconlist = {"c2af522362be" : "Client A","e20200bc8540" : "Client B"}
const imagelist = {"c2af522362be" :require(".././img/clienta.png"), "e20200bc8540" : require(".././img/clienta.png")}
class TableDashboard extends React.Component {
    constructor(props) {
        super(props)
        const beaconlist = {"c2af522362be" : "Client A","e20200bc8540" : "Client B"}
        var self = this;
        const rootRef = firebase.database().ref();
        const beaconRef = rootRef.child('deployment').orderByChild("dateAdded");
        //sort by timestamp
        const tableval = beaconRef.limitToLast(1).on('child_added',function(snapshot){
            var data = snapshot.val();
            
            console.log(data);
            console.log(beaconlist[0]);
            var beacon_1 = data[Object.keys(beaconlist)[0]];
            var beacon_2 = data[Object.keys(beaconlist)[1]];
            console.log(beacon_1);
   
            
            self.setState({
                beaconArray:[
                  { id: beacon_1.id,
                     lastSeen: beacon_1.lastSeen, 
                     rssi_da1: beacon_1.rssi_da1, 
                     lastSeen_da1: beacon_1.lastSeen_da1,
                     rssi_ma1: beacon_1.rssi_ma1,
                     last_seen_ma1: beacon_1.last_seen_ma1,
                     rssi_r1: beacon_1.rssi_r1,
                     last_seen_r1: beacon_1.last_seen_r1, 
                     statusMsg: beacon_1.statusMsg,
                  },

                     { id: beacon_2.id,
                        lastSeen: beacon_2.lastSeen, 
                        rssi_da1: beacon_2.rssi_da1, 
                        lastSeen_da1: beacon_2.lastSeen_da1,
                        rssi_ma1: beacon_2.rssi_ma1,
                        last_seen_ma1: beacon_2.last_seen_ma1,
                        rssi_r1: beacon_2.rssi_r1,
                        last_seen_r1: beacon_2.last_seen_r1, 
                        statusMsg: beacon_2.statusMsg }
                  
                 ]
                
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

       return this.state.beaconArray.map((beaconArray, index) => {
          const { id, lastSeen, rssi_da1,lastSeen_da1, rssi_da2, lastSeen_da2, statusMsg} = beaconArray //destructuring
          var d = JSON.parse(lastSeen)
          var x = new Date(d);
          console.log(x);

          return (
             <tr key={id}>
                <td>{beaconlist[id]}</td>
                <td><img style={{ width: "60px", height: "60px" }} src={imagelist[id]}/></td>
                <td>{x.toString()}</td>
                <td>{statusMsg}</td>
             </tr>
          )
       })
    }
 
    render() {
       return (
         

           /* font-size: calc(10px + 2vmin); */
          <div style={{marginTop: "10px", paddingBottom:"20px", fontSize: "calc(10px + 2vmin)"}}>
             <Container>
                <Row>
                   <Col>
                   <img style={{ width: "240px", height: "65px" }} src={require(".././img/NTUC.png")}/>  
                   <img style={{ width: "190px", height: "190px",marginRight:"30px", marginLeft:"30px" }} src={require(".././img/BEARCONS.png")}/>
                   <img style={{ width: "200px", height: "80px", marginLeft:"10px", backgroundColor: "White" }} src={require(".././img/SMU.png")}/>  
                   
                   {/* <img style={{ width: "150px", height: "150px" }} src={require(".././img/SMU.png")}/> */}
                   </Col>
                </Row>
             </Container>
             <br></br>
             <h1 id='title' style={{color:"white", marginBottom:"15px"}}>Client Monitoring Dashboard</h1>   
             <Table striped bordered hover variant="dark"  >
             <table id='beacon'>
                <thead>
                   {/* <tr>{this.renderTableHeader()}</tr> */}
                   <tr>
                      <th>Name</th>
                      <th>Profile Pic</th>
                      <th>Last Seen</th>
                      <th>Status Message</th>
                   </tr>
                   </thead>
               <tbody>
                   {this.renderTableData()}
                </tbody>
             </table>
             </Table>
          </div>
       )
    }
    
 }

export default TableDashboard