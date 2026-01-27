import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { PlusCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCards';

function Homepage() {
  const {products,loading,error, fetchProducts} = useProductStore();
  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  console.log("products", products)





  return (
    <main className='container mx-auto px-4 py-8 max -w-6xl'>
      <div className='flex justify-between items-center  mb-8' > 
        <button className='btn btn-primary'>
          <PlusCircle className="size-5 mr-2"/>
          Add Product
        </button>
        <button className='btn btn-ghost btn-circle' onClick={fetchProducts}>
          <RefreshCw className="size-5"/>
        </button>
      </div>
      {error && <div className='alert alert-error mb-8'>{error}</div>}
      {loading  ?(
        <div className='flex justify-center items-center h-96'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) :(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
        {products.map(product =>(
           <ProductCard key={product.id} product={product}/>
        ))}
        </div>
      ) }
    
    </main>
  )
}

export default Homepage