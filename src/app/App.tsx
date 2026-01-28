import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import { AddToCartPage } from './components/AddToCartPage';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartOpen(true);
  };

  const handleConfirmAddToCart = (quantity: number) => {
    setCartCount(cartCount + quantity);
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
      price: "₵149.99",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-serif text-rose-900">Aurys roses</div>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="text-rose-900 hover:text-rose-600 transition-colors">Home</a>
              <a href="#flowers" className="text-rose-900 hover:text-rose-600 transition-colors">Flowers</a>
              <a href="#about" className="text-rose-900 hover:text-rose-600 transition-colors">About</a>
              <a href="#contact" className="text-rose-900 hover:text-rose-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-10 shadow-xl">
              <h1 className="font-serif mb-6">
                <span className="block text-rose-900 text-5xl md:text-7xl">Beautiful</span>
                <span className="block text-rose-600 text-5xl md:text-7xl">Blooms</span>
                <span className="block text-rose-800 text-4xl md:text-5xl mt-2">For Every Moment</span>
              </h1>
              <p className="text-rose-900/80 text-lg mb-8">
                Discover our exquisite collection of fresh roses and floral arrangements. 
                Each bouquet is carefully crafted to bring elegance and beauty to your special occasions.
              </p>
              <button className="backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white px-8 py-4 rounded-full transition-all hover:shadow-lg hover:scale-105">
                Explore Collection
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-4 shadow-2xl">
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
                className="group backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
                Every flower we select is handpicked for its freshness and beauty. Our expert florists 
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
                <p className="text-rose-800/80">Same-day delivery available</p>
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
                service. Fresh flowers delivered regularly.
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
              <form className="space-y-6">
                <div>
                  <label className="block text-rose-900 mb-2">Name</label>
                  <input 
                    type="text"
                    placeholder="Your name"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Email</label>
                  <input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Phone</label>
                  <input 
                    type="tel"
                    placeholder="+233 000 123456"
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50"
                  />
                </div>

                <div>
                  <label className="block text-rose-900 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us about your floral needs..."
                    className="w-full backdrop-blur-md bg-white/50 border border-white/40 rounded-xl px-4 py-3 text-rose-900 placeholder:text-rose-900/40 focus:outline-none focus:ring-2 focus:ring-rose-600/50 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white py-4 rounded-full transition-all hover:shadow-lg"
                >
                  Send Message
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

      {/* Add to Cart Modal */}
      <AddToCartPage
        product={selectedProduct}
        isOpen={isAddToCartOpen}
        onClose={() => setIsAddToCartOpen(false)}
        onAddToCart={handleConfirmAddToCart}
      />
    </div>
  );
}