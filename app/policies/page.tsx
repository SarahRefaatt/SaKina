"use client"

import { useState } from 'react'

export default function Policies() {
  const [activeSection, setActiveSection] = useState('returns')

  const sections = [
    { id: 'returns', title: 'Return Policy' },
    { id: 'refunds', title: 'Refund Policy' },
    { id: 'exchanges', title: 'Exchanges' },
    { id: 'conditions', title: 'Conditions' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return & Refund Policies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Please review our policies below.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8 flex flex-wrap">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-md font-medium transition-colors m-1 ${
                activeSection === section.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Return Policy */}
          {activeSection === 'returns' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">30-Day Return Window</h3>
                  <p className="text-gray-600">
                    We offer a 30-day return policy from the date of delivery. Items must be unworn, unwashed, 
                    and have original tags attached. Footwear must be tried on indoors only.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Return</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Log into your account and visit Order History</li>
                    <li>Select the item(s) you wish to return</li>
                    <li>Print the prepaid shipping label</li>
                    <li>Pack items securely in the original packaging</li>
                    <li>Drop off at any authorized shipping location</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Non-Returnable Items</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Underwear, swimwear, and hosiery for hygiene reasons</li>
                    <li>Personalized or custom-made items</li>
                    <li>Items marked as Final Sale</li>
                    <li>Gift cards</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Refund Policy */}
          {activeSection === 'refunds' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing Time</h3>
                  <p className="text-gray-600">
                    Once we receive your return, please allow 3-5 business days for processing. 
                    You will receive an email confirmation once your refund has been processed.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Refund Methods</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Original Payment Method</h4>
                        <p className="text-sm text-gray-600">
                          Refunds will be issued to the original payment method. Credit card refunds may take 
                          5-10 business days to appear on your statement.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Store Credit</h4>
                        <p className="text-sm text-gray-600">
                          You may choose to receive store credit, which will be issued immediately and never expires. 
                          Store credit comes with bonus 10% of the refund amount.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping Costs</h3>
                  <p className="text-gray-600">
                    Original shipping fees are non-refundable. Return shipping is free for U.S. returns but 
                    international customers are responsible for return shipping costs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Exchanges */}
          {activeSection === 'exchanges' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Size Exchanges</h3>
                  <p className="text-gray-600">
                    We offer free size exchanges within 30 days of delivery. If you need a different size, 
                    please initiate a return and place a new order for the correct size.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Color Exchanges</h3>
                  <p className="text-gray-600">
                    Color exchanges are subject to availability. Please check our website for current stock 
                    before requesting an exchange.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Exchange Process</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Initiate a return for the item you wish to exchange</li>
                    <li>Once processed, you will receive store credit for the returned item</li>
                    <li>Place a new order for the desired item</li>
                    <li>Use your store credit at checkout</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">Quick Tip</h4>
                  <p className="text-blue-700 text-sm">
                    For fastest service, place your new order immediately and use the return label to send back 
                    the original item. This way you will receive your exchange sooner.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conditions */}
          {activeSection === 'conditions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Conditions & Exceptions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Condition Requirements</h3>
                  <p className="text-gray-600 mb-4">
                    All returned items must be in original condition with tags attached and in original packaging.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Items must not show signs of wear or washing</li>
                    <li>Footwear must have no signs of outdoor wear</li>
                    <li>All original tags and labels must be attached</li>
                    <li>Accessories must be returned with all protective packaging</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Damaged or Defective Items</h3>
                  <p className="text-gray-900">
                    If you receive a damaged or defective item, please contact us within 7 days of delivery 
                    at <span className="text-blue-600">support@fashionstore.com</span> with photos of the damage. 
                    We will arrange for a free return and full refund or replacement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">International Returns</h3>
                  <p className="text-gray-900">
                    International customers are responsible for return shipping costs and any customs duties. 
                    Refunds will be issued in EGP and may be subject to currency conversion fees.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                  <p className="text-yellow-700 text-sm">
                    We reserve the right to refuse returns that do not meet our condition requirements. 
                    In such cases, the item will be returned to you at your expense.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Email Support</h4>
                <p className="text-gray-600">returns@fashionstore.com</p>
                <p className="text-sm text-gray-500 mt-1">Typically responds within 24 hours</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Phone Support</h4>
                <p className="text-gray-800">1-800-FASHION</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">How long does it take to receive my refund?</h3>
              <p className="text-gray-600 mt-1">
                Once we process your return, refunds to credit cards take 5-10 business days. PayPal refunds are usually faster, taking 3-5 business days.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">What if I received a wrong item?</h3>
              <p className="text-gray-600 mt-1">
                Contact us immediately at support@fashionstore.com with your order number and photos of the received item. We will send the correct item and provide a return label for the wrong item.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">Can I return sale items?</h3>
              <p className="text-gray-600 mt-1">
                Yes, sale items can be returned within 30 days unless marked as Final Sale. All regular return conditions apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}