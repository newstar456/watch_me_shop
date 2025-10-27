import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log("Form submitted:", data);
    alert("Thank you for reaching out! We’ll respond within 24 hours.");
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-[#1A2A50] text-white px-6! py-16!">
      <div className="max-w-6xl mx-auto text-center mb-16!">
        <h1 className="text-4xl font-bold mb-4!">Contact Watch ME</h1>
        <p className="text-gray-300 max-w-3xl mx-auto! text-lg">
          We’d love to hear from you. Whether you have a question about our collections,
          need help with an order, or just want to share feedback — our team is always here
          to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto! grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8! border border-gray-700 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6!">Get in Touch</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-500 w-6 h-6 shrink-0" />
                <span>
                  1234 Elm Street, Suite 100<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-500 w-6 h-6" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-500 w-6 h-6" />
                <span>support@watchme.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-red-500 w-6 h-6" />
                <span>Mon – Fri: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="mt-10!">
            <iframe
              title="Map"
              className="w-full h-64 rounded-xl border border-gray-700"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-linear-to-br from-gray-800 via-gray-800 to-[#1A2A50] backdrop-blur-md rounded-2xl p-8! border border-gray-700 shadow-lg flex flex-col gap-5"
        >
          <h2 className="text-2xl font-semibold mb-4!">Send Us a Message</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`bg-gray-900 border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } rounded-lg px-4! py-2! text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition-all`}
            />
            {errors.name && (
              <p className="text-sm text-red-400 italic">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              className={`bg-gray-900 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } rounded-lg px-4! py-2! text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition-all`}
            />
            {errors.email && (
              <p className="text-sm text-red-400 italic">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", { required: "Message cannot be empty" })}
              className={`bg-gray-900 border ${
                errors.message ? "border-red-500" : "border-gray-600"
              } rounded-lg px-4! py-2! text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition-all`}
            />
            {errors.message && (
              <p className="text-sm text-red-400 italic">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4! bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg px-6! py-3! transition-transform hover:scale-[1.02] shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
