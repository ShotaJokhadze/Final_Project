export default function Contact() {
  return (
    <div className="max-w-[600px] m-auto p-5">
      <h2 className="text-center mb-5">Contact Us</h2>

      <div className="mb-5 p-4 border border-solid border-white rounded-md">
        <p>
          Email:{" "}
          <a href="mailto:youremail@example.com">youremail@example.com</a>
        </p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Your Street, City, State, ZIP Code</p>
        <p>
          Business Hours: Monday - Friday: 9 AM - 5 PM | Saturday: 10 AM - 2 PM
          | Sunday: Closed
        </p>
      </div>

      <div className="contact-form">
        <h3>Contact Form</h3>
        <form>
          <label className="block mb-1 font-semibold">
            Name:
            <input
              className="w-full p-3 mb-3 border border-solid border-white rounded-sm focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              required
            />
          </label>
          <label>
            Email:
            <input
              className="w-full p-3 mb-3 border border-solid border-white rounded-sm focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              required
            />
          </label>
          <label>
            Subject:
            <input
              className="w-full p-3 mb-3 border border-solid border-white rounded-sm focus:outline-none focus:border-blue-500"
              type="text"
              name="subject"
              required
            />
          </label>
          <label>
            Message:
            <textarea
              className="w-full p-3 mb-3 border border-solid border-white rounded-sm focus:outline-none focus:border-blue-500"
              name="message"
              required
            ></textarea>
          </label>
          <button className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-600 dark:hover:bg-blue-700" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
