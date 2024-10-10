import './Contact.scss';

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="header">Contact Us</h2>

      <div className="contact-info">
        <p>Email: <a href="mailto:youremail@example.com">youremail@example.com</a></p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Your Street, City, State, ZIP Code</p>
        <p>Business Hours: Monday - Friday: 9 AM - 5 PM | Saturday: 10 AM - 2 PM | Sunday: Closed</p>
      </div>

      <div className="contact-form">
        <h3>Contact Form</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Subject:
            <input type="text" name="subject" required />
          </label>
          <label>
            Message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
