import React, { Component } from 'react';
import axios from 'axios'

import classes from './Fullpost.module.css'



class FullPost extends Component {
    state = {
        loaded: null,
        test: null
    }

    componentDidUpdate() {
        if(this.props.id){
            if( !this.state.loaded || (this.state.loaded && this.state.loaded.id !== this.props.id)) {
                axios.get('http://localhost:9000/testApi/' + this.props.id)
                .then(res => {
                    console.log(res.data)
                    this.setState({loaded: res.data})
                })
            }
            
        }
    }


    render () {
        let post = <p>Please select a Post!</p>;
        if (this.props.id){
            post = <p>Loading..</p>
        }
        if (this.state.loaded) {
            post = (
                <div className={classes.FullPost}>
                    <h1>id: {this.state.loaded.id}</h1>
                    <p>mail: {this.state.loaded.mail}</p>
                    <p>profilID: {this.state.loaded.profID}</p>
                    <p>nazwa: {this.state.loaded.nazwa}</p>
                    <p>avatar: {this.state.loaded.awatar}</p>
                    <p>stopka: {this.state.loaded.stopka}</p>
                    <p>tresc: {this.state.loaded.tresc}</p>
                   
    
                </div>
    
            );
        }
    
        return post;
    }
}

export default FullPost;