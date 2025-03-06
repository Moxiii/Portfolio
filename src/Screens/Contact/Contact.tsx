import emailjs from "@emailjs/browser";
import { useRef, JSX } from "react";
import s from "./Contact.module.scss";
import cn from "clsx";

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
    <div className={s.contactPage}>
      <div className="text-zone">
        <div className={s.header}>
          <h1>Contactez-moi</h1>
        </div>

        <div className={s.contactFormContainer}>
          <form ref={refForm} onSubmit={sendEmail} className={s.contactForm}>
            <input
              className={cn(s.contactEmailInput)}
              type="email"
              placeholder="Email"
              name="user_email"
              required
            />
            <input
                className={cn(s.contactSubjectInput)}
              type="text"
              placeholder="Subject"
              name="user_subject"
              required
            />
            <textarea
                className={cn(s.contactTextInput)}
              placeholder="Message"
              name="user_message"
              required
            ></textarea>
            <button className={cn(s.contactSendButton)} type="submit">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
