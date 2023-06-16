import React from 'react'
import Drink from "../../../sections/Drink";
import Steak from "../../../sections/Steak";
import Cow from "../../../sections/Cow";
import Chat from "../../../sections/Chat";
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
    <div style={{position:"relative"}}>
    <Adress/>
    <Steak/>
    <Cow/>
    <Chat/>
    <Drink/>
    </div>
    </>
  )
}

export default index
