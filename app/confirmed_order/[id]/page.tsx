// "use client"

// import { useState, useEffect } from 'react'
// import Image from "next/image";

// interface OrderItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// export default function OrderConfirmed() {
//   const [orderId, setOrderId] = useState<string>('')
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//   const [orderDate, setOrderDate] = useState<string>('')
//   const [deliveryDate, setDeliveryDate] = useState<string>('')

//   useEffect(() => {
//     // Generate a random order ID
//     const randomId = 'ORD-' + Math.floor(10000 + Math.random() * 90000)
//     setOrderId(randomId)

//     // Set current date and delivery date (3 days from now)
//     const today = new Date()
//     const delivery = new Date()
//     delivery.setDate(today.getDate() + 3)

//     setOrderDate(today.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     }))

//     setDeliveryDate(delivery.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     }))

//     // Mock order items
//     setOrderItems([
//       {
//         id: 1,
//         name: "Premium Denim Jacket",
//         price: 89.99,
//         quantity: 1,
//                       image:"/assets/IMG.JPG" 
//       },
//       {
//         id: 2,
//         name: "Classic White Sneakers",
//         price: 75.50,
//         quantity: 1,
//                       image:"/assets/IMG.JPG" 
//       }
//     ])
//   }, [])

//   // Calculate order totals
//   const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//   const shippingCost = 9.99
//   const tax = subtotal * 0.08
//   const total = subtotal + shippingCost + tax

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <div className="bg-white rounded-lg shadow-md p-8">
//           {/* Success Icon and Message */}
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>

//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
//             <p className="text-gray-600 mb-4">
//               Thank you for your purchase. Your order has been successfully placed.
//             </p>
//             <div className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
//               <span className="text-gray-700">Order ID: </span>
//               <span className="font-semibold text-gray-600">{orderId}</span>
//             </div>
//           </div>

//           {/* Order Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Date</span>
//                   <span className="font-medium">{orderDate}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Estimated Delivery</span>
//                   <span className="font-medium">{deliveryDate}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Payment Method</span>
//                   <span className="font-medium">Credit Card</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping Address</span>
//                   <span className="font-medium text-right">
//                     123 Main Street<br />
//                     New York, NY 10001<br />
//                     United States
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

//               <div className="space-y-4">
//                 {orderItems.map(item => (
//                   <div key={item.id} className="flex items-center gap-4">
//                     <Image
//                     width={160}
//                     height={160}
//                       src={item.image} 
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />

//                     <div className="flex-grow">
//                       <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     </div>

//                     <div className="text-sm font-bold text-gray-900">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium">${shippingCost.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between text-lg font-bold pt-2">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <div className="bg-gray-50 rounded-lg p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">What is Next?</h2>

//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <div className="bg-gray-100 rounded-full p-2 mr-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-800">Order Processing</h3>
//                   <p className="text-sm text-gray-600">We are preparing your order for shipment. This usually takes 1-2 business days.</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="bg-gray-100 rounded-full p-2 mr-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-800">Shipping Confirmation</h3>
//                   <p className="text-sm text-gray-600">You will receive a shipping confirmation email with tracking information once your order ships.</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="bg-gray-100 rounded-full p-2 mr-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-800">Delivery</h3>
//                   <p className="text-sm text-gray-600">Your order will be delivered by {deliveryDate}. Someone must be available to receive the package.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
//               onClick={() => window.location.href = '/'}
//             >
//               Continue Shopping
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { useParams } from 'next/navigation'
import { jsPDF } from 'jspdf'
import autoTable, { CellDef, FontStyle, RowInput, UserOptions } from "jspdf-autotable";
import { useCartStore } from "@/app/store/cartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  sku: string;
  category: string;
  image_urls: string[];
}

interface OrderItem {
  id: number;
  cart_id?: number;
  quantity: number;
  total: number;
  product: Product;
}

interface OrderDetails {
  id: string;
  order_date: string;
  payment_method: string;
  shipping_address: string;
  order_items: OrderItem[];
  total_amount: number;
  floor: string;
  apartment_number: string; // Fixed spelling from "appartment_number"
}

interface TableRowCell {
  content?: string;
  colSpan?: number;
  styles?: {
    fontStyle?: string;
  };
}

type TableRow = (string | TableRowCell)[];

