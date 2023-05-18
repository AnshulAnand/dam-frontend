import RichTextEditor from '@/components/Editor'
import page from './page.module.css'

const Editor = () => {
  return (
    <section className={`container ${page.section}`}>
      <main className={page.main}>
        <RichTextEditor />
      </main>
      <div className={page.btn_container}>
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    </section>
  )
}

export default Editor
