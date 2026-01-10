import { useState } from "react";
import dark_logo from "../assets/dark_logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

const navigation = [
  { name: "Home", href: "#" },
  { name: "Movies", href: "#movies" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
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

  // Handle Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const { name, email } = userInfo.data;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({ name, email, role: 'user' }));
        localStorage.setItem('token', tokenResponse.access_token);

        // Close modals and navigate
        setlogin(false);
        setregister(false);
        navigate('/user/dashboard');
      } catch (error) {
        console.error('Google login error:', error);
        alert('Google authentication failed');
      }
    },
    onError: () => {
      console.error('Google Login Failed');
      alert('Google authentication failed');
    }
  });

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
          relative
          flex flex-col
          items-start
          px-8 sm:px-12 lg:px-20
          pt-16 sm:pt-20 lg:pt-24
          mx-auto
          min-h-[500px]
        "
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        
        <div className="relative z-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-12 max-w-6xl mx-auto w-full">
          
          {/* Movie Card 1 */}
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative w-full h-48 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop" 
                alt="Movie 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Midnight Cinema</h3>
              <p className="text-gray-600 text-sm mb-3">Action • Thriller • 2h 15m</p>
              <button className="w-full bg-amber-500 hover:opacity-85 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer">
                Book Now
              </button>
            </div>
          </div>

          {/* Movie Card 2 */}
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative w-full h-48 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop" 
                alt="Movie 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Dreams of Tomorrow</h3>
              <p className="text-gray-600 text-sm mb-3">Drama • Romance • 2h 10m</p>
              <button className="w-full bg-amber-500 hover:opacity-85 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer">
                Book Now
              </button>
            </div>
          </div>

          {/* Movie Card 3 */}
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative w-full h-48 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=500&auto=format&fit=crop" 
                alt="Movie 3" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Cosmic Quest</h3>
              <p className="text-gray-600 text-sm mb-3">Sci-Fi • Adventure • 2h 25m</p>
              <button className="w-full bg-amber-500 hover:opacity-85 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer">
                Book Now
              </button>
            </div>
          </div>

          {/* Movie Card 4 */}
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative w-full h-48 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop" 
                alt="Movie 4" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Echoes of Love</h3>
              <p className="text-gray-600 text-sm mb-3">Comedy • Drama • 1h 55m</p>
              <button className="w-full bg-amber-500 hover:opacity-85 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer">
                Book Now
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="px-8 sm:px-12 lg:px-20 mt-12 sm:mt-16 lg:mt-24 mx-auto">
        <p className="text-sm text-gray-600 rounded-3xl px-2 py-1 border border-neutral-200 w-59 mb-2">Smart features for cinema lovers</p>
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">Experience the Magic of Cinema</h1>

        <p className="mt-4 sm:mt-2 text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base">
          Enjoy the full theater experience with MAG. Browse trending movies, watch trailers, reserve seats, and make every movie night unforgettable.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-12 max-w-6xl mx-auto">
          
          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=59842&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Book your tickets in just a few clicks with our intuitive and user-friendly interface.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=85038&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Seat Selection</h3>
            <p className="text-gray-600 text-sm">Choose your perfect seat with our interactive seat map and real-time availability.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=86207&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">Safe and secure payment options with instant confirmation for peace of mind.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=12580&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mobile Tickets</h3>
            <p className="text-gray-600 text-sm">Skip the lines with digital tickets delivered straight to your mobile device.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=85080&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Our dedicated support team is always ready to help you with any questions.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-gray-600 text-sm">Get movie suggestions tailored to your preferences and viewing history.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=64096&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Watch Trailers</h3>
            <p className="text-gray-600 text-sm">Preview movies before booking with high-quality trailers and video content.</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://img.icons8.com/?size=100&id=85186&format=png&color=000000" alt="icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Theaters</h3>
            <p className="text-gray-600 text-sm">Access theaters across the country and find the best showtimes near you.</p>
          </div>

        </div>
      </section>

      <section id="about" className="flex justify-center bg-neutral-50 pt-20 items-center flex-col px-8 lg:px-20 sm:px-12 mt-12 sm:mt-16 lg:mt-24 mx-auto">
        <p className="text-sm px-2 py-1 rounded-3xl border border-neutral-200 mb-2 text-gray-600">Bringing the magic of cinema closer to you</p>
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight">About MAG</h1>
        <p className="mt-4 sm:mt-2 text-gray-600 font-medium max-w-xl sm:max-w-2xl text-sm sm:text-base text-center">MAG is a modern movie ticket booking platform that makes discovering movies, choosing seats, and booking tickets fast, easy, and hassle-free.</p>
        <div className="flex flex-col md:flex-row gap-8 mt-8 sm:mt-12 max-w-6xl w-full">
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with a passion for cinema, MAG transforms the way you experience movies. We bring together cutting-edge technology and user-friendly design to create the ultimate movie booking experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform offers seamless ticket booking, real-time seat selection, and instant confirmations. Whether you're planning a date night, family outing, or solo movie marathon, MAG makes it effortless.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We partner with theaters nationwide to bring you the widest selection of movies, from blockbuster hits to indie gems. Our user-friendly interface ensures you can browse, select, and book your perfect movie experience in minutes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              With secure payment options, mobile ticketing, and personalized recommendations, we're committed to making every visit to the cinema memorable. No more waiting in long queues or missing out on sold-out shows.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our dedicated customer support team is available 24/7 to assist you with any questions or concerns. We believe in transparency, reliability, and putting our customers first in everything we do.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Join thousands of movie enthusiasts who trust MAG for their entertainment needs. Experience the future of movie booking today and discover why cinema lovers everywhere are choosing MAG as their go-to platform.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop" 
              alt="Cinema experience" 
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
            <img 
              src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=800&auto=format&fit=crop" 
              alt="Movie theater" 
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
            <img 
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop" 
              alt="Popcorn and movies" 
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
            <img 
              src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop" 
              alt="Cinema seats" 
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
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
            <button 
              onClick={() => googleLogin()}
              className="mt-3 sm:mt-4 px-6 py-2 sm:py-2 border border-gray-300 rounded-lg font-medium cursor-pointer w-95 flex justify-center items-center gap-3 sm:gap-7 text-sm sm:text-base">
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
            <button 
              onClick={() => googleLogin()}
              className="mt-3 sm:mt-4 px-6 py-2 sm:py-2 border border-gray-300 rounded-lg font-medium cursor-pointer w-95 flex justify-center items-center gap-3 sm:gap-7 text-sm sm:text-base">
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
