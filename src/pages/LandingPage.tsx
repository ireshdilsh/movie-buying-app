import React from 'react'
import dark_logo from '../assets/dark_logo.png'

export default function LandingPage() {
  return (
    <div>
       <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={dark_logo} alt="MAG Logo" className="h-8" />
          <span className="text-xl font-bold">MAG</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <a
              key={item.n