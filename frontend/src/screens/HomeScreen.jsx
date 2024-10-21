import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="py-8">
      {/* Marquee Section */}
      <div className="py-4 overflow-hidden">
        <div className="marquee">
          <p className="text-lg font-bold text-center">
            🚀 Special Offers on Electronics! 💻 Free Shipping on Orders Over $50! 🎉 Shop Now and Save Big!
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
