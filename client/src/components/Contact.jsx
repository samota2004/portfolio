import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef } from "react";

function Contact() {
  const [state, handleSubmit] = useForm("mjgedope");
  const formRef = useRef();

  // ✅ Reset form after successful submission
  useEffect(() => {
    if (state.succeeded) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact"
      className="bg-[#0E0E0E] text-white px-24 py-32"
    >
      <div className="grid grid-cols-2 gap-20">

        {/* Left Content */}
        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-6">
            Get In Touch
          </p>

          <h2 className="text-6xl leading-tight mb-8">
            Let’s Build{" "}
            <span className="text-gold italic">
              Something
            </span>{" "}
            Together
          </h2>

          <p className="text-gray-400 leading-relaxed mb-10">
            Have a project in mind? I’m open to freelance
            opportunities, collaborations, and full-time
            positions. Let’s create something remarkable.
          </p>

          <div className="space-y-4 text-gray-400">
            <p>📧 priyankasamota946@gmail.com</p>
            <p>📞 +91 6367232754</p>
            <p>🔗 https://www.linkedin.com/in/priyankasamota</p>
            <p>💻 https://github.com/samota2004</p>
          </div>
        </div>

        {/* Right Form */}
        <div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-gold outline-none py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-gold outline-none py-3"
            />

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full bg-transparent border-b border-gray-600 focus:border-gold outline-none py-3"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-gold outline-none py-3"
            />

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              disabled={state.submitting}
              className="mt-6 border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-black transition"
            >
              {state.submitting ? "Sending..." : "SEND MESSAGE →"}
            </button>

            {/* ✅ Success Message BELOW button */}
            {state.succeeded && (
              <p className="text-green-400 mt-4 animate-fadeIn">
                ✅ Your message has been sent successfully.
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;