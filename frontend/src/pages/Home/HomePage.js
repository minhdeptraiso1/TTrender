//trang chủ

import React, { useEffect, useReducer } from 'react'
import { getAll, getAllTags, getTagByName, search } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';
const initialState = { foods: [], tags: []};

const reducer = (state, action) => {
    switch(action.type){
        case "Đang tải món ăn":
            return { ...state, foods: action.payload };
        case "Đang tải tag":
            return { ...state, tags: action.payload };
        default:
            return state;
    }
}
export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods, tags} = state;
    const {searchTerm, tagName} = useParams();
    useEffect(() => {
        getAllTags().then(tags => dispatch({type: "Đang tải tag", payload: tags}));
        const loadFoods = tagName 
        ? getTagByName(tagName) 
        : searchTerm 
        ? search(searchTerm) 
        : getAll();
        loadFoods.then((foods) => dispatch({type: "Đang tải món ăn", payload: foods}));
    }, [searchTerm, tagName]);
      
  return (
    <>
    <Search/>
    <Tags tags={tags}/>
    {foods.length === 0 && <NotFound />}
    <Thumbnails  foods={foods}/>
    </>
  )
}
