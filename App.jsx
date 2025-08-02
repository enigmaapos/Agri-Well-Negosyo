import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signOut, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';

// The global variables are automatically provided by the Canvas environment.
// We use them to initialize Firebase.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App
let app, auth;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const App = () => {
    // State to hold the current logged-in user object and loading status
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect hook to handle Firebase authentication state changes
    useEffect(() => {
        if (!auth) return;

        // Set up a listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        // Sign in with the custom token if it exists
        const signInWithToken = async () => {
            if (initialAuthToken) {
                try {
                    await signInWithCustomToken(auth, initialAuthToken);
                } catch (error) {
                    console.error("Error signing in with custom token:", error);
                    // Fallback to anonymous sign-in if custom token fails
                    try {
                        await signInAnonymously(auth);
                    } catch (anonymousError) {
                        console.error("Error signing in anonymously:", anonymousError);
                    }
                }
            } else {
                // Sign in anonymously if no custom token is available
                try {
                    await signInAnonymously(auth);
                } catch (error) {
                    console.error("Error signing in anonymously:", error);
                }
            }
        };

        signInWithToken();

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);

    // Function to handle anonymous login
    const handleLogin = async () => {
        try {
            setLoading(true);
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Error signing in anonymously:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Responsive navigation toggle state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // If still loading, show a loading message or spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-green-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="text-gray-800 font-inter">
            {/* Header & Navigation */}
            <header className="sticky top-0 z-50 bg-white shadow-lg">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-green-700">Agri-Well/1Nature Team Ayos</a>
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="#home" className="text-gray-600 hover:text-green-600 transition-colors duration-300">Home</a>
                        <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors duration-300">About Us</a>
                        <a href="#opportunities" className="text-gray-600 hover:text-green-600 transition-colors duration-300">Opportunities</a>
                        <a href="#join" className="text-gray-600 hover:text-green-600 transition-colors duration-300">How to Join</a>
                        <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors duration-300">Contact</a>
                        <a href="#join-form" className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300">Join Now</a>
                        
                        {/* Login/Logout Button and User ID */}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Logged in as: {user.uid}</span>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
                                Login Anonymously
                            </button>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <button id="mobile-menu-button" onClick={toggleMobileMenu} className="md:hidden text-gray-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </nav>
                {/* Mobile Menu */}
                <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg py-2`}>
                    <a href="#home" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</a>
                    <a href="#about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About Us</a>
                    <a href="#opportunities" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Opportunities</a>
                    <a href="#join" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">How to Join</a>
                    <a href="#contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</a>
                    <a href="#join-form" className="block px-4 py-2 text-white bg-green-600 m-2 rounded-full text-center hover:bg-green-700">Join Now</a>
                    
                    {/* Mobile Login/Logout Button and User ID */}
                    <div className="px-4 py-2 flex flex-col items-center space-y-2">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-500">Logged in as: {user.uid}</span>
                                <button onClick={handleLogout} className="w-full bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button onClick={handleLogin} className="w-full bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
                                Login Anonymously
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main>
                {/* 1. Landing Page / Home */}
                <section id="home" className="flex items-center justify-center text-white h-screen hero-bg">
                    <div className="text-center bg-black bg-opacity-50 p-8 rounded-xl max-w-2xl mx-4">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Join the Agri-Wellness Revolution</h1>
                        <p className="text-lg md:text-xl mb-8">Empowering Filipino families through sustainable farming and holistic wellness.</p>
                        <a href="#join-form" className="bg-green-600 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300">Join Now</a>
                    </div>
                </section>

                {/* 2. About Us */}
                <section id="about" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">About Us</h2>
                        </div>
                        <div className="md:flex md:space-x-12 items-center">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <img src="https://placehold.co/800x600/e6f5e1/2d5b16?text=Agri-Well+Mission" alt="Our Mission" className="rounded-xl shadow-lg" />
                            </div>
                            <div className="md:w-1/2">
                                <div className="bg-white p-8 rounded-xl shadow-lg">
                                    <h3 className="text-2xl font-semibold mb-4 text-green-700">Our Mission</h3>
                                    <p className="mb-6 leading-relaxed">
                                        Our mission is to promote health and sustainability through natural farming and holistic wellness, nurturing a greener planet and healthier lives.
                                    </p>
                                    <h3 className="text-2xl font-semibold mb-4 text-green-700">Our Vision</h3>
                                    <p className="leading-relaxed">
                                        We envision a future where every Filipino family is empowered with the knowledge and resources to achieve financial independence and total healing, one garden and one home at a time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Agri-Well Opportunities */}
                <section id="opportunities" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">Agri-Well Opportunities</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h4 className="text-xl font-semibold text-green-700 mb-2">Agriculture Products</h4>
                                <p className="text-gray-600">Discover our range of organic vegetables, herbs, and easy-to-grow plant kits for your home garden.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h4 className="text-xl font-semibold text-green-700 mb-2">Wellness Products</h4>
                                <p className="text-gray-600">Explore natural remedies like essential oils, herbal teas, and other products designed for holistic healing and well-being.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h4 className="text-xl font-semibold text-green-700 mb-2">Affiliate/Negosyo Kit</h4>
                                <p className="text-gray-600">Start your own business with our comprehensive starter packages and a clear earnings breakdown to help you succeed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. How to Join */}
                <section id="join" className="py-20 bg-green-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold section-title mx-auto">How to Join</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 bg-green-800 rounded-xl shadow-lg">
                                <h3 className="text-4xl font-bold mb-4">1</h3>
                                <h4 className="text-xl font-semibold mb-2">Register Online</h4>
                                <p>Fill out our simple form to get started on your journey.</p>
                            </div>
                            <div className="p-8 bg-green-800 rounded-xl shadow-lg">
                                <h3 className="text-4xl font-bold mb-4">2</h3>
                                <h4 className="text-xl font-semibold mb-2">Choose a Kit</h4>
                                <p>Select the starter kit that best fits your goals—whether you want to farm, sell, or both!</p>
                            </div>
                            <div className="p-8 bg-green-800 rounded-xl shadow-lg">
                                <h3 className="text-4xl font-bold mb-4">3</h3>
                                <h4 className="text-xl font-semibold mb-2">Start Selling or Using</h4>
                                <p>Begin your agri-wellness adventure and start earning or improving your health.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Form Section */}
                <section id="join-form" className="py-20">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">Registration Form</h2>
                        </div>
                        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
                            <form id="registration-form" action="https://formspree.io/f/meozlopy" method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                    <input type="tel" id="contact" name="contact" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area / City</label>
                                    <input type="text" id="area" name="area" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="package" className="block text-sm font-medium text-gray-700">Package Option</label>
                                    <select id="package" name="package" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                        <option value="">Select a package</option>
                                        <option value="starter-agri">Starter Agri Kit</option>
                                        <option value="starter-well">Starter Wellness Kit</option>
                                        <option value="full-negosyo">Full Negosyo Kit</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
                                    <input type="text" id="referral" name="referral" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                                </div>
                                <div className="flex items-center space-x-4">
                                     <input type="checkbox" id="terms" name="terms" required className="rounded text-green-600 focus:ring-green-500" />
                                     <label htmlFor="terms" className="text-sm font-medium text-gray-700">I agree to the terms and conditions</label>
                                </div>
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300">Submit Application</button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* 5. Success Stories */}
                <section id="success" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">Success Stories</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex flex-col items-center text-center">
                                    <img src="https://placehold.co/128x128/e6f5e1/2d5b16?text=J.D." alt="Testimonial photo" className="rounded-full mb-4" />
                                    <p className="text-gray-600 italic mb-4">"From backyard garden to full-time income! Agri-Well changed my life and my family's health."</p>
                                    <p className="font-semibold text-green-700">- Jane D., Pampanga</p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex flex-col items-center text-center">
                                    <img src="https://placehold.co/128x128/e6f5e1/2d5b16?text=M.S." alt="Testimonial photo" className="rounded-full mb-4" />
                                    <p className="text-gray-600 italic mb-4">"I started with the wellness kit and now I'm sharing the benefits with my whole community."</p>
                                    <p className="font-semibold text-green-700">- Mark S., Metro Manila</p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex flex-col items-center text-center">
                                    <img src="https://placehold.co/128x128/e6f5e1/2d5b16?text=A.R." alt="Testimonial photo" className="rounded-full mb-4" />
                                    <p className="text-gray-600 italic mb-4">"The training and support are amazing. It's more than a business, it's a family."</p>
                                    <p className="font-semibold text-green-700">- Ana R., Batangas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Contact Page */}
                <section id="contact" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">Contact Us</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4 text-green-700">Get in Touch</h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.893 5.262A2 2 0 0012 14a2 2 0 001.107-.373L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        <a href="mailto:agriwell2025@gmail.com" className="hover:text-green-600 transition-colors duration-300">agriwell2025@gmail.com</a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.261 1.015a5.426 5.426 0 005.105 5.105l1.015-2.261a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        <a href="tel:+639953527248" className="hover:text-green-600 transition-colors duration-300">+63 995 352 7248 </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M12 2C6.477 2 2 6.477 2 12c0 3.931 2.213 7.373 5.426 9.174l-.994 2.825a.5.5 0 0 0 .895.438l1.796-1.527c.48.08.97.12 1.477.12 5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14H8a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2zm3-4H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2zm0-4H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2z" />
                                        </svg>
                                        <a href="https://m.me/joemerpoliva" target="_blank" className="hover:text-green-600 transition-colors duration-300">Messenger</a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M12 2a10 10 0 0 0-9.78 12.35l-1.56 4.7a.5.5 0 0 0 .61.61l4.7-1.56A10 10 0 1 0 12 2zm3.33 12.25c-.27-.13-1.6-.79-1.85-.89-.25-.1-.43-.15-.61.15-.18.3-.7.89-.86 1.07-.15.18-.31.2-.57.08-.26-.13-1.1-1.22-2.1-2.03-.8-.66-1.34-1.18-1.5-1.46-.15-.27-.02-.42.13-.55.12-.11.26-.29.4-.43.14-.14.18-.24.27-.41.09-.18.05-.33-.02-.47-.07-.15-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47-.15-.01-.3-.02-.45-.02-.15 0-.4.05-.61.3-.21.25-.8 .79-.8 1.93s.82 2.24.93 2.4c.11.16 1.63 2.49 3.95 3.52 2.32 1.03 2.32.68 2.74.64.42-.04 1.2-.49 1.36-.96.15-.46.15-.86.11-.96-.04-.1-.15-.13-.3-.2z" />
                                        </svg>
                                        <a href="https://wa.me/639953527248" target="_blank" className="hover:text-green-600 transition-colors duration-300">WhatsApp</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d510562.4500820173!2d103.8442501!3d1.3140001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96dce7aa152db%3A0xf409f442aa9a620a!2s1NatureCorp%20Davao%20Branch!5e0!3m2!1sen!2ssg!4v1754108821452!5m2!1sen!2ssg" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. FAQs */}
                <section id="faqs" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 section-title mx-auto">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl shadow-lg faq-item" onClick={(e) => {
                                const item = e.currentTarget;
                                item.classList.toggle('open');
                                const icon = item.querySelector('.faq-icon');
                                if (item.classList.contains('open')) {
                                    icon.textContent = '–';
                                } else {
                                    icon.textContent = '+';
                                }
                            }}>
                                <h4 className="flex justify-between items-center text-lg font-semibold text-green-700">
                                    <span>Can I join without farming experience?</span>
                                    <span className="faq-icon text-xl">+</span>
                                </h4>
                                <div className="faq-answer mt-4 text-gray-600">
                                    <p>Yes, absolutely! We provide all the necessary training and support. Our kits are designed for beginners, and our community is here to help you every step of the way.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg faq-item" onClick={(e) => {
                                const item = e.currentTarget;
                                item.classList.toggle('open');
                                const icon = item.querySelector('.faq-icon');
                                if (item.classList.contains('open')) {
                                    icon.textContent = '–';
                                } else {
                                    icon.textContent = '+';
                                }
                            }}>
                                <h4 className="flex justify-between items-center text-lg font-semibold text-green-700">
                                    <span>What’s included in the wellness kits?</span>
                                    <span className="faq-icon text-xl">+</span>
                                </h4>
                                <div className="faq-answer mt-4 text-gray-600">
                                    <p>Our wellness kits are packed with essential oils, herbal teas, natural food supplements, and guidebooks on holistic healing practices. The contents may vary by package, but they are all curated for your well-being.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg faq-item" onClick={(e) => {
                                const item = e.currentTarget;
                                item.classList.toggle('open');
                                const icon = item.querySelector('.faq-icon');
                                if (item.classList.contains('open')) {
                                    icon.textContent = '–';
                                } else {
                                    icon.textContent = '+';
                                }
                            }}>
                                <h4 className="flex justify-between items-center text-lg font-semibold text-green-700">
                                    <span>Can I earn even as a part-timer?</span>
                                    <span className="faq-icon text-xl">+</span>
                                </h4>
                                <div className="faq-answer mt-4 text-gray-600">
                                    <p>Of course! The Agri-Well business model is flexible and perfect for part-timers. You can work at your own pace, set your own hours, and still achieve great success by using our comprehensive earning breakdown and marketing tools.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm">&copy; 2025 Agri-Well Negosyo. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
