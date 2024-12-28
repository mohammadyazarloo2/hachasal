import { HiViewGrid, HiViewList } from "react-icons/hi";

export default function ProductSort({
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
  totalProducts
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">نمایش:</span>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-amber-50 text-amber-500" : "text-gray-700"}`}
          >
            <HiViewGrid className="text-xl" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-amber-50 text-amber-500" : "text-gray-700"}`}
          >
            <HiViewList className="text-xl" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-gray-700"
          >
            <option value="newest">جدیدترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="rating">محبوب‌ترین</option>
            <option value="bestselling">پرفروش‌ترین</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {totalProducts} محصول
        </div>
      </div>
    </div>
  );
}
