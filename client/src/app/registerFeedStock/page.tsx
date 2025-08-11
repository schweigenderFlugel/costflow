'use client'
import { useState } from "react";

const materialsData = [
  { name: "DEXTRINE", unit: "kg", price: 1300, date: "8/5/2025" },
  { name: "STARCH", unit: "kg", price: 1300, date: "8/5/2025" },
  { name: "CAUSTIC_SODA", unit: "kg", price: 1885, date: "8/5/2025" },
  { name: "FORMOL", unit: "kg", price: 2340, date: "8/5/2025" },
  { name: "BORAX", unit: "kg", price: 2405, date: "8/5/2025" },
  { name: "UREA", unit: "kg", price: 915, date: "8/5/2025" },
  { name: "WATER", unit: "L", price: 5, date: "8/5/2025" },
  { name: "BAGS", unit: "piece", price: 250, date: "8/5/2025" },
];

export default function registerFeedStock() {
  const [activeTab, setActiveTab] = useState("materials");
  const [file, setFile] = useState(null);

  return (
    <div className="p-2 bg-gray-100 min-h-screen font-sans">
      {/* Tabs */}
      <div className="flex justify-center space-x-18 mb-6 bg-white rounded-md shadow p-3 max-w-5xl mx-auto">
        <button
          onClick={() => setActiveTab("materials")}
          className={`flex items-center space-x-2 text-sm font-semibold rounded-md px-4 py-2 ${
            activeTab === "materials" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <span>Materials</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center space-x-2 text-sm font-semibold rounded-md px-4 py-2 ${
            activeTab === "products" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveTab("exchange")}
          className={`flex items-center space-x-2 text-sm font-semibold rounded-md px-4 py-2 ${
            activeTab === "exchange" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <span>Exchange Rate</span>
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex items-center space-x-2 text-sm font-semibold rounded-md px-4 py-2 ${
            activeTab === "upload" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <span>Upload CSV</span>
        </button>
      </div>

      {/* Materials content */}
      {activeTab === "materials" && (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Upper box */}
          <section className="bg-white rounded-md shadow p-6">
            <h3 className="font-bold mb-1 text-sm">Raw Materials</h3>
            <p className="text-xs text-gray-600 mb-4">
              Manage your input materials and their prices
            </p>
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 font-semibold">Name</th>
                    <th className="py-2 px-4 font-semibold">Unit Price</th>
                    <th className="py-2 px-4 font-semibold">Currency</th>
                    <th className="py-2 px-4 font-semibold">Price in ARS</th>
                    <th className="py-2 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No materials added yet.{" "}
                      <span className="underline cursor-pointer text-gray-600">
                        Upload a CSV file to get started.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Lower box */}
          <section className="bg-white rounded-md shadow p-6">
            <h2 className="font-bold mb-1 text-sm">Raw Materials</h2>
            <p className="text-xs text-gray-600 mb-4">
              Manage your laboratory raw materials and pricing
            </p>

            {/* Importar materiales */}
            <div className="mb-6 flex items-center space-x-2">
              <label
                htmlFor="csv-upload"
                className="cursor-pointer inline-block rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Choose File
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv, application/vnd.ms-excel"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </label>
              <span className="text-xs text-gray-600">
                {file ? file.name : "No file chosen"}
              </span>
              <button
                type="button"
                className="ml-auto bg-gray-100 hover:bg-gray-200 text-xs rounded px-3 py-1"
              >
                Template
              </button>
              <button
                type="button"
                className="ml-2 bg-black text-white text-xs rounded px-3 py-1"
              >
                + Add Material
              </button>
            </div>

            {/* Base de datos de materiales */}
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 font-semibold">Name</th>
                    <th className="py-2 px-4 font-semibold">Unit</th>
                    <th className="py-2 px-4 font-semibold">Price</th>
                    <th className="py-2 px-4 font-semibold">Date Added</th>
                    <th className="py-2 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materialsData.map(({ name, unit, price, date }) => (
                    <tr
                      key={name}
                      className="border-t border-gray-100 even:bg-gray-50"
                    >
                      <td className="py-2 px-4 font-mono">{name}</td>
                      <td className="py-2 px-4">
                        <span className="bg-gray-900 text-white text-[10px] rounded-full px-2 py-0.5 font-mono font-semibold">
                          {unit}
                        </span>
                      </td>
                      <td className="py-2 px-4 font-mono">${price.toLocaleString()}</td>
                      <td className="py-2 px-4">{date}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="border border-red-400 text-red-500 rounded px-2 py-1 hover:bg-red-50"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}