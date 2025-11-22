// "use client"
// import { Button } from "@/components/ui/button";
// import { useRouter } from 'next/navigation'
// import { 
//   Package, 
//   ShoppingCart, 
//   Users, 
//   BarChart3, 
//   Settings,
//   PlusCircle,
//   Eye
// } from 'lucide-react';
// import { useEffect, useState } from "react";

// export default  function Dashboard() {
//   const router = useRouter()
//   const [orders,setOrders]=useState<number>(0)
//   const [products,setProducts]=useState<number>(0)

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

//   const adminCards = [
//     {
//       title: "Product Management",
//       description: "Create, edit, and manage your product catalog",
//       icon: <Package className="h-8 w-8" />,
//       action: () => router.push('/admin_products'),
//       buttonText: "Manage Products",
//       stats: "128 products",
//       color: "bg-blue-500"
//     },
//     {
//       title: "Order Management",
//       description: "View and process customer orders",
//       icon: <ShoppingCart className="h-8 w-8" />,
//       action: () => router.push('/admin_orders'),
//       buttonText: "View Orders",
//       stats: "24 pending orders",
//       color: "bg-green-500"
//     },
//     // {
//     //   title: "Customer Insights",
//     //   description: "Analyze customer data and behavior",
//     //   icon: <Users className="h-8 w-8" />,
//     //   action: () => router.push('/admin_customers'),
//     //   buttonText: "View Analytics",
//     //   stats: "1,248 customers",
//     //   color: "bg-purple-500"
//     // },
//     // {
//     //   title: "Sales Analytics",
//     //   description: "Track sales performance and revenue",
//     //   icon: <BarChart3 className="h-8 w-8" />,
//     //   action: () => router.push('/admin_analytics'),
//     //   buttonText: "View Reports",
//     //   stats: "$24.8K revenue",
//     //   color: "bg-amber-500"
//     // }
//   ];

//   const quickActions = [
//     {
//       title: "Add New Product",
//       icon: <PlusCircle className="h-5 w-5" />,
//       action: () => router.push('/admin_products?action=create')
//     },
//     // {
//     //   title: "View Recent Orders",
//     //   icon: <Eye className="h-5 w-5" />,
//     //   action: () => router.push('/admin_orders?filter=recent')
//     // }
//   ];
//    useEffect(()=>{

//     const fetchData=async()=>{
//     try{

//      const res=await fetch(`/api/products`)

//      if(!res.ok){
//         throw res
//      }

//      const data=await res.json()
   

//      setProducts(data)

//     }catch(err){
//         throw "ERROR FETCHING ORDERS"
//     }
//     }


// fetchData()
//   },[])
//   useEffect(()=>{

//     const fetchData=async()=>{
//     try{

//      const res=await fetch(`/api/orders?status=pending`)

//      if(!res.ok){
//         throw res
//      }

//      const data=await res.json()
   

//      setOrders(data)

//     }catch(err){
//   console.error("ERROR FETCHING ORDERS", err);
// }

//     }


// fetchData()
//   },[])

 

//   const numOrders=orders
//   console.log(orders)

//  const numProducts=products
//   console.log(orders)
//   if(!isAdmin){
//     return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p>Only visible to authenticated admins.</p>
//     </div>
//   );
//   }


//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//             <p className="text-gray-600">Manage your store operations</p>
//           </div>
         
