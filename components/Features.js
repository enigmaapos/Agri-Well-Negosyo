// components/Features.js
const features = [
  { title: "Organic Farming Kits", desc: "Easy starter packs for vegetables and herbs." },
  { title: "Wellness Coaching", desc: "Support for mental, physical, and emotional health." },
  { title: "Income Opportunities", desc: "Turn your harvest into real negosyo income." },
];

export default function Features() {
  return (
    <section className="bg-green-50 py-12 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-green-700">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
