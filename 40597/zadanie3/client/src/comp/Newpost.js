import React, { Component } from 'react';
import axios from 'axios'

import classes from './Newpost.module.css';

class NewPost extends Component {
    state = {
        autor: '',
        mail: '',
        nazwa: '',
        awatar: '',
        stopka: '',
        tresc: ''       
    }

    postData = () => {
        const data = {
            autor: this.state.autor,
            mail: this.state.mail,
            nazwa: this.state.nazwa,
            awatar: this.state.awatar,
            stopka: this.state.stopka,
            tresc: this.state.tresc
        }
        axios.post('http://localhost:9000/testApi', data)
    }

    render () {
        return (
            <div className={classes.NewPost}>
                <h1>Add a Post</h1>
                <label>autor</label>
                <input type="text" value={this.state.autor} onChange={(event) => this.setState({autor: event.target.value})} />
                <label>mail</label>
                <input type="text" value={this.state.mail} onChange={(event) => this.setState({mail: event.target.value})} />
                <label>nazwa</label>
                <input type="text" value={this.state.nazwa} onChange={(event) => this.setState({nazwa: event.target.value})} />
                <label>awatar</label>
                <input type="text" value={this.state.awatar} onChange={(event) => this.setState({awatar: event.target.value})} />
                <label>stopka</label>
                <input type="text" value={this.state.stopka} onChange={(event) => this.setState({stopka: event.target.value})} />
                <label>tresc</label>
                <textarea rows="4" value={this.state.tresc} onChange={(event) => this.setState({tresc: event.target.value})} />               
               
                <button onClick={this.postData}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;