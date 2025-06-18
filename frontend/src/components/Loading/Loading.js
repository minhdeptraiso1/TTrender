import React from 'react'
import classes from './loading.module.css'
import { useLoading } from '../../hooks/useLoading';

export default function Loading() {
    const {loading} = useLoading();
    if(!loading) return null;
  return (
    <div className={classes.container}>
        <div className={classes.item}>
            <img src="/loading.svg" alt="loading" />
            <h1>Đang tải...</h1>
        </div>
    </div>
  )
}
