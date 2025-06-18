import React from 'react'
import classes from './title.module.css';
export default function Title({title, fontSize, margin}) {
  return (
    <div className={classes.title} style={{fontSize, margin,color:"red"}}>{title}</div>
  )
}
