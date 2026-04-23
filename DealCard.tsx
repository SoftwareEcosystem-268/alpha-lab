import { useState } from "react";

interface Deal {
  id: string;
  title: string;
  store: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  category: string;
  expiresAt: string;
  imageUrl: string;
  dealUrl: string;
}

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const [saved, setSaved] = useState(false);

  const savings = deal.originalPrice - deal.discountedPrice;
  const isExpiringSoon =
    new Date(deal.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      
      {/* Image */}
      <div className="relative">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-40 object-cover"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{deal.discountPercent}%
        </div>

        {/* Expiring Soon Badge */}
        {isExpiringSoon && (
          <div className="absolute top-3 right-3 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ⏰ ใกล้หมด
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Category */}
        <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded-full">
          {deal.category}
        </span>

        {/* Title */}
        <h3 className="text-gray-800 font-semibold text-sm leading-snug line-clamp-2">
          {deal.title}
        </h3>

        {/* Store */}
        <p className="text-gray-400 text-xs">🏪 {deal.store}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold text-lg">
            ฿{deal.discountedPrice.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ฿{deal.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Savings */}
        <p className="text-green-500 text-xs font-medium">
          💰 ประหยัด ฿{savings.toLocaleString()}
        </p>

        {/* Expires */}
        <p className="text-gray-400 text-xs">
          หมดเขต: {new Date(deal.expiresAt).toLocaleDateString("th-TH")}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          
            href={deal.dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
          >
            รับดีล
          </a>
          <button
            onClick={() => setSaved(!saved)}
            className={`px-3 py-2 rounded-xl border text-sm transition-colors ${
              saved
                ? "bg-yellow-400 border-yellow-400 text-white"
                : "border-gray-200 text-gray-400 hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            {saved ? "★" : "☆"}
          </button>
        </div>

      </div>
    </div>
  );
}