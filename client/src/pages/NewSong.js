import React,{ useEffect, useState } from 'react'
import NavBar from '../Components/navbar';
import axios from 'axios';

import {
  Link
} from "react-router-dom";
function NewSong(){
  const getData = async () => {
    const results = await axios('http://localhost:8000/artist');
    setartists(results.data)
  };

  let [ artists, setartists ] = useState([])
  useEffect(() => {
    getData();
 
  },[])

  // console.log(artists);
  const artistname=artists.map(res=>  <option key={res.artistid} value={res.artistid}>{res.name}</option>);
return(

    <div >
           <NavBar/>
           <br/>
           <div className='p-3'>
           <h4>Adding a new Song</h4>
           <form action='http://localhost:8000/newsong' method='POST' enctype="multipart/form-data">
  <div className="mb-3 row ">
    <label for="staticEmail" className="col-sm-2 col-form-label">Song Name</label>
    <div className="col-sm-4">
      <input type="text" readonly className="form-control" id="songname" name="songname" required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Date Released</label>
    <div className="col-sm-4">
      <input type="date" className="form-control" id="dor" name="dor" required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Artwork</label>
    <div className="col-sm-4">
      <input type="file" className="form-control" id="cover" name="cover" required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label" >Artist</label>
    <div className="col-sm-4">
    <select class="form-control"  id="artistid" name="artistid"  multiple required>
     {artistname}
    </select>
    </div>
    <div className="col-sm-4">
    <Link to="/newartist" className="btn-primary">
    <button type="button" className="start-btn btn btn-primary" >Add Artist</button>
    </Link>
      </div>
  </div>
  <div className="mb-4 row">
  <div className="col-sm-2">
  
      </div>
      <div className="col-sm-2">
      <Link to="/" className="btn-primary">
      <button type="button" className="btn btn-danger">Cancel</button>&nbsp;
      </Link>
      <button type="submit" className="btn btn-success">Save</button>
     </div>
   
  </div>
  </form>
  </div>

 </div>

)
}

export default NewSong;