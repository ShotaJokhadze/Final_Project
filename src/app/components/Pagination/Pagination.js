import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      {hasPrevPage && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {hasNextPage && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}
