import { useEffect } from 'react'
import {React, useState} from 'react'
import axios from 'axios'

export default function feed() {
    const [posts,setPosts] = useState([])
    async function getPost(req,res){
        try{
            const res = await axios.get('http://localhost:3030/get-posts')
            return setPosts(res.data.post)
        }catch(err){
            res.status(400).json({
                status:false,
                message:'fetching process is failed!',
                err:err.message
            })
        }
    }
    useEffect(()=>{
        getPost()
    },[])
    console.log(posts)
  return (
    <>
      <section className="container-feed">
        <h1>Feed</h1>
        {
            posts.length ? (
                posts.map((post,index)=>(
                    <div className='card' key={post._id}>
                        <img className='img' src={post.img} alt="" />
                        <p>{post.caption}</p>
                    </div>
                ))
            ): <h3>post is empty !</h3> 
        }
      </section>
    </>
  )
}
