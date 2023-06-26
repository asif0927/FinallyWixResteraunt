import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const index = () => {
  return (
    <>
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>NotFound</title>
            </Helmet>
    </div>
    <div style={{marginTop:"80px",marginLeft:"50px",marginBottom:"40%"}}>
     <Link to="/"style={{color:"black",fontSize:"28px"}}>Main Page</Link>
     <div style={{marginTop:"30px",fontSize:"25px",textAlign:"center",color:"red"}}>Page not found!</div>
    </div>
    </>
  )
}

export default index
