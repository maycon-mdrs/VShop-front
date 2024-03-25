import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { CategoriesPage } from '@/pages/CategoriesPage'

function App() {

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  )
}

export default App
