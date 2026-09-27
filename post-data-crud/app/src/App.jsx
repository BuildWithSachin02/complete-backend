import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Createpost from './pages/createpost'
import Feed from './pages/feed'
export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Feed/>} />
        <Route path='/create' element={<Createpost/>} />
      </Routes>
    </>
  )
}
