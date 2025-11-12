const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-[#F7F7F7] rounded-xl shadow-[0px_0px_10.9px_0px_#EBEBEB40]">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-[#787486] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-[#243C7B] mb-2">
          No posts found
        </h3>
        <p className="text-sm text-[#787486] max-w-md">
          There are no posts available. Create your first post to get started.
        </p>
      </div>
    </div>
  );
};

export default Empty;
