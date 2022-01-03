import {NextPage} from "next";
import Head from "next/head";
import {FormEvent, useRef} from "react";
import {toast} from "react-toastify";

import {Title} from "../components";
import cs from "./contact.module.scss";

const ContactPage: NextPage = () => {
  const form = useRef<HTMLFormElement>(null);

  function submit(evt: FormEvent) {
    if (!form.current) return;
    evt.preventDefault();

    const resetForm = form.current.reset.bind(form.current);
    const body = new URLSearchParams(
      Array.from(new FormData(form.current).entries()).map(entry => [entry[0], entry[1].toString()]),
    );

    const submitForm = fetch("/", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: body.toString(),
    }).then(res => {
      console.debug(res);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      resetForm();
    });

    toast.promise(submitForm, {
      pending: "Envoi du message en cours…",
      success: "Message envoyé avec succès",
      error: "Une erreur est survenue lors de l'envoi du message",
    });
  }

  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>
        Nous <strong>contacter</strong>
      </Title>

      <form
        ref={form}
        className={cs.form}
        name="contact"
        method="POST"
        data-netlify="true"
        action="/"
        onSubmit={submit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label className={cs.label}>
            Email: <input className={cs.field} type="email" name="email" required />
          </label>
        </p>
        <p>
          <label className={cs.label}>
            Message: <textarea className={cs.field} name="message" rows={10} required></textarea>
          </label>
        </p>
        <p className={cs.submit}>
          <button className={cs.submitBtn} type="submit">
            Envoyer
          </button>
        </p>
      </form>
    </>
  );
};

export default ContactPage;
