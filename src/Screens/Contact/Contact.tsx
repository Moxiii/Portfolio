import emailjs from "@emailjs/browser";
import { useRef, JSX } from "react";
import "./Contact.scss";

export default function Contact(): JSX.Element {
  const refForm = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (refForm.current) {
      emailjs
        .sendForm(
          "service_grqpcg8",
          "template_eq7kyaw",
          refForm.current,
          "kLjaD0rwsaIaJI6O5"
        )
        .then(
          (result) => {
            console.log("Email envoyé avec succès", result.text);
          },
          (error) => {
            console.error("Erreur lors de l'envoi de l'email", error.text);
          }
        );
    }
  };

  return (
    <div className="container contact-page">
      <div className="text-zone">
        <div className="header">
          <h1>Contactez-moi</h1>
        </div>

        <div className="contact-form">
          <form ref={refForm} onSubmit={sendEmail}>
            <input
              className="feedback-body__email"
              type="email"
              placeholder="Email"
              name="user_email"
              required
            />
            <input
              className="feedback-body__email"
              type="text"
              placeholder="Subject"
              name="user_subject"
              required
            />
            <textarea
              className="feedback-body__message"
              placeholder="Message"
              name="user_message"
              required
            ></textarea>
            <button className="feedback-body__submit" type="submit">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
