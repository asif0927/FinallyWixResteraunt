import React from 'react'
import {Helmet} from "react-helmet";
import ContactandMap from "../../../sections/ContactandMap";
const index = () => {
  return (
   <>
   <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contact</title>
            </Helmet>
    </div>
   <div style={{marginTop:"50px"}}>
     <ContactandMap/>
   </div>
   </>
  )
}

export default index
