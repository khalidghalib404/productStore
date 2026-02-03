import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { RefreshCw, PackageOpen, Store, Sparkles, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCards';
import LoadingAnimation from '../components/LoadingAnimation';
import AddProductModal from '../components/addProductMode';

function Homepage() {
  const {products,loading,error, fetchProducts} = useProductStore();
  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  return (
    <main className='min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200'>
      {/* Hero Section */}
      <div className='hero-gradient py-16 px-4'>
        <div className='container mx-auto max-w-7xl'>
          <div className='text-center animate-fadeIn'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <Sparkles className='w-12 h-12 text-accent animate-pulse' />
              <h1 className='text-6xl font-bold text-white drop-shadow-lg'>
                Welcome to <span className='text-accent'>bekhar</span>
              </h1>
              <Sparkles className='w-12 h-12 text-accent animate-pulse' />
            </div>
            <p className='text-white/90 text-xl max-w-3xl mx-auto leading-relaxed'>
              Discover premium products at unbeatable prices. Quality, style, and value in every purchase.
            </p>
            <div className='flex items-center justify-center gap-6 mt-6'>
              <div className='badge badge-lg badge-accent gap-2 shadow-lg'>
                <TrendingUp className='w-4 h-4' />
                Trending Now
              </div>
              <div className='badge badge-lg badge-success gap-2 shadow-lg'>
                <Store className='w-4 h-4' />
                {products.length}+ Products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 max-w-7xl'>
        {/* Action Bar */}
        <div className='flex justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-xl animate-slideIn'>
          <div className='flex items-center gap-4'>
            <AddProductModal />
            <div className='divider divider-horizontal'></div>
            <div className='flex flex-col'>
              <span className='text-2xl font-bold text-primary'>{products.length}</span>
              <span className='text-sm text-base-content/70'>Products Available</span>
            </div>
          </div>
          <button 
            className='btn btn-circle btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 tooltip tooltip-left' 
            onClick={fetchProducts}
            data-tip="Refresh products"
          >
            <RefreshCw className="w-6 h-6"/>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className='alert alert-error shadow-lg mb-8 animate-scaleIn'>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingAnimation />
        ) : products.length === 0 ? (
          /* Empty State */
          <div className='flex flex-col items-center justify-center min-h-[400px] gap-6 animate-fadeIn'>
            <div className='relative'>
              <PackageOpen className='w-32 h-32 text-primary/30' />
              <div className='absolute -top-2 -right-2'>
                <Sparkles className='w-8 h-8 text-accent animate-pulse' />
              </div>
            </div>
            <div className='text-center max-w-md'>
              <h2 className='text-4xl font-bold text-base-content mb-3'>No Products Yet</h2>
              <p className='text-base-content/70 text-lg mb-6'>
                Start building your store by adding your first product. It only takes a moment!
              </p>
              <AddProductModal />
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <h2 className='text-3xl font-bold text-base-content'>Featured Products</h2>
              <div className='badge badge-primary badge-lg'>New</div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className='animate-fadeIn'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      {products.length > 0 && (
        <div className='bg-base-300 py-16 mt-12'>
          <div className='container mx-auto px-4 max-w-7xl'>
            <h2 className='text-3xl font-bold text-center mb-12'>Why Shop With Us?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300'>
                <div className='card-body items-center text-center'>
                  <div className='w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4'>
                    <Store className='w-8 h-8 text-primary' />
                  </div>
                  <h3 className='card-title'>Quality Products</h3>
                  <p className='text-base-content/70'>Carefully curated selection of premium items</p>
                </div>
              </div>
              <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300'>
                <div className='card-body items-center text-center'>
                  <div className='w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4'>
                    <TrendingUp className='w-8 h-8 text-success' />
                  </div>
                  <h3 className='card-title'>Best Prices</h3>
                  <p className='text-base-content/70'>Competitive pricing on all products</p>
                </div>
              </div>
              <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300'>
                <div className='card-body items-center text-center'>
                  <div className='w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4'>
                    <Sparkles className='w-8 h-8 text-accent' />
                  </div>
                  <h3 className='card-title'>Fast Delivery</h3>
                  <p className='text-base-content/70'>Quick and reliable shipping worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Homepage
