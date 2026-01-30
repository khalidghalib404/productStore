import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { RefreshCw, PackageOpen } from 'lucide-react';
import ProductCard from '../components/ProductCards';
import LoadingAnimation from '../components/LoadingAnimation';
import AddProductModal from '../components/addProductMode';

function Homepage() {
  const {products,loading,error, fetchProducts} = useProductStore();
  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  console.log("products", products)





  return (
    <main className='container mx-auto px-4 py-8 max -w-6xl'>
      <div className='flex justify-between items-center  mb-8' >
        <AddProductModal />
        <button className='btn btn-ghost btn-circle' onClick={fetchProducts}>
          <RefreshCw className="size-5"/>
        </button>
      </div>
      {error && <div className='alert alert-error mb-8'>{error}</div>}
      {loading  ?(
        <LoadingAnimation />
      ) : products.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-96 gap-4'>
          <PackageOpen className='w-24 h-24 text-base-content/30' />
          <h2 className='text-3xl font-bold text-base-content/70'>No Products Available</h2>
          <p className='text-base-content/50 text-center max-w-md'>
            There are currently no products in the store. Click the "Add Product" button to create your first product.
          </p>
          <div className='mt-4'>
            <AddProductModal />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
        {products.map(product =>(
           <ProductCard key={product.id} product={product}/>
        ))}
        </div>
      )}
    
    </main>
  )
}

export default Homepage