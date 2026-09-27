import {useEffect,React,useState} from "react";
import axios from 'axios'
export default function createpost() {

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const formData = new FormData(e.target)
            const response = await axios.post('http://localhost:3030/create-post',formData)
            console.log(response.data)
            e.target.reset()
        }catch(err){
            console.log('post creation is failed!',err)
        }
    }
  return (
    <>
      <section className="container">
        <h1>create post</h1>
        <form onSubmit={handleSubmit} className="form" action="">
          <input className="input" type="file" name="img" accept="image" required />
          <input className="input" type="text" placeholder="enter caption" name="caption" required />
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </section>
    </>
  );
}
