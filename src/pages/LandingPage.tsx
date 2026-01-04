import React, { useState } from 'react'
import dark_logo from '../assets/dark_logo.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';

const navigation = [
  { name: "Home", href: "#" },
  { name: "Movies", href: "#movies" },
  { name: "Showtimes", href: "#showtimes" },
  { name: "About", href: "#about" },
  { name: "Sign In", href: "#signin" },
];

export default function LandingPage() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <header className="flex items-center justify-between px-25 py-4">
        <div className="flex items-center gap-2">
          <img src={dark_logo} alt="MAG Logo" className="h-8" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 p-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">MAG</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* hero section */}
      <section className="flex flex-col items-start justify-start px-6 mt-24 lg:px-25 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
         Your Movie Night <br /> Starts Here.
        </h1>

        <p className="mt-6 max-w-3xl text-gray-600">
          Discover the latest movies, choose your perfect seat, and book tickets
          instantly. MAG makes movie nights effortless and unforgettable.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-amber-500 hover:opacity-85 cursor-pointer px-6 py-3 rounded-lg font-medium flex justify-center items-center gap-2.5">
            Buy New Movies
            <img src="https://img.icons8.com/?size=100&id=59842&format=png&color=000000" className='w-5' alt="movie-icon" />
          </button>
          <button className="border border-gray-600 hover:border-white px-6 py-3 rounded-lg">
            Explore More
          </button>
        </div>
      </section>

    </div>
  )
}
