// components/JoinForm.js
export default function JoinForm() {
  return (
    <section id="join" className="bg-white py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Join Agri-Well Negosyo</h2>
        <form className="space-y-4 text-left">
          <input type="text" placeholder="Full Name" className="w-full border p-3 rounded" />
          <input type="email" placeholder="Email Address" className="w-full border p-3 rounded" />
          <input type="tel" placeholder="Phone Number" className="w-full border p-3 rounded" />
          <textarea placeholder="Your wellness or farming interest..." className="w-full border p-3 rounded h-32" />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}