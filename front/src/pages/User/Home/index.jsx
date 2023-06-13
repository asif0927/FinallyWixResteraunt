import React from 'react'
import Drink from "../../../sections/Drink";
import Cow from "../../../sections/Cow";
import {Helmet} from "react-helmet";
const index = () => {
  return (
    <>
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    </div>
    <Cow/>
    <Drink/>
    </>
  )
}

export default index
