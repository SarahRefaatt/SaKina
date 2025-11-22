// "use client"

// import { useState } from 'react'

// export default function ProductDetails() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock_quantity: '',
//     sku: '',
//     category: '',
//     brand: '',
//     weight: '',
//     dimensions: '',
//     image_urls: '',
//     promo_codes: ''
//   })
  
//   const [errors, setErrors] = useState<any>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitMessage, setSubmitMessage] = useState('')

//   const handleChange = (e:any) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value
//     })
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       })
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}
    
//     // if (!formData.name.trim()) newErrors. = 'Product name is required'
//     // if (!formData.description.trim()) newErrors.description = 'Description is required'
//     // if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) 
//     //   newErrors.price = 'Valid price is required'
//     // if (!formData.stock_quantity || isNaN(formData.stock_quantity) || parseInt(formData.stock_quantity) < 0) 
//     //   newErrors.stock_quantity = 'Valid stock quantity is required'
//     // if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
//     // if (!formData.category.trim()) newErrors.category = 'Category is required'
//     // if (!formData.brand.trim()) newErrors.brand = 'Brand is required'
//     // if (!formData.weight || isNaN(formData.weight) || parseFloat(formData.weight) <= 0) 
//     //   newErrors.weight = 'Valid weight is required'
//     // if (!formData.dimensions.trim()) newErrors.dimensions = 'Dimensions are required'
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e:any) => {
//     e.preventDefault()
    
//     if (!validateForm()) return
    
//     setIsSubmitting(true)
//     setSubmitMessage('')
    
//     try {
//       const productData = {
//         ...formData,
//         price: parseFloat(formData.price),
//         stock_quantity: parseInt(formData.stock_quantity),
//         weight: parseFloat(formData.weight),
//         image_urls: formData.image_urls ? formData.image_urls.split(',').map(url => url.trim()) : null,
//         promo_codes: formData.promo_codes ? formData.promo_codes.split(',').map(code => code.trim()) : null
//       }
      
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       })
      
//       if (response.ok) {
//         setSubmitMessage('Product added successfully!')
//         // Reset form
//         setFormData({
//           name: '',
//           description: '',
//           price: '',
//           stock_quantity: '',
//           sku: '',
//           category: '',
//           brand: '',
//           weight: '',
//           dimensions: '',
//           image_urls: '',
//           promo_codes: ''
//         })
//       } else {
//         const errorData = await response.json()
//         setSubmitMessage(`Error: ${errorData.message || 'Failed to add product'}`)
//       }
//     } catch (error) {
//       setSubmitMessage('Error: Failed to connect to server')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Product</h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">Fill in the details below to add a new product to your inventory.</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
//             {submitMessage && (
//               <div className={`mb-4 p-3 rounded-md ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//                 {submitMessage}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
//               </div>

//               <div className="sm:col-span-2">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   id="description"
//                   rows={3}
//                   value={formData.description}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
//               </div>

//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   id="price"
//                   step="0.01"
//                   min="0"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
//               </div>

//               <div>
//                 <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
//                 <input
//                   type="number"
//                   name="stock_quantity"
//                   id="stock_quantity"
//                   min="0"
//                   value={formData.stock_quantity}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.stock_quantity ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{errors.stock_quantity}</p>}
//               </div>

//               <div>
//                 <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
//                 <input
//                   type="text"
//                   name="sku"
//                   id="sku"
//                   value={formData.sku}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.sku ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
//               </div>

//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   id="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.category ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
//               </div>

//               <div>
//                 <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
//                 <input
//                   type="text"
//                   name="brand"
//                   id="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.brand ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
//               </div>

//               <div>
//                 <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   id="weight"
//                   step="0.01"
//                   min="0"
//                   value={formData.weight}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.weight ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
//               </div>

//               <div>
//                 <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions (LxWxH)</label>
//                 <input
//                   type="text"
//                   name="dimensions"
//                   id="dimensions"
//                   placeholder="e.g., 20x15x10 cm"
//                   value={formData.dimensions}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-md border p-2 ${errors.dimensions ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
//                 />
//                 {errors.dimensions && <p className="mt-1 text-sm text-red-600">{errors.dimensions}</p>}
//               </div>

//               <div className="sm:col-span-2">
//                 <label htmlFor="image_urls" className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
//                 <input
//                   type="text"
//                   name="image_urls"
//                   id="image_urls"
//                   value={formData.image_urls}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label htmlFor="promo_codes" className="block text-sm font-medium text-gray-700">Promo Codes (comma separated)</label>
//                 <input
//                   type="text"
//                   name="promo_codes"
//                   id="promo_codes"
//                   value={formData.promo_codes}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Adding Product...' : 'Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
// import { error } from "console";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  sku: string;
  category: string;
  brand: string;
  weight: number;
  dimensions: string;
  image_urls: string[]; // ✅ Change this from string | null to string[]
  promo_codes: string | null;
  created_at: string;
  updated_at: string;
};

