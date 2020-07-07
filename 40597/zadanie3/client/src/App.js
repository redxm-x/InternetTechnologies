import React, { Component } from 'react';

import Axios from 'axios';
import Post from './comp/Post'
import Fullpost from './comp/Fullpost'
import Newpost from './comp/Newpost'

class App extends Component{
  constructor(props){
    super(props);
    this.state=
    {
    posts: [],
    selectId: null
  };
  }

  componentDidMount(){
    Axios.get('http://localhost:9000/testApi')
      .then(response => {
        const posts = response.data.slice(0)
        const updatedPost = posts.map(post => {
          return {
            ...post
          }
        })
        this.setState({posts: updatedPost})
        //console.log(response)
      })
  }


  postSelectHandler = (id) => {
          this.setState({selectId: id})
  }

  render(){  
        const posts = this.state.posts.map(post => {
          return <Post key={post.id} autor ={post.autor} id ={post.id} 
          clicked ={() =>this.postSelectHandler(post.id) }
          />
        })

       
      
      return (

       <div>
         <section>
             {posts}
         </section>
         <section>
           <Fullpost id={this.state.selectId}/>
         </section>
         <section>
           <Newpost/>
         </section>
        

       </div>
       
    
        
        
      );
    }

   
}

  


export default App;
