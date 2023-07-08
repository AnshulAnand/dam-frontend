import page from './page.module.css'

export default function Contact() {
  return (
    <section className={page.section}>
      <h1>Contact us</h1>
      <main>
        {/* first column */}
        <div>
          <div>
            <h2>Advertisement</h2>
            <p>
              Want to advertise on our platform? Contact us and our team will
              reach out to you within a week.
            </p>
          </div>
          <a href={`mailto:${process.env.NEXT_PUBLIC_AD_CONTACT_EMAIL}`}>
            Contact
          </a>
        </div>
        {/* second column */}
        <div>
          <div>
            <h2>Help & Support</h2>
            <p>
              Want help regarding anything related to DAM or your account? Our
              support team is always here to help and guide you.
            </p>
          </div>
          <a href={`mailto:${process.env.NEXT_PUBLIC_HELP_CONTACT_EMAIL}`}>
            Contact
          </a>
        </div>
        {/* third column */}
        <div>
          <div>
            <h2>General Queries</h2>
            <p>
              Have some questions you want answers for? Our team will love to
              help you out.
            </p>
          </div>
          <a href={`mailto:${process.env.NEXT_PUBLIC_GENERAL_CONTACT_EMAIL}`}>
            Contact
          </a>
        </div>
      </main>
    </section>
  )
}
