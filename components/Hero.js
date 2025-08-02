// components/Hero.js
export default function Hero() {
  return (
    <section id="home" className="bg-green-100 py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-green-800">Welcome to Agri-Well Negosyo</h1>
      <p className="mt-4 text-lg md:text-xl text-green-700 max-w-2xl mx-auto">
        Bridging Agriculture and Wellness. Grow naturally. Thrive holistically.
      </p>
      <a
        href="#join"
        className="mt-8 inline-block bg-green-700 text-white py-3 px-6 rounded-full hover:bg-green-800 transition"
      >
        Join Us Now
      </a>
    </section>
  );
}