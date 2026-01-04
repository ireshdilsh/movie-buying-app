import { useState } from "react";
import dark_logo from "../assets/dark_logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Movies", href: "#movies" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Sign In", href: "#signin" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 sm:px-12 lg:px-20 py-4 border-b border-b-neutral-100">
        <div className="flex items-center gap-2">
          <img src={dark_logo} alt="MAG Logo" className="h-8" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-black transition"
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
          <Bars3Icon className="h-6 w-6 cursor-pointer" />
        </button>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white text-neutral-800 z-50 p-6">
          <div className="flex justify-between items-center">
            <img src={dark_logo} alt="dark-logo" className="h-8" />
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className=" text-gray-300 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* HERO SECTION */}
      <section
        className="
          flex flex-col
          items-start
          px-8 sm:px-12 lg:px-20
          mt-16 sm:mt-20 lg:mt-24
          mx-auto
        "
      >
        <div>
          <p className="text-sm text-gray-500 border mb-2 border-neutral-100 px-3 py-1 rounded-2xl w-84.5">Experience Cinema Like Never Before on MAG.</p>
          <h1
            className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-medium
            tracking-tight
            leading-tight
          "
          >
            Your Movie Night <br className="hidden sm:block" /> Starts Here.
          </h1>

          <p
            className="
            mt-4 sm:mt-6
            max-w-xl sm:max-w-2xl
            text-gray-600
            text-sm sm:text-base
            font-medium
          "
          >
            Discover the latest movies, choose your perfect seat, and book tickets
            instantly. MAG makes movie nights effortless and unforgettable.
          </p>

          <div
            className="
            mt-6 sm:mt-8
            flex flex-col sm:flex-row
            gap-4
            w-full sm:w-auto
          "
          >
            <button
              className="
              bg-amber-500 hover:opacity-85
              px-6 py-3
              rounded-lg
              font-medium
              flex items-center justify-center gap-3
              w-full sm:w-auto
              cursor-pointer
            "
            >
              Buy New Movies
              <img
                src="https://img.icons8.com/?size=100&id=59842&format=png&color=000000"
                className="w-5"
                alt="movie-icon"
              />
            </button>

            <button
              className="
              px-6 py-3
              rounded-lg
              border border-gray-600
              flex items-center justify-center gap-3
              w-full sm:w-auto
              cursor-pointer
            "
            >
              Explore More
              <img
                src="https://img.icons8.com/?size=100&id=99416&format=png&color=000000"
                className="w-5"
                alt="right-arrow"
              />
            </button>
          </div>
        </div>
      </section>

      {/* MOVIES SECTION */}
      <section id="movies" className="px-8 sm:px-12 lg:px-20 mt-12 sm:mt-16 lg:mt-24 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">
          Now Showing
        </h1>

        <p className="mt-4 sm:mt-2 text-center text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base">
          Explore the latest releases and trending movies. Watch trailers, check showtimes, and book your seats in just a few clicks.
        </p>

        {/* movie cards */}

      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="px-8 sm:px-12 lg:px-20 mt-12 sm:mt-16 lg:mt-24 mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">Experience the Magic of Cinema</h1>
        <p className="mt-4 sm:mt-2 text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base">
         Enjoy the full theater experience with MAG. Browse trending movies, watch trailers, reserve seats, and make every movie night unforgettable.
        </p>
      </section>

    </div>
  );
}
