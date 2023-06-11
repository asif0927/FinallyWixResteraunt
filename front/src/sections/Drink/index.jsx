import React from 'react'
import style from "./index.module.css";
import { textAlign } from '@mui/system';
const index = () => {
  return (
    <>
     <section className={style.section}>
        <div className={style.flex}>
            <div style={{marginTop:"20%"}}>
            <h2 className={style.title}>Have a Drink</h2>
            <h2 className={style.title}>at the bar</h2>
            <p style={{textAlign:"center",marginTop:"30px"}}>
            <span className={style.span}>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit<br></br> Text” or double click me to add your own content and make changes to the font.&nbsp;I'm a<br></br> paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or<br></br> double click me to add your own content and make changes to the font.</span>
            </p>
            </div>
        </div>
     </section>
    </>
  )
}

export default index
