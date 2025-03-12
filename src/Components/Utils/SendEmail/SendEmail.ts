import emailjs from "@emailjs/browser";
export const SendEmail = (
    e : React.FormEvent,
    formRef: React.RefObject<HTMLFormElement>
) => {
    e.preventDefault()
    if(formRef.current){
        emailjs.sendForm("service_grqpcg8","template_eq7kyaw" , formRef.current , "kLjaD0rwsaIaJI6O5")
            .then(
                (result) => {
                    console.log("Email envoyé avec succès", result.text);
                },
                (error) => {
                    console.error("Erreur lors de l'envoi de l'email", error.text);
                }
            );
    }
}