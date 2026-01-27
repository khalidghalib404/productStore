import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
const  BASE_URL = 'http://localhost:3001';

export const  useProductStore = create((set,get) => ({
    //product state
    products: [],
    loading: false,
    error:null,
    fetchProducts: async () => {
        set({loading:true,error:null});
        try{
          const response =  await axios.get(`${BASE_URL}/api/products`)
            set({products:response.data.data,error:null});    
            
        }catch(error){
            if(error.status === 429);
            set({error:'Too many requests. Please try again later.'});
        }
        finally{
            set({loading:false});
        }
    },
    setProducts: (products) => set({products}),
    
    deleteProduct: async (id) => {
        set({loading: true, error: null});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((state) => ({
                products: state.products.filter(product => product.id !== id),
                error: null
            }));
            toast.success('Product deleted successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete product';
            set({error: errorMessage});
            toast.error(errorMessage);
        } finally {
            set({loading: false});
        }
    },
}));