type ProductFormMode = "create" | "edit" | "delete";

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<ProductFormMode>("create");
  const [isLoading, setIsLoading] = useState(true);
      const [isAdmin, setIsAdmin] = React.useState(false); // ✅ Track admin status
    // ✅ Fetch admin status
    React.useEffect(() => {
      async function checkAdmin() {
        try {
          const res = await fetch("/api/admin/status");
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch {
          setIsAdmin(false);
        }
      }
      checkAdmin();
    }, []);




  useEffect(() => {
    fetchProducts();
  }, []);





  console.log(products)

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would fetch from your API
      // const response = await fetch("/api/products");
      // const data = await response.json();
      
      // Mock data for demonstration
      const res=await fetch(`/api/products`)

      if(!res.ok){
        throw ("error fetching products")
      }
      const data=await res.json();
   
      
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setIsLoading(false);
    }
  };

  const handleSelectProduct = (product: Product, mode: ProductFormMode) => {
    setSelectedProduct(product);
    setMode(mode);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setMode("create");
  };
    if(!isAdmin){
    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Only visible to authenticated admins.</p>
    </div>
  );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:space-x-8">
          {/* Product List Section */}
          <div className="md:w-2/5 mb-8 md:mb-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add New Product
              </button>
            </div>
            
            {isLoading ? (
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">No products found. Create your first product!</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                          <p className="text-sm text-gray-500">Category: {product.category}</p>
                          <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSelectProduct(product, "edit")}
                            className="text-yellow-500 hover:text-yelow-900 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSelectProduct(product, "delete")}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Product Form Section */}
          <div className="md:w-3/5">
            <ProductForm 
              mode={mode} 
              initialData={selectedProduct} 
              onSuccess={fetchProducts}
              onCancel={() => setMode("create")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductFormProps {
  mode: ProductFormMode;
  initialData?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

function ProductForm({ mode, initialData, onSuccess, onCancel }: ProductFormProps) {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   stock_quantity: "",
  //   sku: "",
  //   category: "",
  //   brand: "",
  //   weight: "",
  //   dimensions: "",
  //   image_urls: "",
  //   promo_codes: "",
  // });
  const [formData, setFormData] = useState<{
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  sku: string;
  category: string;
  brand: string;
  weight: string;
  dimensions: string;
  image_urls: string[]; // ✅ Change this from string | null to string[]
  promo_codes: string;
  files?: File[];
}>({
  name: "",
  description: "",
  price: "",
  stock_quantity: "",
  sku: "",
  category: "",
  brand: "",
  weight: "",
  dimensions: "",
  image_urls: [],
  promo_codes: "",
  files: [],
});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price.toString() || "",
        stock_quantity: initialData.stock_quantity.toString() || "",
        // sku: initialData.sku || "",
          sku: generateSKU(),

        category: initialData.category || "",
        brand: initialData.brand || "",
        weight: initialData.weight.toString() || "",
        dimensions: initialData.dimensions || "",
        image_urls: initialData.image_urls || [],
        promo_codes: initialData.promo_codes || "",
      });
    } else {
      // Reset form when creating a new product
      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        sku: "",
        category: "",
        brand: "",
        weight: "",
        dimensions: "",
        image_urls: [],
        promo_codes: "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) 
      newErrors.price = 'Valid price is required';
    if (!formData.stock_quantity || isNaN(Number(formData.stock_quantity)) || Number(formData.stock_quantity) < 0) 
      newErrors.stock_quantity = 'Valid stock quantity is required';
    // if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    // if (!formData.category.trim()) newErrors.category = 'Category is required';
    // if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) 
      newErrors.weight = 'Valid weight is required';
    if (!formData.dimensions.trim()) newErrors.dimensions = 'Dimensions are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSKU = (): string => {
  const prefix = "SKU";
  const timestamp = Date.now().toString(36); // base-36 for compactness
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4 random chars
  return `${prefix}-${timestamp}-${randomStr}`;
};


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (mode !== "delete" && !validateForm()) return;
    
  //   setIsSubmitting(true);
  //   setSubmitMessage("");
    
  //   try {
  //     let url = `/api/products`;
  //     let method = "POST";
      
  //     if (mode === "edit" && initialData) {
  //       url = `/api/products?id=${initialData.id}`;
  //       method = "PUT";
  //     } else if (mode === "delete" && initialData) {
  //       url = `/api/products?id=${initialData.id}`;
  //       method = "DELETE";
  //     }
      
  //     let body;
  //     if (mode !== "delete") {
  //       body = JSON.stringify({
  //         ...formData,
  //         price: parseFloat(formData.price),
  //         stock_quantity: parseInt(formData.stock_quantity),
  //         weight: parseFloat(formData.weight),
  //         image_urls: formData.image_urls ? formData.image_urls.split(',').map(url => url.trim()) : null,
  //         promo_codes: formData.promo_codes ? formData.promo_codes.split(',').map(code => code.trim()) : null
  //       });
  //     }
      
  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: method !== "DELETE" ? body : undefined,
  //     }
  //   );

  //   console.log(response,"data: ",body,"method: ",method,"url: ",url)
      
  //     if (response.ok) {
  //       setSubmitMessage(
  //         mode === "delete" 
  //           ? "Product deleted successfully" 
  //           : `Product ${mode === "edit" ? "updated" : "added"} successfully`
  //       );
        
  //       // Reset form after successful submission
  //       if (mode === "create" || mode === "delete") {
  //         setFormData({
  //           name: "",
  //           description: "",
  //           price: "",
  //           stock_quantity: "",
  //           sku: "",
  //           category: "",
  //           brand: "",
  //           weight: "",
  //           dimensions: "",
  //           image_urls: "",
  //           promo_codes: "",
  //         });
  //       }
        
  //       // Notify parent component to refresh product list
  //       onSuccess();
  //     } else {
  //       const errorData = await response.json();
  //       console.log(errorData)
  //       setSubmitMessage(`Error: ${errorData.message || 'Failed to process request'}`);
  //     }
  //   } catch (error) {
  //     setSubmitMessage('Error: Failed to connect to server');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (mode !== "delete" && !validateForm()) return;

  setIsSubmitting(true);
  setSubmitMessage("");

  try {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "files" && value) {
        (value as File[]).forEach((file) => {
          formDataObj.append("files", file);
        });
      } else {
        formDataObj.append(key, value as string);
      }
    });

    // const url = mode === "edit" && initialData
    //   ? `/api/products?id=${initialData.id}`
    //   : "/api/products";
    const url = mode === "edit" && initialData
      ? `/api/products?id=${initialData.id}`
      : mode === "delete" && initialData
      ? `/api/products?id=${initialData.id}` // send ID in query for DELETE
      : "/api/products"
    const method = mode === "edit" ? "PUT" : mode === "delete" ? "DELETE" : "POST";
