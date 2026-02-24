const NewsLetter = () => {
  return (
    <section className="flex flex-col items-center text-gray-800 py-16 px-4">
      
      {/* Heading */}
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl md:text-4xl font-bold max-w-2xl">
          Subscribe{" "}
          <span className="text-primary bg-green-100 px-2 py-1 rounded-lg">
            newsletter
          </span>
        </h2>

        <p className="text-center text-gray-500 max-w-lg mt-4 text-sm md:text-base">
          A visual collection of our most recent works – each piece crafted with
          intention, emotion, and style.
        </p>
      </div>

      {/* Input Box */}
      <div className="flex items-center justify-between mt-10 border border-green-300 
        focus-within:ring-2 focus-within:ring-green-500 
        rounded-full h-14 max-w-xl w-full bg-white shadow-sm">

        <input
          className="bg-transparent outline-none px-6 h-full flex-1 
          placeholder:text-gray-400 text-sm md:text-base"
          placeholder="Enter your email address"
          type="email"
        />

        <button
          className="bg-primary text-white rounded-full h-12 px-8 mr-1 
          hover:bg-green-600 active:scale-95 transition"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsLetter;