//         </div>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="rounded-full bg-blue-100 p-3 mr-4">
//                 <Package className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Products</p>
//                 <p className="text-2xl font-bold text-gray-900">{numProducts}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="rounded-full bg-green-100 p-3 mr-4">
//                 <ShoppingCart className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending Orders</p>
//                 <p className="text-2xl font-bold text-gray-900">{numOrders}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="rounded-full bg-purple-100 p-3 mr-4">
//                 <Users className="h-6 w-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Customers</p>
//                 <p className="text-2xl font-bold text-gray-900">1,248</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="rounded-full bg-amber-100 p-3 mr-4">
//                 <BarChart3 className="h-6 w-6 text-amber-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Revenue</p>
//                 <p className="text-2xl font-bold text-gray-900">$24.8K</p>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Management Sections</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {adminCards.map((card, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className={`rounded-lg p-3 ${card.color} text-white`}>
//                     {card.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mt-4">{card.title}</h3>
//                 <p className="text-gray-600 mt-2">{card.description}</p>
//                 <p className="text-sm text-gray-500 mt-4">{card.stats}</p>
//                 <div className="mt-6">
//                   <Button 
//                     onClick={card.action} 
//                     className="w-full"
//                   >
//                     {card.buttonText}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Quick Actions */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {quickActions.map((action, index) => (
//               <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="bg-gray-100 rounded-lg p-2 mr-4">
//                     {action.icon}
//                   </div>
//                   <span className="font-medium text-gray-900">Add & Edit & Delete Product </span>
//                 </div>
//                 <Button onClick={()=>router.push(`/product_details`)} size="sm">
//                   Go
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Admin Cards */}


//         {/* Recent Activity Section */}
//         {/* <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-center justify-between border-b pb-4">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 rounded-full p-2 mr-3">
//                     <ShoppingCart className="h-4 w-4 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-medium">New order received</p>
//                     <p className="text-sm text-gray-500">Order #3245 for $124.99</p>
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-500">2 hours ago</span>
//               </div>
              
//               <div className="flex items-center justify-between border-b py-4">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 rounded-full p-2 mr-3">
//                     <Package className="h-4 w-4 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-medium">Product updated</p>
//                     <p className="text-sm text-gray-500">"Wireless Headphones" stock updated</p>
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-500">5 hours ago</span>
//               </div>
              
//               <div className="flex items-center justify-between pt-4">
//                 <div className="flex items-center">
//                   <div className="bg-purple-100 rounded-full p-2 mr-3">
//                     <Users className="h-4 w-4 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="font-medium">New customer registered</p>
//                     <p className="text-sm text-gray-500">John Doe joined the store</p>
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-500">1 day ago</span>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </main>
//     </div>
//   )
// }

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'



export default function Dashboard() {
  const router = useRouter();

  // 🔹 States
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // 🔹 Check Admin Status
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/admin/status");
        if (!res.ok) throw new Error("Failed to check admin");
        const data = await res.json();
        setIsAdmin(data.isAdmin || false);
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  // 🔹 Fetch Products Count
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProductsCount(Array.isArray(data) ? data.length : 0); // ✅ Store count
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 🔹 Fetch Orders Count
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders?status=pending");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrdersCount(Array.isArray(data) ? data.length : 0); // ✅ Store count
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, []);
  const adminCards = [
    {
      title: "Product Management",
      description: "Create, edit, and manage your product catalog",
      icon: <Package className="h-8 w-8" />,
      action: () => router.push('/admin_products'),
      buttonText: "Manage Products",
      stats: "128 products",
      color: "bg-blue-500"
    },
    {
      title: "Order Management",
      description: "View and process customer orders",
      icon: <ShoppingCart className="h-8 w-8" />,
      action: () => router.push('/admin_orders'),
      buttonText: "View Orders",
      stats: "24 pending orders",
      color: "bg-green-500"
    },
   
  ];
  // 🔹 Show Loading
  if (loading || isAdmin === null) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  // 🔹 Restrict Access
  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store operations</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{productsCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{ordersCount}</p>
            </div>
          </div>
        </div>

               <h2 className="text-xl font-semibold text-gray-900 mb-4">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-3 ${card.color} text-white`}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{card.title}</h3>
                <p className="text-gray-600 mt-2">{card.description}</p>
                {/* <p className="text-sm text-gray-500 mt-4">{card.stats}</p> */}
                <div className="mt-6">
                  <Button 
                    onClick={card.action} 
                    className="w-full"
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-lg p-2 mr-4">
                <Package className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-900">
                Add & Edit & Delete Product
              </span>
            </div>
            <Button onClick={() => router.push(`/product_details`)} size="sm">
              Go
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
