import React from 'react'
import NavBar from '../Components/navbar';
import {
    Link
  } from "react-router-dom";
function newartist(){
return(
    <div>
        <NavBar/>
        <br/>
        <div className='p-3'>
        <h4>Adding a new Artist</h4>
        <form action='http://localhost:8000/newartist' method='POST'>
          
           <div className="mb-3 row ">
    <label for="staticEmail" className="col-sm-2 col-form-label">Artist Name</label>
    <div className="col-sm-4">
      <input type="text" readonly className="form-control" name="artistname" id="artistname" required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">DOB</label>
    <div className="col-sm-4">
      <input type="date" className="form-control" name="dob"  id="dob" required/>
    </div>
  </div>

  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Bio</label>
    <div className="col-sm-4">
      <textarea type="text" className="form-control" name="bio"  id="bio"/>
    </div>
  </div>
  <div className="mb-4 row">
  <div className="col-sm-2">
  
      </div>
      <div className="col-sm-2">
      <Link to="/newsong" className="btn-primary">
      <button type="button" className="btn btn-danger">Cancel</button>&nbsp;
      </Link>
      <button type="submit" className="btn btn-success">Done</button>
     </div>
   
  </div>
  </form>
       </div>

    </div>
)
}
export default newartist;