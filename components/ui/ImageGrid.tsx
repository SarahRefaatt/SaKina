

// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useCartStore } from "@/app/store/cartStore";
// import { cubicBezier } from "framer-motion";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock_quantity: number;
//   sku: string;
//   category: string;
//   brand: string;
//   weight: number;
//   dimensions: string;
//   image_urls: string[];
//   created_at: string;
//   updated_at: string;
// }

// export default function EcommerceProductGrid() {
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingToCart, setAddingToCart] = useState<number | null>(null);
//   const [notification, setNotification] = useState({ show: false, message: "" });
//   const { fetchCart } = useCartStore.getState();

//   // -------------------------------
//   // Fetch Products
//   // -------------------------------
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/products");
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   console.log("Products:", products);

//   // -------------------------------
//   // Small helpers
//   // -------------------------------
//   const showNotification = (message: string) => {
//     setNotification({ show: true, message });
//     setTimeout(() => setNotification({ show: false, message: "" }), 3000);
//   };

//   const formatPrice = (price: number) => {
//     const formatted = new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(price);
//     return `${formatted} EGP`;
//   };

//   // -------------------------------
//   // Add to Cart
//   // -------------------------------
//   const handleAddToCart = async (productId: number) => {
//     setAddingToCart(productId);

//     const product = products.find((p) => p.id === productId);
//     if (!product) return setAddingToCart(null);

//     try {
//       // Create a cart
//       const cartResponse = await fetch("/api/carts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!cartResponse.ok) throw new Error("Failed to create cart");

//       const { id: cartId } = await cartResponse.json();

//       // Add item
//       const itemResponse = await fetch("/api/cartItems", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cart_id: cartId,
//           product_id: productId,
//           quantity: 1,
//         }),
//       });

//       if (!itemResponse.ok) throw new Error("Failed to add item to cart");

//       await fetchCart();
//       setAddingToCart(null);
//       showNotification(`${product.name} added to cart.`);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       showNotification("Failed to add product.");
//       setAddingToCart(null);
//     }
//   };

//   // -------------------------------
//   // Animation presets
//   // -------------------------------
//   const container = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.09 },
//     },
//   };

//   // const item = {
//   //   hidden: { opacity: 0, y: 60 },
//   //   visible: {
//   //     opacity: 1,
//   //     y: 0,
//   //     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
//   //   },
//   // };
// const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

// const item = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: easeOutExpo,
//     },
//   },
// };

//   // -------------------------------
//   // Loading skeleton
//   // -------------------------------
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-black p-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-white dark:bg-neutral-900 rounded-xl shadow animate-pulse overflow-hidden"
//             >
//               <div className="h-60 bg-neutral-800"></div>
//               <div className="p-5">
//                 <div className="h-6 bg-neutral-800 rounded mb-2"></div>
//                 <div className="h-4 bg-neutral-800 rounded w-2/3 mb-4"></div>
//                 <div className="h-8 bg-neutral-800 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // -------------------------------
//   // Error state
//   // -------------------------------
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center p-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
//           <p className="mb-6 text-neutral-500">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // -------------------------------
//   // MAIN RENDER
//   // -------------------------------
//   return (
//     <>
//       {/* -------- HERO -------- */}
//       <section className="relative h-screen w-screen overflow-hidden bg-black">
//         <Image
//           src="/assets/hero-marble.jpg"
//           alt=""
//           fill
//           className="object-cover scale-110 blur-sm brightness-50"
//         />

//         <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.6 }}
//           >
//             <h1 className="text-white text-5xl md:text-7xl tracking-[0.2em] font-light uppercase">
//               SaKina
//             </h1>
//             <p className="mt-2 text-neutral-400 text-lg tracking-[0.4em] font-light">
//               One-of-one collectables
//             </p>
//             <div className="mt-10 w-1 h-16 bg-amber-400 mx-auto" />
//           </motion.div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest animate-pulse">
//           SCROLL
//         </div>
//       </section>

//       {/* -------- GRID -------- */}
//       <section className="bg-neutral-950 py-24 px-6 lg:px-12">
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8"
//         >
//           {products.map((product, idx) => (
//             <motion.div
//               key={product.id}
//               variants={item}
//               className={`group relative overflow-hidden bg-neutral-900 rounded-sm cursor-pointer 
//                 ${idx % 5 === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4"}`}
//               onClick={() => router.push(`/${product.id}`)}
//             >
//               {/* IMAGE */}
//               <div className="relative w-full h-96 md:h-full">
//                 {product.image_urls?.[0] ? (
//                   <Image
//                     src={product.image_urls[0]}
//                     alt={product.name}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-neutral-800" />
//                 )}

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//               </div>

//               {/* DETAILS */}
//               <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
//                 <div className="text-xs tracking-[0.3em] text-amber-400 uppercase">
//                   Lot #{String(product.id).slice(-5)}
//                 </div>

//                 <h2 className="mt-2 text-2xl md:text-3xl font-light tracking-wide">
//                   {product.name}
//                 </h2>

//                 <div className="mt-4 flex items-center gap-4">
//                   <span className="text-3xl font-extralight">
//                     {formatPrice(product.price)}
//                   </span>

