import React, { useEffect, useState } from 'react';
import AdminNavbar from '../component/AdminNavbar';
import axios from 'axios';

interface Purchase {
    email: string;
    movie: {
        _id: string;
        name: string;
        bannerURL: string;
        genre: string;
        director: string;
    };
    price: number;
    purchaseDate: string;
    createdAt: string;
}

export default function AdminBuyingMovies() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        getAllPurchases();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPurchases(purchases);
        } else {
            const filtered = purchases.filter(
                (purchase) =>
                    purchase.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    purchase.movie?.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPurchases(filtered);
        }
    }, [searchQuery, purchases]);

    const getAllPurchases = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('Authentication required. Please login again.');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/users/purchases/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                setPurchases(response.data.purchases);
                setFilteredPurchases(response.data.purchases);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error fetching purchases:', error);
            const errorMessage = error.response?.data?.message || 'Failed to load purchases';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const calculateTotalRevenue = () => {
        return filteredPurchases.reduce((total, purchase) => total + purchase.price, 0).toFixed(2);
    };

    return (
        <div className="flex flex-col px-4 sm:px-6 min-h-screen bg-white">
            {/* Admin Navbar */}
            <AdminNavbar />

            {/* Hero Section */}
            <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">
                <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    <div className="bg-amber-500 rounded-full h-2.5 w-2.5"></div>
                    Monitor all movie purchases and revenue
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    User Purchases
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    View and manage all user movie purchases. Track revenue, monitor buying patterns, and analyze customer behavior.
                </p>

                {/* Search Bar */}
                <div className="flex mt-6 justify-center items-center sm:mt-6 lg:mt-8 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-5 w-full sm:w-[320px] md:w-[420px] pr-18 lg:w-[600px] h-10 sm:h-11 border bg-neutral-100 rounded-3xl border-none text-sm sm:text-base"
                        placeholder="Search by email or movie name..."
                    />
                    <button className="h-8.5 bg-black rounded-2xl px-3 absolute right-1.5 cursor-pointer hover:opacity-80">
                        <img
                            src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff"
                            className="w-5 h-5"
                            alt="search icon"
                        />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="flex justify-center mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-medium mb-2">Total Purchases</p>
                        <p className="text-3xl font-bold text-amber-500">{filteredPurchases.length}</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-medium mb-2">Total Revenue</p>
                        <p className="text-3xl font-bold text-amber-500">Rs.{calculateTotalRevenue()}</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-medium mb-2">Active Users</p>
                        <p className="text-3xl font-bold text-amber-500">
                            {new Set(filteredPurchases.map((p) => p.email)).size}
                        </p>
                    </div>
                </div>
            </div>

            {/* Purchases Table/Cards */}
            <div className="flex justify-center mt-12 pb-12">
                <div className="w-full max-w-7xl">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">Loading purchases...</p>
                        </div>
                    ) : filteredPurchases.length > 0 ? (
                        <div className="space-y-4">
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full border border-neutral-200 rounded-lg">
                                    <thead className="bg-neutral-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User Email</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Movie</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Genre</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Purchase Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-neutral-200">
                                        {filteredPurchases.map((purchase, index) => (
                                            <tr key={index} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">{purchase.email}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={purchase.movie?.bannerURL}
                                                            alt={purchase.movie?.name}
                                                            className="w-12 h-16 object-cover rounded"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {purchase.movie?.name}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Dir: {purchase.movie?.director}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
                                                        {purchase.movie?.genre || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                    ${purchase.price.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {formatDate(purchase.purchaseDate)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {filteredPurchases.map((purchase, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={purchase.movie?.bannerURL}
                                                alt={purchase.movie?.name}
                                                className="w-20 h-28 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {purchase.movie?.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {purchase.movie?.director}
                                                </p>
                                                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                                                    {purchase.movie?.genre || 'N/A'}
                                                </span>
                                                <div className="mt-3 space-y-1">
                                                    <p className="text-sm">
                                                        <span className="font-medium">User:</span> {purchase.email}
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium">Price:</span> $
                                                        {purchase.price.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(purchase.purchaseDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-neutral-200 rounded-lg">
                            <img
                                src="https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
                                alt="no purchases"
                                className="w-16 h-16 mx-auto mb-4 opacity-50"
                            />
                            <p className="text-gray-600 text-lg">No purchases found</p>
                            <p className="text-gray-500 text-sm mt-2">
                                {searchQuery ? 'Try adjusting your search' : 'No users have purchased movies yet'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
