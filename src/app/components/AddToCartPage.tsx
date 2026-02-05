import { X, Plus, Minus, Heart } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface AddToCartPageProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export function AddToCartPage({ product, isOpen, onClose, onAddToCart }: AddToCartPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  // Parse price to remove currency symbol for calculation
  const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, ''));
  const totalPrice = (priceNumber * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/30 transition-opacity"
        onClick={onClose}
        style={{ pointerEvents: 'auto' }}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-lg bg-white/95 border border-white/40 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-lg bg-white/90 border-b border-white/30 p-6 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-rose-900">Add to Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-rose-900" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex flex-col gap-4">
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="w-full backdrop-blur-md bg-white/40 border border-white/30 hover:border-rose-400 rounded-xl py-3 flex items-center justify-center gap-2 transition-all group"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFavorited
                      ? 'fill-rose-600 text-rose-600'
                      : 'text-rose-900 group-hover:text-rose-600'
                  }`}
                />
                <span className="text-rose-900 font-medium">
                  {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
                </span>
              </button>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-4xl text-rose-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-rose-800/80 text-lg">{product.description}</p>
                </div>

                {/* Price Section */}
                <div className="backdrop-blur-md bg-gradient-to-br from-rose-100/40 to-pink-100/40 border border-white/30 rounded-2xl p-6">
                  <div className="mb-4">
                    <p className="text-rose-900/60 text-sm uppercase tracking-wide mb-2">
                      Unit Price
                    </p>
                    <p className="font-serif text-3xl text-rose-900">
                      {product.price}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/30">
                    <p className="text-rose-900/60 text-sm uppercase tracking-wide mb-2">
                      Total Price
                    </p>
                    <p className="font-serif text-4xl text-rose-600">
                      ₵{totalPrice}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-rose-900 font-medium block">Quantity</label>
                  <div className="flex items-center gap-4 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-2 w-fit">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5 text-rose-900" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center bg-transparent text-rose-900 font-serif text-lg focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 text-rose-900" />
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-rose-900 font-medium text-sm uppercase tracking-wide">
                    Why Choose This Bouquet?
                  </p>
                  <ul className="space-y-2 text-rose-800/80 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-rose-600">✓</span> Fresh flowers delivered daily
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-rose-600">✓</span> Premium quality assurance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-rose-600">✓</span> Same-day delivery available
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-rose-600">✓</span> Complimentary greeting card
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-8">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                    addedToCart
                      ? 'backdrop-blur-md bg-green-500/90 text-white'
                      : 'backdrop-blur-md bg-rose-600/90 hover:bg-rose-700 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={onClose}
                  className="w-full backdrop-blur-md bg-white/40 border border-white/30 hover:border-rose-400 text-rose-900 py-4 rounded-full font-semibold transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
