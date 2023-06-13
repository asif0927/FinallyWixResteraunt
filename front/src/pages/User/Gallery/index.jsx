import React from 'react'
import {Helmet} from "react-helmet";
const index = () => {
  return (
    <>
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gallery</title>
            </Helmet>
    </div>
    <div>
      gallery
    </div>
    </>
  )
}

export default index
