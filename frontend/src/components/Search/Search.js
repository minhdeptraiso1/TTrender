import React, { useState, useEffect } from 'react'
import classes from './search.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function Search() {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchTerm } = useParams();
    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm]);
    const search = async () => {
        term ? navigate(`/search/${term}`) : navigate('/');
    }
  return (
    <div className={classes.container}>
        <input type="text" 
        onKeyUp={(e) => e.key === 'Enter' && search()}
        value={term} 
        onChange={(e) => setTerm(e.target.value)} 
        placeholder="Tìm kiếm món ăn"
        />
        <button onClick={search}>Tìm kiếm</button>
    </div>
  )
}
