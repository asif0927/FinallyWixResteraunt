import React from 'react'
import {Helmet} from "react-helmet"; 
import GallerySection from "../../../sections/GallerySection";
const index = () => {
  return (
    <>
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gallery</title>
            </Helmet>
    </div>
    <div style={{marginTop:"50px"}}>
     <GallerySection/>
   </div>
    </>
  )
}

export default index
