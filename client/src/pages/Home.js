import React,{ useEffect, useState } from 'react'
import NavBar from '../Components/navbar';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
function StarRating({count, value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#f00', onChange}) {


  const stars = Array.from({length: count}, () => '🟊')


  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}>{s}</span>
        )
      })}
     
    </div>
  )
}
function Home(){
      let [ songs, setsongs ] = useState([]);
      let [ songartists, setsongartists ] = useState([]);
      let [ artistsongs, setartistsongs ] = useState([]);
    const getData = async () => {
        const results = await axios('http://localhost:8000/songhome');
        setsongs(results.data)
     
      };
      const getArtist  = async () => {
        const results = await axios('http://localhost:8000/viewhome');
        setsongartists(results.data)
    };
    const getArtistsong = async () => {
        const results = await axios('http://localhost:8000/artisthome');
        setartistsongs(results.data)
     
      };
 
      
      useEffect(() => {
        getData();
        getArtist();
        getArtistsong();
       
     
     
      },[])

    

   const card=songs.map(data=>
     
      <div class="col">
      <div class="card h-100">
      <img src={require('../coverimg/'+data.cover)} class="card-img-top" height="150px" alt="..."/>
      <div class="card-body">
          <h5 class="card-title">{data.songname}</h5>
          <p class="card-text">{data.dor}</p>
       { songartists.filter(a=>a.songname==data.songname).map(a=>
            <p class="card-text">{a.name}</p>
        )}
       
       <StarRating 
       key={songs.songid}
       count={5}
       size={35}
       value={data.ratings}
       activeColor ={'red'}
       inactiveColor={'#ddd'}
      />

   
      </div>
      </div>
  </div>

 
 
  )

  const artistcard=artistsongs.map(data=>
    <div class="col">
    <div class="card text-white bg-dark h-100">
    <div class="card-header text-info">{data.name}</div>
    <div class="card-body">
      
        <p class="card-text">DOB: {data.dob}</p>
        <p class="text-warning card-text">Songs:</p>
        { songartists.filter(a=>a.name==data.name).map(a=>
            <p>{a.songname}</p>
        )}

    
        </div>
      </div>
      
      </div>
  
  )
 


return(
    <div>
        <NavBar/>
        <br/>
        
        <div className="row p-3">
            <div className="col-sm">
            <h4>Top 10 Songs</h4>
            </div>
            <div className="col-sm">
            </div>
            <div className="col-sm">
            </div>
            <div className="col-sm">
            <Link to="/newsong" className="btn btn-primary">
            <button type="button" className="btn btn-primary">Add New Song</button>
            </Link>
            </div>
        </div>
        


        <div class="row row-cols-1 row-cols-md-5 g-4 p-3">
        {card}
  
 
        </div>

        <div className="row p-3">
            <div className="col-sm">
            <h4>Top 10 Artists</h4>
            </div>
           
        </div>

        <div class="row row-cols-1 row-cols-md-5 g-4 p-3">
        {artistcard}
  
 
        </div>

    </div>
  

)
}

export default Home;