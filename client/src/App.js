import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages';
import { AllJobs, AddJob, Profile, Stats, SharedLayout } from './pages/Dashboard'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <SharedLayout />  </ProtectedRoute>}> {/*using ProtectedRoute for make url safe from Unauthorized Users*/}
          <Route index element={<Stats/>} />  {/*index is used for showing a Opened page on home page*/}
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
