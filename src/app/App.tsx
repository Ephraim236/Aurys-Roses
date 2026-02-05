import { Phone, Mail, MapPin, Instagram, Facebook, LogOut } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { AddToCartPage } from './components/AddToCartPage';
import { CartOverview } from './components/CartOverview';
import { NewsletterSignup } from './components/newsletter';
import { CollectionPage } from './components/CollectionPage';
import { LoginSignup } from './components/LoginSignup';
import { Toast } from './components/Toast';
import { useAnimateOnInView } from '../hooks/useAnimateOnInView';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface User {
  id: string;
  email: string;
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'error' | 'warning' } | null>(null);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const showToast = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setToast({ message, type });
  };

  // User session is kept in memory only; refresh will clear it
  useEffect(() => {
    // No localStorage loading - user must login after each refresh
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    // User session is stored in memory only, not persisted to localStorage
    // This ensures refresh will clear the session and require login again
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    setIsCartOpen(false);
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      showToast('Sign in required to add items to cart', 'warning');
      setIsLoginOpen(true);
      return;
    }

    setSelectedProduct(product);
    setIsAddToCartOpen(true);
  };

  const handleConfirmAddToCart = (quantity: number) => {
    if (!user) {
      showToast('Sign in required to add items to cart', 'warning');
      setIsLoginOpen(true);
      return;
    }

    if (!selectedProduct) return;
    setCartItems((prev) => {
      const found = prev.find((i) => i.product.id === selectedProduct.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === selectedProduct.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product: selectedProduct, quantity }];
    });
    setCartCount((c) => c + quantity);
  };

  const handleRemoveFromCart = (productId: number) => {
    const foundQty = cartItems.find((it) => it.product.id === productId)?.quantity || 0;
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    setCartCount((c) => Math.max(0, c - foundQty));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)));
    const total = cartItems.reduce((s, it) => s + it.quantity, 0);
    setCartCount(total);
  };

  const handleCheckout = () => {
    if (!user) {
      showToast('Sign in required to checkout', 'warning');
      setIsLoginOpen(true);
      return;
    }

    setCartItems([]);
    setCartCount(0);
    setIsCartOpen(false);
    alert('Checkout not implemented — cart cleared for demo.');
  };

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactSuccess(null);

    if (!contactEmail || !contactMessage) {
      setContactError('Please provide your email and a message.');
      return;
    }

    setContactLoading(true);

    try {
      const res = await fetch('http://localhost:4001/api/contact',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setContactError(data?.error || 'Failed to send message.');
        setContactLoading(false);
        return;
      }

      setContactSuccess('Message sent — we will get back to you shortly.');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch (err) {
      console.error(err);
      setContactError('An error occurred while sending your message.');
    } finally {
      setContactLoading(false);
    }
  };

  const flowerProducts: Product[] = [
    {
      price: "₵59.99",
      id: 1,
      name: "Classic Pink Roses",
      image: "https://images.unsplash.com/photo-1672243691196-9b7f64cce1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0fGVufDF8fHx8MTc2OTMxNzc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "12 Premium pink roses"
    },
    {
      id: 2,
      name: "Elegant White Roses",
      price: "₵69.99",
      image: "https://images.unsplash.com/photo-1700610975006-843812255ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjkzNTA2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "15 Pure white roses"
    },
    {
      id: 3,
      name: "Luxurious Red Roses",
      price: "₵79.99",
      image: "https://images.unsplash.com/photo-1693842895970-1ddaaa60f254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlcyUyMGx1eHVyeXxlbnwxfHx8fDE3NjkzNTA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "24 Stunning red roses"
    },
    {
      id: 4,
      name: "Wedding Arrangement",
      price:"₵149.99",
      image: "https://images.unsplash.com/photo-1719499809556-070ec0dfda8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBhcnJhbmdlbWVudCUyMHdlZGRpbmd8ZW58MXx8fHwxNzY5MzUwNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Custom wedding bouquet"
    },
    {
      id: 5,
      name: "Garden Mix",
      price: "₵89.99",
      image: "https://images.unsplash.com/photo-1554360138-b6ce15315a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwZ2FyZGVuJTIwcm9tYW50aWN8ZW58MXx8fHwxNzY5MzUwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mixed garden roses"
    },
    {
      id: 6,
      name: "Soft Bouquet",
       price: "₵9.99",
      image: "https://images.unsplash.com/photo-1704177094380-ab854ad5a93b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBib3VxdWV0JTIwc29mdHxlbnwxfHx8fDE3NjkzNTA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Delicate floral mix"
    }
  ];

  // Hook attaches observers to elements matched by selector
  useAnimateOnInView('.will-fade-up, .will-image-zoom');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-serif text-rose-900">Aurys roses</div>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#home" className="text-rose-900 hover:text-rose-600 transition-colors">Home</a>
              <a href="#flowers" className="text-rose-900 hover:text-rose-600 transition-colors">Flowers</a>
              <a href="#about" className="text-rose-900 hover:text-rose-600 transition-colors">About</a>
              <a href="#contact" className="text-rose-900 hover:text-rose-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-white/40 hover:bg-white/50 px-4 py-2 rounded-full flex items-center gap-2 border border-white/20"
                >
                  🛒
                  <span className="font-medium text-rose-900">Cart</span>
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-white bg-rose-600 rounded-full">
                    {cartItems.reduce((s, it) => s + it.quantity, 0)}
                  </span>
                </button>
              )}

              {/* Auth buttons */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-2 border-white/40 hover:border-rose-300 transition-all cursor-pointer"
                    title={user.email}
                  >
                    <span className="text-white font-semibold text-sm uppercase">
                      {user.email.charAt(0)}
                    </span>
                  </button>
                  {isAvatarMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-white/20">
                        <p className="text-xs text-rose-900/60 uppercase tracking-wide">Signed in as</p>
                        <p className="text-sm font-medium text-rose-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsAvatarMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-rose-900 hover:bg-rose-50/50 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} className="text-rose-600" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-6 py-2 rounded-full font-medium transition-all"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {isCollectionOpen ? (
        <CollectionPage 
          onBack={() => setIsCollectionOpen(false)}
          flowerProducts={flowerProducts}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-10 shadow-xl animate-pop-in">
              <h1 className="font-serif mb-6">
                <span className="block text-rose-900 text-5xl md:text-7xl">Beautiful</span>
                <span className="block text-rose-600 text-5xl md:text-7xl">Blooms</span>
                <span className="block text-rose-800 text-4xl md:text-5xl mt-2">For Every Moment</span>
              </h1>
              <p className="text-rose-900/80 text-lg mb-8">
                Discover our exclusive collection of handmade floral arrangements. Crafted by hand with precision and artistry, each piece is designed to offer lasting beauty and elevate every special occasion.
              </p>
            </div>
              <button 
                className="backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white px-8 py-4 rounded-full transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setIsCollectionOpen(true)}
              >
                Explore Collection
              </button>
          </div>
          
          <div className="relative">
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-4 shadow-2xl animate-image-zoom">
              <img 
                src="https://images.unsplash.com/photo-1672243691196-9b7f64cce1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0fGVufDF8fHx8MTc2OTMxNzc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Pink roses bouquet"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-rose-600/90 text-white px-6 py-3 rounded-full shadow-lg">
              <p className="font-serif text-lg">Premium Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flower Showcase */}
      <section id="flowers" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 inline-block shadow-xl">
              <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4">Our Collection</h2>
              <p className="text-rose-800/80 text-lg">Handpicked arrangements for every occasion</p>
            </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flowerProducts.map((product) => (
              <div 
                key={product.id}
                className="group backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pop-in"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-rose-600/90 text-white px-4 py-2 rounded-full">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-rose-900 mb-2">{product.name}</h3>
                  <p className="text-rose-800/80 mb-4">{product.description}</p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white py-3 rounded-full transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-10 shadow-xl">
              <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-6">About Aurys roses</h2>
              <p className="text-rose-900/80 text-lg mb-4">
                Founded with a passion for creating unforgettable moments, Aurys roses has been bringing 
                joy and beauty to our community for over a decade.
              </p>
              <p className="text-rose-900/80 text-lg mb-4">
                Every flower you select is handmade for its elegance  and beauty. Our expert florists 
                craft each arrangement with meticulous attention to detail, ensuring that every bouquet 
                tells a unique story.
              </p>
              <p className="text-rose-900/80 text-lg">
                From intimate celebrations to grand events, we're here to make your special moments 
                bloom with elegance and grace.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🌹</div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Fresh Daily</h3>
                <p className="text-rose-800/80">New blooms delivered every morning</p>
              </div>
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Premium Quality</h3>
                <p className="text-rose-800/80">Only the finest roses selected</p>
              </div>
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Custom Design</h3>
                <p className="text-rose-800/80">Personalized arrangements</p>
              </div>
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Fast Delivery</h3>
                <p className="text-rose-800/80">We deliver products to customers immediately we are done crafting in a reasonable time frame</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 inline-block shadow-xl">
              <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4">Our Services</h2>
              <p className="text-rose-800/80 text-lg">Tailored floral solutions for every occasion</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/35 border border-white/25 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💐</span>
              </div>
              <h3 className="font-serif text-2xl text-rose-900 mb-4">Weddings</h3>
              <p className="text-rose-800/80 mb-4">
                Make your special day unforgettable with our exquisite wedding floral designs. 
                From bridal bouquets to venue decorations.
              </p>
              <ul className="space-y-2 text-rose-800/80">
                <li>• Bridal bouquets</li>
                <li>• Centerpieces</li>
                <li>• Ceremony arrangements</li>
                <li>• Boutonnieres</li>
              </ul>
            </div>

            <div className="backdrop-blur-md bg-white/35 border border-white/25 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="font-serif text-2xl text-rose-900 mb-4">Events</h3>
              <p className="text-rose-800/80 mb-4">
                Elevate any celebration with our stunning event florals. Perfect for corporate 
                events, parties, and special occasions.
              </p>
              <ul className="space-y-2 text-rose-800/80">
                <li>• Corporate events</li>
                <li>• Birthday parties</li>
                <li>• Anniversaries</li>
                <li>• Grand openings</li>
              </ul>
            </div>

            <div className="backdrop-blur-md bg-white/35 border border-white/25 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="font-serif text-2xl text-rose-900 mb-4">Subscriptions</h3>
              <p className="text-rose-800/80 mb-4">
                Keep your home or office blooming with our weekly or monthly subscription 
                service. 
              </p>
              <ul className="space-y-2 text-rose-800/80">
                <li>• Weekly delivery</li>
                <li>• Monthly plans</li>
                <li>• Custom preferences</li>
                <li>• Flexible scheduling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 inline-block shadow-xl">
              <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4">Get In Touch</h2>
              <p className="text-rose-800/80 text-lg">We'd love to hear from you</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-8 shadow-xl">
                <h3 className="font-serif text-2xl text-rose-900 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-rose-900/60">Phone</p>
                      <p className="text-rose-900 text-lg">+233 5402 91214</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-rose-900/60">Email</p>
                      <p className="text-rose-900 text-lg">hello@aurysroses.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-rose-900/60">Location</p>
                      <p className="text-rose-900 text-lg">New Legon, Adentan</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-rose-900/20">
                  <h4 className="font-serif text-xl text-rose-900 mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 rounded-full flex items-center justify-center transition-all">
                      <Instagram className="w-6 h-6 text-white" />
                    </button>
                    <button className="w-12 h-12 backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 rounded-full flex items-center justify-center transition-all">
                      <Facebook className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-8 shadow-xl">
                <h3 className="font-serif text-2xl text-rose-900 mb-4">Opening Hours</h3>
                <div className="space-y-2 text-rose-900/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-8 shadow-xl">
              <h3 className="font-serif text-2xl text-rose-900 mb-6">Send us a Message</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-rose-900 mb-2">Name</label>
                  <input 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    type="text"
                    placeholder="Your name"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Email</label>
                  <input 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Phone</label>
                  <input 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    type="tel"
                    placeholder="+233 000 123456"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Message</label>
                  <textarea 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us about your floral needs..."
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50 resize-none"
                  ></textarea>
                </div>

                {contactSuccess && (
                  <p className="text-sm text-green-700 bg-green-100/60 rounded-md p-3">{contactSuccess}</p>
                )}

                {contactError && (
                  <p className="text-sm text-red-700 bg-red-100/60 rounded-md p-3">{contactError}</p>
                )}

                <button 
                  type="submit"
                  disabled={contactLoading}
                  className={`w-full backdrop-blur-md ${contactLoading ? 'bg-rose-400/80' : 'bg-rose-600/90 hover:bg-rose-700'} text-white py-4 rounded-full transition-all hover:shadow-lg disabled:opacity-60`}
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/30 border-t border-white/20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="font-serif text-2xl text-rose-900 mb-4">Aurys roses</div>
          <p className="text-rose-800/80 mb-4">Making moments bloom since 2026</p>
          <p className="text-rose-900/60 text-sm">© 2026 Aurys roses. All rights reserved.</p>
        </div>
      </footer>

        </>
        )}

      {/* Add to Cart Modal */}
      <AddToCartPage
        product={selectedProduct}
        isOpen={isAddToCartOpen}
        onClose={() => setIsAddToCartOpen(false)}
        onAddToCart={handleConfirmAddToCart}
      />
      <CartOverview
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      <LoginSignup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}