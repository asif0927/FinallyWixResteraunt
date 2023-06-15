import React from 'react'
import Drink from "../../../sections/Drink";
import Steak from "../../../sections/Steak";
import Cow from "../../../sections/Cow";
import Adress from "../../../sections/Adress";
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
    <div>
    <Adress/>
    <Steak/>
    <Cow/>
    <Drink/>
    </div>
    </>
  )
}

export default index
