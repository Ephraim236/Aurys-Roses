import { Phone, Mail, MapPin, Instagram, Facebook, X } from 'lucide-react';

interface CollectionPageProps {
  onBack: () => void;
  flowerProducts: Array<{
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
  }>;
  onAddToCart: (product: any) => void;
}

export const CollectionPage = ({ onBack, flowerProducts, onAddToCart }: CollectionPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/30 border-b border-white/20 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl text-rose-900 text-center">Our Collection</h1>
          <div className="mt-3 flex justify-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-rose-600/95 hover:bg-rose-700 text-white px-5 py-2 rounded-full transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Collection Hero */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 inline-block shadow-xl">
            <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4">Exquisite Floral Arrangements</h2>
            <p className="text-rose-800/80 text-lg">Handcrafted with love for every special occasion</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flowerProducts.map((product) => (
              <div
                key={product.id}
                className="group backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-rose-600/90 text-white px-4 py-2 rounded-full">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-rose-900 mb-2">{product.name}</h3>
                  <p className="text-rose-800/80 mb-6">{product.description}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white py-3 rounded-full transition-all font-medium"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 text-rose-900 py-3 rounded-full transition-all font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🌹</span>
              </div>
              <h3 className="font-serif text-xl text-rose-900 mb-2">Premium Quality</h3>
              <p className="text-rose-800/80">Only the finest fresh flowers, hand-selected daily</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-serif text-xl text-rose-900 mb-2">Custom Designs</h3>
              <p className="text-rose-800/80">Personalized arrangements for your unique vision</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 backdrop-blur-md bg-rose-600/90 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl text-rose-900 mb-2">Fast Delivery</h3>
              <p className="text-rose-800/80">Same-day delivery available in most areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-12 shadow-xl">
            <h2 className="font-serif text-3xl text-rose-900 mb-4">Need a Custom Arrangement?</h2>
            <p className="text-rose-800/80 mb-8">Contact us for special requests and bulk orders</p>
            <a
              href="#contact"
              className="inline-block backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white px-8 py-4 rounded-full transition-all hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
