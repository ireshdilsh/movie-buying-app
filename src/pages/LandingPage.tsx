import { useState } from "react";
import dark_logo from "../assets/dark_logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Movies", href: "#movies" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Sign In", href: "#signin" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [login, setlogin] = useState(false);
  const [register, setregister] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Handle Login
  const handleLogin = async () => {
    try {
      if (!loginEmail || !loginPassword) {
        alert('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: loginEmail,
        password: loginPassword
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Navigate based on user role
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    }
  };

  // Handle Register
  const handleRegister = async () => {
    try {
      if (!registerName || !registerEmail || !registerPassword) {
        alert('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: 'user'
      });

      if (response.data.success) {
        alert('Registration successful! Please login.');
        setregister(false);
        setlogin(true);
        // Clear register form
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
      console.error('Registration error:', error);
    }
  };

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
          <p className="text-sm text-gray-500 border mb-2 border-neutral-200 px-3 py-1 rounded-2xl w-84.5">Experience Cinema Like Never Before on MAG.</p>
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
              onClick={() => { setregister(true) }}
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

            onClick={()=>{setlogin(true)}}
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

        <p className="text-sm text-gray-600 rounded-3xl px-2 py-1 border border-neutral-200 mb-2">Discover what’s playing near you</p>

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
        <p className="text-sm text-gray-600 rounded-3xl px-2 py-1 border border-neutral-200 w-59 mb-2">Smart features for cinema lovers</p>
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">Experience the Magic of Cinema</h1>

        <p className="mt-4 sm:mt-2 text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base">
          Enjoy the full theater experience with MAG. Browse trending movies, watch trailers, reserve seats, and make every movie night unforgettable.
        </p>

        {/* Service Cards */}
      </section>

      <section id="about" className="flex justify-center items-center flex-col px-8 lg:px-20 sm:px-12 mt-12 sm:mt-16 lg:mt-24 mx-auto">
        <p className="text-sm px-2 py-1 rounded-3xl border border-neutral-200 mb-2 text-gray-600">Bringing the magic of cinema closer to you</p>
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">About MAG</h1>
        <p className="mt-4 sm:mt-2 text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base text-center">MAG is a modern movie ticket booking platform that makes discovering movies, choosing seats, and booking tickets fast, easy, and hassle-free.</p>
        <div className="flex">
          <div>
            {/* paragraph text */}
          </div>
          <div>
            {/* images sets */}
          </div>
        </div>
      </section>

      {/* Login */}
      {login && (
        <div className="flex justify-center items-center fixed inset-0 bg-black/50 z-50 px-4 sm:px-6">
          <div className="bg-white rounded-sm py-8 sm:py-10 px-6 sm:px-10 flex flex-col justify-center items-center w-full max-w-md sm:max-w-lg">

            {/* Close Button */}
            <div className="w-full flex justify-end cursor-pointer" onClick={() => setlogin(false)}>
              <img
                src="https://img.icons8.com/?size=100&id=83149&format=png&color=000000"
                alt="close-icon"
                className="h-5 sm:h-6"
              />
            </div>

            {/* Logo */}
            <img src={dark_logo} alt="dark-logo" className="w-20 sm:w-20 my-2" />

            {/* Heading */}
            <h1 className="sm:text-xl font-semibold mt-2 text-center">Welcome Back</h1>

            {/* Description */}
            <p className="text-sm sm:text-sm text-gray-600 text-center mt-1 sm:mt-2">
              Access your account to explore movies and book tickets instantly.
            </p>

            {/* Form */}
            <div className="w-95 mt-4 sm:mt-6 flex flex-col gap-2">
              <div id="email-address" className="flex flex-col">
                <label className="text-sm sm:text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </div>
              <div id="password" className="flex flex-col">
                <label className="text-sm sm:text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <input type="checkbox" id="remember-me" className="mr-2" />
                  <label htmlFor="remember-me" className="text-sm sm:text-sm">Remember Me</label>
                </div>
                <div>
                  <a href="#" className="text-sm sm:text-sm text-amber-500 hover:underline">Forgot Password?</a>
                </div>
              </div>
              <button 
                onClick={handleLogin}
                className="bg-amber-500 hover:opacity-85 px-6 py-2 sm:py-2 rounded-lg font-medium mt-2 sm:mt-2 w-full cursor-pointer text-sm sm:text-base">
                Authorization
              </button>
            </div>

            {/* Divider */}
            <div className="w-95 bg-neutral-200 h-[1px] mt-4 sm:mt-5"></div>

            {/* Continue With Google */}
            <button className="mt-3 sm:mt-4 px-6 py-2 sm:py-2 border border-gray-300 rounded-lg font-medium cursor-pointer w-95 flex justify-center items-center gap-3 sm:gap-7 text-sm sm:text-base">
              Continue With Google
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="google-icon"
                className="w-4 sm:w-5"
              />
            </button>
            <div className="flex justify-between items-center w-95">
              <p className="text-sm sm:text-sm mt-4">Don't have an account?</p>
              <a href="#" className="text-sm sm:text-base font-medium hover:underline mt-4" onClick={()=>{setlogin(false); setregister(true);}}>Sign Up</a>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {register && (
        <div className="flex justify-center items-center fixed inset-0 bg-black/50 z-50 px-4 sm:px-6">
          <div className="bg-white rounded-sm py-8 sm:py-10 px-6 sm:px-10 flex flex-col justify-center items-center w-full max-w-md sm:max-w-lg">

            {/* Close Button */}
            <div className="w-full flex justify-end cursor-pointer" onClick={() => setregister(false)}>
              <img
                src="https://img.icons8.com/?size=100&id=83149&format=png&color=000000"
                alt="close-icon"
                className="h-5 sm:h-6"
              />
            </div>

            {/* Logo */}
            <img src={dark_logo} alt="dark-logo" className="w-20 sm:w-20 my-2" />

            {/* Heading */}
            <h1 className="sm:text-xl font-semibold mt-2 text-center">Get Started with MAG</h1>

            {/* Description */}
            <p className="text-sm sm:text-sm text-gray-600 text-center mt-1 sm:mt-2">
              Access your account to explore movies and book tickets instantly.
            </p>

            {/* Form */}
            <div className="w-95 mt-4 sm:mt-6 flex flex-col gap-2">
               <div id="full-name" className="flex flex-col">
                <label className="text-sm sm:text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </div>
              <div id="email-address" className="flex flex-col">
                <label className="text-sm sm:text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </div>
              <div id="password" className="flex flex-col">
                <label className="text-sm sm:text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </div>
              <button 
                onClick={handleRegister}
                className="bg-amber-500 hover:opacity-85 px-6 py-2 sm:py-2 rounded-lg font-medium mt-2 sm:mt-2 w-full cursor-pointer text-sm sm:text-base">
                Authorization
              </button>
            </div>

            {/* Divider */}
            <div className="w-95 bg-neutral-200 h-[1px] mt-4 sm:mt-5"></div>

            {/* Continue With Google */}
            <button className="mt-3 sm:mt-4 px-6 py-2 sm:py-2 border border-gray-300 rounded-lg font-medium cursor-pointer w-95 flex justify-center items-center gap-3 sm:gap-7 text-sm sm:text-base">
              Continue With Google
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="google-icon"
                className="w-4 sm:w-5"
              />
            </button>
            <div className="flex justify-between items-center w-95">
              <p className="text-sm sm:text-sm mt-4">Don't have an account?</p>
              <a href="#" className="text-sm font-medium sm:text-base hover:underline mt-4" onClick={()=>{setlogin(true);setregister(false);}}>Sign In</a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
