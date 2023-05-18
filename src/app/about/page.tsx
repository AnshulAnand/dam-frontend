import Link from 'next/link'
import page from './page.module.css'

const About = () => {
  return (
    <section className={page.section}>
      <h1>Welcome to DAM!</h1>
      <main className={page.main}>
        <img
          className={page.image}
          src='/images/about_goku.png'
          alt='Goku says Hello'
        />
        <p>
          DAM is a place where comic, anime, and game enthusiasts can connect,
          explore, and share their passion. Our mission is to provide a platform
          for creators and fans alike to come together and celebrate the art,
          storytelling, and creativity that comics, anime, and games offer
          offer.
        </p>
        <p>
          Our team is dedicated to curating the best content, news, reviews, and
          insights on the world of comics, anime, and games. We strive to
          provide a welcoming and inclusive community where all are welcome to
          express their opinions, share their stories, and learn from one
          another.
        </p>
        <p>
          DAM is more than just a platform; it is a community of passionate fans
          and creators. We invite you to join us and explore the world of
          comics, anime, and games together.
        </p>
        <p>
          Thank you for visiting DAM. If you have any questions, comments, or
          suggestions, please do not hesitate to reach out to us. We look
          forward to connecting with you!
        </p>
        <p>
          <Link href='/sign-up'>Make an account</Link> and start writing about your
          favourite show or comic, engage with alike fans, share your thoughts
          and make friends!
        </p>
      </main>
    </section>
  )
}

export default About