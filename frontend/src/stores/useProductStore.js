import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
const  BASE_URL = 'http://localhost:3001';

export const  useProductStore = create((set,get) => ({
    //product state
    products: [],
    loading: false,
    error:null,

    formData:{
        name:'',
        price:'',
        image:'',
        
    },

    setFormData: (formData) => set({formData}),
    resetFormData: () => set({formData:{name:'',price:'',image:''}}),

    addProduct : async (e) => {
    if (e) e.preventDefault();
    set({loading:true,error:null});
    try {
        const {formData} = get();
        console.log('Sending product data:', formData);
        const response = await axios.post(`${BASE_URL}/api/products`, formData);
        console.log('Product added response:', response.data);
        await get().fetchProducts();
        get().resetFormData();
        toast.success('Product added successfully!');
        return true; // Return success
    } catch (error) {
        console.log('Error adding product:', error);
        console.log('Error response:', error.response?.data);
        const errorMessage = error.response?.data?.message || 'Failed to add product';
        toast.error(errorMessage);
        return false; // Return failure
    } finally {
        set({loading: false});
    }
    },

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
    
    fetchProductById: async (id) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            return response.data.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch product';
            set({error: errorMessage});
            toast.error(errorMessage);
            return null;
        } finally {
            set({loading: false});
        }
    },
    
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