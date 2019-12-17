import React, { Component } from 'react'
import 'firebase/database';
import * as firebase from 'firebase/app'

class Table extends React.Component {
    constructor(props) {
       super(props)

       var database = firebase.database();
        const rootRef = firebase.database().ref();
        const beaconRef = rootRef.child('beacon1');
        const tableval = beaconRef.limitToLast(1).on('child_added',function(snapshot){
            var data = snapshot.val();
            console.log(data);
        }); 

       this.state = {
          students: [
             { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
             { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
             { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
             { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
          ]
       }
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