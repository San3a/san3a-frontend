function OfferShimmer() {
  return (
    <div className="mt-5 animate-pulse">
      <div className="flex">
        <div className="h-8 w-8 bg-gray-300 rounded-full shrink-0"></div>

        <div className="w-full bg-black/5 rounded-lg px-3 py-2 ms-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>

          <div className="h-3 w-20 bg-gray-300 rounded mt-2"></div>

          <div className="mt-3 space-y-2">
            <div className="w-full h-3 bg-gray-300 rounded"></div>
            <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
            <div className="w-4/6 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="ms-10 mt-3 h-4 w-24 bg-gray-300 rounded"></div>
    </div>
  );
}

export default OfferShimmer;
