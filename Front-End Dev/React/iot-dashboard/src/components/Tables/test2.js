import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'

class Table extends React.Component {
    constructor(props) {
       super(props)
        var test = 5
       
        console.log("start")
        var data = this.loadJSON()
        console.log(data)

       this.state = {
          students: [
            {test : test}
          ]
       }
    }

    async loadJSON() {
        var database = firebase.database();
        const rootRef = firebase.database().ref();
        const beaconRef = rootRef.child('beacon1');
        console.log("test")
        let tableval =  await beaconRef.limitToLast(1).on('child_added',function(snapshot){
            console.log("done")
            var data = snapshot.val();
            return data
        }); 
    }
 
    renderTableHeader() {
       let header = Object.keys(this.state.students[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return this.state.students.map((student, index) => {
          const { id, name, age, email } = student //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{email}</td>
             </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>React Dynamic Table</h1>
             <table id='students'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
    
 }

export default Table