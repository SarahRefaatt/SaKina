
// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useCartStore } from "@/app/store/cartStore";
// import Link from "next/link";

// export function SiteHeader() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(false); // ✅ Track admin status

//   // ✅ Fetch admin status
//   useEffect(() => {
//     async function checkAdmin() {
//       try {
//         const res = await fetch("/api/admin/status");
//         const data = await res.json();
//         setIsAdmin(data.isAdmin);
//       } catch {
//         setIsAdmin(false);
//       }
//     }
//     checkAdmin();
//   }, []);
//   const { cartItems, fetchCart } = useCartStore(); // ✅ Zustand store

//   // ✅ Fetch cart on mount
//   useEffect(() => {
//     setMounted(true);
//     fetchCart();
//   }, [fetchCart]);

//   // ✅ Detect dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       const html = document.documentElement;
//       if (html.classList.contains("dark")) return setIsDarkMode(true);
//       if (window.matchMedia("(prefers-color-scheme: dark)").matches) return setIsDarkMode(true);
//       if (localStorage.getItem("theme") === "dark") return setIsDarkMode(true);
//       setIsDarkMode(false);
//     };

//     checkDarkMode();
//     const mq = window.matchMedia("(prefers-color-scheme: dark)");
//     mq.addEventListener("change", checkDarkMode);
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

//     return () => {
//       mq.removeEventListener("change", checkDarkMode);
//       observer.disconnect();
//     };
//   }, []);

//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//   const hasItems = cartItemsCount > 0;

//   const handleCartClick = () => {
//     router.push("/cart");
//   };

//     const handleAdminClick = () => {
//     router.push("/dashboard");
//   };

//   if (!mounted) return null;
//               // <Image

//               // width={160}
//               //       height={160}
//               //   src="/assets/IMG - Copy.JPG"
//               //   alt="Coin Back" 
//               //   className="w-full h-full object-cover"
//               // />
//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
//       <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-full">
//         {/* <div className="flex items-center ml-2 lg:ml-0">
//           <h1 className="text-xl font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 text-center">
//             Thefty Cent
//           </h1>
//         </div> */}
// <div className="flex items-center ml-2 lg:ml-0">
//   <Link href="/" className="absolute left-1/2 -translate-x-1/2">
//    SaKina
//   </Link>
// </div>
//         <div className="ml-auto flex items-center gap-4">

//            {/* ✅ Admin Button */}
//           {isAdmin && (
//             <button
//               onClick={handleAdminClick}
//               className="p-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Admin
//             </button>
//           )}
//           {hasItems && (
//             <motion.button
//               className={`relative p-2 rounded-md transition 
//                 ${isDarkMode ? "bg-black" : "bg-transparent"} 
//                 hover:bg-gray-100 dark:hover:bg-gray-800`}
//               onClick={handleCartClick}
//               animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//                 bag Icon

//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartItemsCount}
//               </span>
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/app/store/cartStore";

export function SiteHeader() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { cartItems, fetchCart } = useCartStore();

  // ------------------------------
  // Mounted & cart fetch
  // ------------------------------
  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  // ------------------------------
  // Admin status
  // ------------------------------
  useEffect(() => {
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

  // ------------------------------
  // Dark mode detection
  // ------------------------------
  useEffect(() => {
    const detectDarkMode = () => {
      const html = document.documentElement;
      if (html.classList.contains("dark")) return setIsDarkMode(true);
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return setIsDarkMode(true);
      if (localStorage.getItem("theme") === "dark") return setIsDarkMode(true);
      setIsDarkMode(false);
    };

    detectDarkMode();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", detectDarkMode);

    const observer = new MutationObserver(detectDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", detectDarkMode);
      observer.disconnect();
    };
  }, []);

  // ------------------------------
  // Cart & admin handlers
  // ------------------------------
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const hasItems = cartItemsCount > 0;

  const handleCartClick = () => router.push("/cart");
  const handleAdminClick = () => router.push("/dashboard");

  if (!mounted) return null;

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <header className="sticky top-0 z-50 bg-black dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* LOGO */}
        <div className="flex-1 flex justify-center  items-center">
          <Link href="/" className="text-md font-bold tracking-widest text-gray-900 dark:text-white">
 <span className="bg-gradient-to-r from-white to-yellow-700 bg-clip-text text-transparent">
                 SaKina
              </span>          </Link>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button
              onClick={handleAdminClick}
              className="p-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Admin
            </button>
          )}

          {hasItems && (
            <motion.button
              onClick={handleCartClick}
              className={`relative p-2 rounded-md transition
                ${isDarkMode ? "bg-black" : "bg-gray-100"} 
                hover:bg-gray-200 dark:hover:bg-gray-800`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              aria-label="Cart"
            >
              {/* Simple Bag Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l1-5H6.4M7 13l-1.2 6H17l-1-6M7 13h10M5 6h14l1 7H4L5 6z"
                />
              </svg>

              {/* Cart count */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
