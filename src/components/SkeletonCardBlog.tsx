export const SkeletonCardBlog = ({ large = false }: { large?: boolean }) => (
  <div
    className={`animate-pulse bg-gray-100 rounded shadow ${
      large ? "h-[300px]" : "h-[260px]"
    }`}
  >
    <div className="bg-gray-300 h-2/3 rounded-t" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);
