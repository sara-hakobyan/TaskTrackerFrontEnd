const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin" />
        {/* <p className="text-white/70 text-lg">Loading...</p> */}
      </div>
    </div>
  );
};

export { Loading };
