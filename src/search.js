import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Overview from './overview';
let empData = {};
let indirectArray = [];
class Search extends Component {

    state = {
        query: '',
        searchResult: [],
        noSubordinates: false
    }

    componentDidMount(){

    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({query: e.target.value});
    }
    getEmpData = () => {
        axios.get(`http://api.additivasia.io/api/v1/assignment/employees/${this.state.query}`)
        .then(res => {
            if(res.data[1]){
                empData['name'] = this.state.query;
                empData['directSub'] = res.data[1]["direct-subordinates"];
                this.setState({searchResult: res.data[1]["direct-subordinates"]}); 
            }else{
                this.setState({noSubordinates:true});
            }
            
            //console.log(res.data[1]);
           
        }).catch(err=>{
            console.log(err)
        });
    }  
    getSubData = (name) => {
        axios.get(`http://api.additivasia.io/api/v1/assignment/employees/${name}`)
        .then(res => {
            debugger;
             // console.log('SubData:'+JSON.stringify(res.data));
              //console.log('indirect:'+ res.data[1]["direct-subordinates"] );
              //indirectArray.push(...res.data[1]["direct-subordinates"])
             // let indirectArray = [];
              empData['indirectSub'] = indirectArray.push(...res.data[1]["direct-subordinates"])
              console.log('empData:'+JSON.stringify(empData)); 
        }).catch(err=>{
            console.log(err);
        })
    } 
    render(){
        this.state.searchResult.forEach((el)=>{
            this.getSubData(el);
        });
        return(
            <>
            <div className="searchForm">
                <form>
                <input
                    placeholder="Search..."
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                </form>
                <button onClick={this.getEmpData}>Search</button>
            </div>
            <Overview data={this.state.searchResult}/>
            </>
        );
    }

}

export default withRouter(Search);