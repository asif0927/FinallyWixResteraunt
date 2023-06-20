import React from 'react'
import Drink from "../../../sections/Drink";
import Steak from "../../../sections/Steak";
import Social from "../../../sections/Social";
import Cow from "../../../sections/Cow";
import Chat from "../../../sections/Chat";
import ContactandMap from "../../../sections/ContactandMap";
import Gif from "../../../sections/Gif";
import GallerySection from "../../../sections/GallerySection";
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
    <Social/>
    <Cow/>
    <Chat/>
    <Drink/>
    <GallerySection/>
    <Gif/>
    <ContactandMap/>
    </div>
    </>
  )
}

export default index
