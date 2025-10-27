import { Star } from "lucide-react";

export default function AboutUs() {
  const advantages = [
    {
      title: "Premium Craftsmanship",
      description:
        "Each Watch ME is built with precision, using high-grade materials and Swiss movement.",
      icon: "⌚",
    },
    {
      title: "Lifetime Warranty",
      description:
        "We stand behind our quality — all watches come with a lifetime repair and battery replacement guarantee.",
      icon: "🛠️",
    },
    {
      title: "Free Worldwide Shipping",
      description:
        "Fast and secure delivery to any destination, with no hidden customs fees.",
      icon: "✈️",
    },
  ];

  const reviews = [
    {
      name: "Emily Johnson",
      review:
        "Absolutely love my new Watch ME! The design is sleek and the packaging felt luxurious.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Liam Carter",
      review:
        "Fantastic experience! The customer service was responsive and my order arrived earlier than expected.",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Sophia Brown",
      review:
        "The quality is stunning. I’ve been wearing my Chronos Silver daily and it still looks brand new.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-[#1A2A50] text-white px-6! py-16!">
      <div className="max-w-6xl mx-auto! text-center mb-16!">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury watches showcase"
          className="w-full h-80 object-cover rounded-2xl shadow-lg mb-10!"
        />
        <h1 className="text-4xl font-bold mb-4!">About Watch ME</h1>
        <p className="text-gray-300 max-w-3xl mx-auto! text-lg">
          Founded in 2012, <span className="text-red-500">Watch ME</span> was born
          from a passion for precision and design. Our mission is to craft timepieces that
          balance timeless elegance with modern technology — so you never miss a moment
          that matters.
        </p>
      </div>

      <div className="max-w-5xl mx-auto! grid md:grid-cols-3 gap-10 mb-20!">
        {advantages.map((adv, i) => (
          <div
            key={i}
            className="bg-gray-800/60 backdrop-blur-md p-6! rounded-xl shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform"
          >
            <div className="text-5xl mb-4!">{adv.icon}</div>
            <h3 className="text-xl font-semibold mb-2!">{adv.title}</h3>
            <p className="text-gray-300">{adv.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto! text-center">
        <h2 className="text-3xl font-semibold mb-8!">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-gray-800/60 p-6! rounded-2xl shadow-md border border-gray-700 flex flex-col items-center hover:shadow-xl transition-all"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-20 h-20 rounded-full object-cover mb-4! border-2 border-gray-600"
              />
              <p className="text-gray-300 italic mb-3!">“{r.review}”</p>
              <div className="flex text-yellow-400 mb-1!">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
