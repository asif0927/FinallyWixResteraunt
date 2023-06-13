import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div>
      <Link to="/admin/sliders">Sliders</Link>
      <Link to="/admin/dashboards">Dashboard</Link>
    </div>
  )
}

export default index
