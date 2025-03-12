import {SendEmail} from "../../Components/Utils/SendEmail/SendEmail.ts"
import { useRef, JSX } from "react";
import s from "./Contact.module.scss";
import cn from "clsx";

export default function Contact(): JSX.Element {
  const refForm = useRef<HTMLFormElement>(null);


  return (
    <div className={s.contactPage}>
      <div className="text-zone">
        <div className={s.header}>
          <h1>Contactez-moi</h1>
        </div>

        <div className={s.contactFormContainer}>
          <form ref={refForm} onSubmit={(e)=> SendEmail(e,refForm)} className={s.contactForm}>
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
