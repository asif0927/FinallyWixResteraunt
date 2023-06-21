import React from 'react'
import { Helmet } from 'react-helmet';
import Service from "../../../sections/Service";
const index = () => {
  return (
   <>
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>OurPlace</title>
            </Helmet>
    </div>
    <div style={{marginTop:"50px"}}>
     <Service/>
    </div>
   </>
  )
}

export default index
