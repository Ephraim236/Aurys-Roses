import { X, Plus, Minus, Trash } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartOverviewProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
}

export const CartOverview = ({ items, isOpen, onClose, onRemove, onUpdateQuantity, onCheckout }: CartOverviewProps) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, it) => {
    const n = parseFloat(it.product.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + n * it.quantity;
  }, 0).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-rose-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-rose-50">
            <X className="w-5 h-5 text-rose-900" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center text-rose-800">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 border rounded-lg p-3">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-rose-900">{product.name}</h3>
                    <div className="text-rose-900 font-semibold">{product.price}</div>
                  </div>
                  <p className="text-sm text-rose-800/80">{product.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))} className="p-2 rounded-md hover:bg-rose-50">
                      <Minus className="w-4 h-4 text-rose-900" />
                    </button>
                    <div className="px-3 py-1 border rounded-md">{quantity}</div>
                    <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="p-2 rounded-md hover:bg-rose-50">
                      <Plus className="w-4 h-4 text-rose-900" />
                    </button>
                  </div>
                  <button onClick={() => onRemove(product.id)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                    <Trash className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t flex items-center justify-between">
              <div className="text-lg font-medium text-rose-900">Total</div>
              <div className="font-serif text-2xl text-rose-600">₵{totalAmount}</div>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={onCheckout} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-full">
                Checkout
              </button>
              <button onClick={onClose} className="flex-1 bg-white border border-rose-200 text-rose-900 py-3 rounded-full">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
