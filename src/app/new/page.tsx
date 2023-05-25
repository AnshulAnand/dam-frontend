import RichTextEditor from '@/components/Editor'
import page from './page.module.css'

const Editor = () => {
  return (
    <section className={`container ${page.section}`}>
      <main className={page.main}>
        <form>
          <RichTextEditor />
          <div className={page.tags}>
            <div>
              <input type='text' placeholder='Tag' />
              <input type='text' placeholder='Tag' />
              <input type='text' placeholder='Tag' />
            </div>
            <div>
              <input type='text' placeholder='Tag' />
              <input type='text' placeholder='Tag' />
              <input type='text' placeholder='Tag' />
            </div>
          </div>
          <div className={page.description}>
            <input type='text' placeholder='Description (optional)' />
          </div>
          <div className={page.btn_container}>
            <button type='submit'>Submit</button>
            <button className={page.cancel_btn}>Cancel</button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default Editor
