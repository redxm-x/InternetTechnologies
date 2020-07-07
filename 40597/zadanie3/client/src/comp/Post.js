import React from 'react'

import classes from './Post.module.css'

const post = (props) => (
        <article className={classes.Post} onClick={props.clicked}>
            <h2>{props.id}</h2>
            <div className={classes.Author}>{props.autor}</div>
        </article>      
   
)

   
  export default post;