//                   {product.stock_quantity === 0 && (
//                     <span className="text-[10px] border border-red-300 text-red-300 px-2 py-0.5 rounded-full">
//                       SOLD
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* CTA BUTTON */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product.id);
//                 }}
//                 disabled={addingToCart === product.id || product.stock_quantity === 0}
//                 className="absolute top-6 right-6 bg-white/5 backdrop-blur border border-white/10 px-5 py-2 
//                   rounded-full text-xs text-white uppercase tracking-[0.2em]
//                   hover:bg-white/10 transition disabled:text-neutral-500"
//               >
//                 {addingToCart === product.id
//                   ? "ADDING…"
//                   : product.stock_quantity === 0
//                   ? "UNAVAILABLE"
//                   : "ACQUIRE"}
//               </button>
//             </motion.div>
//           ))}
//         </motion.div>

//         {products.length === 0 && (
//           <div className="text-center text-neutral-500 tracking-widest text-sm mt-12">
//             CATALOGUE EMPTY
//           </div>
//         )}
//       </section>

//       {/* -------- NOTIFICATION -------- */}
//       {notification.show && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           className="fixed bottom-8 right-8 bg-amber-400 text-black text-xs tracking-widest px-6 py-3 rounded-sm shadow-2xl"
//         >
//           {notification.message}
//         </motion.div>
//       )}
//     </>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { cubicBezier } from "framer-motion";

interface Product {
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
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export default function EcommerceProductGrid() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const { fetchCart } = useCartStore.getState();

  // Animation easing
  const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Notification handler
  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  // Price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Add to Cart with improved error handling
  const handleAddToCart = async (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock_quantity === 0) return;

    setAddingToCart(productId);

    try {
      // Create or get existing cart
      let cartId = localStorage.getItem("cartId");
      
      if (!cartId) {
        const cartResponse = await fetch("/api/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({})
        });

        if (!cartResponse.ok) throw new Error("Failed to create cart");
        
        const { id: newCartId } = await cartResponse.json();
        cartId = newCartId;
        localStorage.setItem("cartId", newCartId);
      }
      
      // Add item to cart

      console.log("Adding to cart:", { cartId, productId });
      const itemResponse = await fetch("/api/cartItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!itemResponse.ok) {
        const errorData = await itemResponse.json();
        throw new Error(errorData.error || "Failed to add item to cart");
      }

      await fetchCart();
      showNotification(`✓ ${product.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      showNotification("Failed to add product to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.6,
        ease: easeOutExpo,
      },
    },
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 p-8 lg:p-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="group bg-neutral-900 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/5] bg-neutral-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4 lg:p-6 space-y-3">
                  <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                  <div className="h-6 bg-neutral-800 rounded w-3/4"></div>
                  <div className="h-5 bg-neutral-800 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h2 className="text-2xl font-light text-white mb-4 tracking-wide">
            Error Loading Products
          </h2>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 border border-neutral-700 text-neutral-300 
                     hover:border-amber-400 hover:text-amber-400 transition-colors
                     tracking-widest text-sm uppercase rounded-lg"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Image
          src="/assets/hero-marble.jpg"
          alt="SaKina Hero"
          fill
          priority
          className="object-cover scale-105 blur-[2px] brightness-50"
          quality={100}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="max-w-4xl"
          >
            <h1 className="text-white text-6xl lg:text-8xl xl:text-9xl tracking-[0.2em] font-light uppercase mb-4">
              SaKina
            </h1>
            <p className="text-neutral-300 text-lg lg:text-xl tracking-[0.4em] font-light mb-12">
              One-of-one collectables
            </p>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2, duration: 1.2, ease: easeOutExpo }}
              className="w-px h-24 bg-amber-400 mx-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 
                     text-xs tracking-widest animate-pulse"
        >
          SCROLL
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="bg-neutral-950 py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group relative bg-neutral-900 rounded-lg overflow-hidden 
                         hover:bg-neutral-800/50 transition-all duration-500 
                         cursor-pointer border border-neutral-800 hover:border-neutral-700"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  {product.image_urls?.[0] ? (
                    <Image
                      src={product.image_urls[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={index < 4}
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-neutral-600 text-sm uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent 
                                opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Status Badge */}
                  {product.stock_quantity === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500/90 text-white px-3 py-1 rounded-full 
                                     text-xs tracking-widest uppercase border border-red-400">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                  <div className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-2">
                    Lot #{String(product.id).padStart(5, '0')}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-light tracking-wide mb-3 
                               line-clamp-2 group-hover:text-amber-50 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl lg:text-3xl font-extralight text-amber-400">
                      {formatPrice(product.price)}
                    </span>
                    
                    {product.stock_quantity > 0 && (
                      <span className="text-xs text-neutral-400 tracking-widest">
                        {product.stock_quantity} in stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                  disabled={addingToCart === product.id || product.stock_quantity === 0}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm 
                           border border-white/20 px-4 py-2 rounded-full 
                           text-xs text-white uppercase tracking-[0.2em] font-medium
                           hover:bg-amber-400 hover:text-black hover:border-amber-400
                           transition-all duration-300 disabled:opacity-30 
                           disabled:cursor-not-allowed disabled:hover:bg-black/60 
                           disabled:hover:text-white disabled:hover:border-white/20"
                >
                  {addingToCart === product.id ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border border-current border-t-transparent rounded-full"
                      />
                      Adding...
                    </span>
                  ) : product.stock_quantity === 0 ? (
                    "Sold Out"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {products.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-neutral-500 tracking-widest text-sm uppercase mb-4">
                Catalogue Empty
              </div>
              <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
                No products available at the moment. Please check back later.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 bg-amber-400 text-black px-6 py-3 
                     rounded-lg shadow-2xl border border-amber-300 z-50
                     text-sm font-medium tracking-widest uppercase"
        >
          {notification.message}
        </motion.div>
      )}
    </>
  );
}