// console.log(method,url+`?id=${initialData.id}` )
    const response = await fetch(url, {
      method,
      body: method !== "DELETE" ? formDataObj : undefined,
    });

    if (!response.ok) throw new Error("Failed to save product");

    setSubmitMessage(
      mode === "delete"
        ? "Product deleted successfully"
        : `Product ${mode === "edit" ? "updated" : "added"} successfully`
    );

    if (mode === "create" || mode === "delete") {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        sku: "",
        category: "",
        brand: "",
        weight: "",
        dimensions: "",
        image_urls: [],
        promo_codes: "",
        files: [],
      });
      setPreviewUrls([]);
    }

    onSuccess();
  } catch (error) {
    setSubmitMessage("Error: Failed to connect to server");
  } finally {
    setIsSubmitting(false);
  }
};
const handleRemoveImage = (index: number) => {
  setFormData((prev) => ({
    ...prev,
    files: prev.files?.filter((_, i) => i !== index) || [],
  }));

  setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
};

const [previewUrls, setPreviewUrls] = useState<string[]>([]);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  setFormData((prev) => ({ ...prev, files }));

  const urls = files.map((file) => URL.createObjectURL(file));
  setPreviewUrls(urls);
};


  const title =
    mode === "create"
      ? "Add New Product"
      : mode === "edit"
      ? "Edit Product"
      : "Delete Product";

  const description =
    mode === "create"
      ? "Fill in the details below to add a new product to your inventory."
      : mode === "edit"
      ? "Update the product details below."
      : `Are you sure you want to delete "${initialData?.name}"? This action cannot be undone.`;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        {submitMessage && (
          <div
            className={`mb-4 p-3 rounded-md ${
              submitMessage.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {mode !== "delete" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (EGP)</label>
              <input
                type="number"
                name="price"
                id="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                id="stock_quantity"
                min="0"
                value={formData.stock_quantity}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.stock_quantity ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{errors.stock_quantity}</p>}
            </div>

            {/* <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                name="sku"
                id="sku"
                placeholder="Must be Unique ..."
                value={formData.sku}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.sku ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
            </div> */}

            {/* <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.category ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.brand ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
            </div> */}

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                id="weight"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.weight ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
            </div>

            <div>
              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions (LxWxH)</label>
              <input
                type="text"
                name="dimensions"
                id="dimensions"
                placeholder="e.g., 20x15x10 cm"
                value={formData.dimensions}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border p-2 ${errors.dimensions ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
              />
              {errors.dimensions && <p className="mt-1 text-sm text-red-600">{errors.dimensions}</p>}
            </div>
<div className="sm:col-span-2">
  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
    Upload Images
  </label>
  <input
    type="file"
    id="images"
    accept="image/*"
    multiple
    onChange={handleFileChange}
    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
  />
  {previewUrls.length > 0 && (
    <div className="mt-2 flex flex-wrap gap-2">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="max-h-24 rounded-lg border"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs shadow-md hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


            {/* <div className="sm:col-span-2">
              <label htmlFor="promo_codes" className="block text-sm font-medium text-gray-700">Promo Codes (comma separated)</label>
              <input
                type="text"
                name="promo_codes"
                id="promo_codes"
                value={formData.promo_codes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div> */}
          </div>
        ) : (
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Delete Product</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>This action cannot be undone. All product data will be permanently removed from the system.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              mode === "delete"
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50`}
          >
            {isSubmitting
              ? mode === "delete"
                ? "Deleting..."
                : mode === "edit"
                ? "Updating..."
                : "Adding..."
              : mode === "delete"
              ? "Delete Product"
              : mode === "edit"
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}