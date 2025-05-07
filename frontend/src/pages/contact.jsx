import React, { useState } from 'react';
import { BiSolidMagicWand } from 'react-icons/bi';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent!');
    // Here you would typically handle form submission, e.g., sending data to an API
  };

  return (
    <div className="bg-primary-black text-primary-white font-poppins pt-10">
      {/* Contact Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <BiSolidMagicWand size={40} />
            <h2 className="text-4xl font-semibold mb-6 mx-8">
              Reach Out & Let’s Cast Some Magic 
            </h2>
            <BiSolidMagicWand size={40} />
          </div>
          <p className="text-lg md:text-xl text-secondary-lightblue">
            If you have any questions, magical suggestions, or just want to chat,
            don't hesitate to reach out to us. Our team is always ready to help with
            anything you need. We look forward to hearing from you!
          </p>
          <div className="mt-10">
            <h3 className="text-2xl font-medium mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-secondary-darkgray text-primary-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-blue transition duration-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="bg-secondary-darkgray text-primary-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-blue transition duration-300"
                  required
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="bg-secondary-darkgray text-primary-white py-3 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-blue transition duration-300"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-secondary-blue text-primary-white px-6 py-3 rounded-md hover:bg-secondary-regulargray transition-all duration-300 ease-in-out"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
