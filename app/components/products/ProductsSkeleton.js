const ProductsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar Skeleton */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl p-4">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="col-span-12 lg:col-span-9">
          {/* Sort Bar Skeleton */}
          <div className="bg-white rounded-xl p-4 mb-6 flex justify-between">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 flex-grow bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-8 gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
