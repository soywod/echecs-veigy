import {NextPage} from "next";
import Head from "next/head";

import {Title} from "../components";
import cs from "./contact.module.scss";

const ContactPage: NextPage = () => {
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
        className={cs.form}
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
        netlify-honeypot="name"
      >
        <p className={cs.name}>
          <label className={cs.label}>
            Nom: <input name="name" />
          </label>
        </p>
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
        <div data-netlify-recaptcha="true" />
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