export default function OrderConfirmed() {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { setCartItems: setCartStoreItems } = useCartStore.getState();
  
  useEffect(() => {
    setCartStoreItems([]); // Clear cart after order
  }, [setCartStoreItems]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?id=${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch order details');
        }

        const orderData = await res.json();
        setOrderDetails(orderData);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);
console.log("PP:",orderDetails)
  const generatePDF = (orderDetails: OrderDetails) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("ORDER CONFIRMATION", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${orderDetails.id}`, 105, 30, { align: "center" });
    doc.text(`Order Date: ${orderDetails.order_date}`, 105, 36, { align: "center" });

    // Order info
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Order Information", 20, 50);

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Payment Method: ${orderDetails.payment_method}`, 20, 60);
    doc.text(`Shipping Address: ${orderDetails.shipping_address}`, 20, 66);
    
    // Add apartment and floor info if available
    if (orderDetails.apartment_number) {
      doc.text(`Apartment: ${orderDetails.apartment_number}`, 20, 72);
    }
    if (orderDetails.floor) {
      doc.text(`Floor: ${orderDetails.floor}`, 20, 78);
    }

    // Order summary
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Order Summary", 20, 90);

    const tableColumn = ["Product", "SKU", "Quantity", "Price"];
    const tableRows: TableRow[] = [];

    orderDetails.order_items.forEach((item) => {
      const itemData: TableRow = [
        item.product.name,
        item.product.sku,
        String(item.quantity),
        `$${(item.product.price * item.quantity).toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    // Total row
    tableRows.push([
      { content: "TOTAL", colSpan: 3, styles: { fontStyle: "bold" as FontStyle } },
      { content: `$${orderDetails.total_amount.toFixed(2)}`, styles: { fontStyle: "bold" as FontStyle } },
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 95,
      theme: "striped",
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 255,
        fontStyle: "bold" as FontStyle,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    } as UserOptions);

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Thank you for your purchase!", 105, doc.internal.pageSize.height - 10, {
        align: "center",
      });
    }

    doc.save(`order-${orderDetails.id}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-500 dark:border-gray-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Loading...</h2>
            {/* <p className="text-gray-600 dark:text-gray-300 mt-2">Please wait while we fetch your order information.</p> */}
          </div>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Unable to Load Order</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error || 'Order not found'}</p>
            <button
              className="bg-gray-600 dark:bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-gray-900 dark:from-red-900 dark:to-gray-950 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order Confirmed</h1>
                <p className="opacity-90">Thank you for your purchase. Your order has been successfully placed.</p>
              </div>
              <div className="mt-4 md:mt-0 bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30 rounded-lg px-4 py-2">
                <span className="text-sm opacity-90 text-black dark:text-white">Order ID: </span>
                <span className="font-semibold text-black dark:text-white">{orderDetails.id}</span>
              </div>
            </div>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center -mt-8 mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Order Information</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Order Date</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderDetails.order_date}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Payment Method</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderDetails.payment_method}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 dark:text-gray-300">Shipping Address</span>
                    <span className="font-medium text-right text-gray-900 dark:text-white">
                      {orderDetails.shipping_address}<br />
                    </span>
                  </div>
                  
                  {/* Fixed apartment_number field name */}
                  {orderDetails.apartment_number && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-300">Apartment Number</span>
                      <span className="font-medium text-right text-gray-900 dark:text-white">
                        {orderDetails.apartment_number}<br />
                      </span>
                    </div>
                  )}
                  
                  {orderDetails.floor && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-300">Floor</span>
                      <span className="font-medium text-right text-gray-900 dark:text-white">
                        {orderDetails.floor}<br />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {orderDetails.order_items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="relative w-16 h-16 overflow-hidden rounded-md">
                        {/* Fixed image display with proper error handling */}
                        {item.product.image_urls && item.product.image_urls.length > 0 ? (
                          <Image
                            src={item.product.image_urls[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              // Add a fallback image if the original fails to load
                              e.currentTarget.src = "/assets/placeholder.jpg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.product.name}</h3>
                        {/* <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.product.sku}</p> */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Qty: {item.quantity}</p>
                      </div>

                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {(item.product.price * item.quantity).toFixed(2)} EGP
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderDetails.total_amount.toFixed(2)} EGP</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">{orderDetails.total_amount.toFixed(2)} EGP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8 border border-gray-100 dark:border-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">What Happens Next?</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Order Processing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">We are preparing your order for shipment. This usually takes 1-2 business days.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Shipping Confirmation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">You will receive a shipping confirmation email with tracking information once your order ships.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Delivery</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Your order will be delivered soon. Someone must be available to receive the package.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                onClick={() => window.location.href = '/'}
              >
                Continue Shopping
              </button>
              <button
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
                onClick={() => generatePDF(orderDetails)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Receipt (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Need help? Contact our customer support at <a href="mailto:support@example.com" className="text-gray-600 dark:text-gray-400 hover:underline">support@example.com</a> or call 1-800-123-4567</p>
        </div>
      </div>
    </div>
  );
}