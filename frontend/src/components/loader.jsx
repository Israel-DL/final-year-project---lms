const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="z-10 fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black opacity-40">
      <l-spiral size="50" speed="0.9" color="white"></l-spiral>
    </div>
  );
};

export default Loader;
