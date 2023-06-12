'use client'

import page from './page.module.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { usePostArticle } from '@/lib/article'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

const New = () => {
  const { triggerPostArticle, postArticleError } = usePostArticle()

  const [title, setTitle] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')
  const [tag3, setTag3] = useState('')
  const [tag4, setTag4] = useState('')
  const [tag5, setTag5] = useState('')
  const [tag6, setTag6] = useState('')
  const [description, setDescription] = useState('')

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const [convertedContent, setConvertedContent] = useState<null | string>(null)

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = DOMPurify.sanitize(draftToHtml(rawContentState))
    setConvertedContent(markup)
  }, [editorState])

  console.log(convertedContent)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostArticle({
        body: {
          title,
          body: convertedContent,
          description,
          tags: [tag1, tag2, tag3, tag4, tag5, tag6],
        },
      })
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  return (
    <section className={`container ${page.section}`}>
      <main className={page.main}>
        <form onSubmit={handleSubmit}>
          <div className={page.title}>
            <input
              type='text'
              placeholder='Title'
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          {/*<RichTextEditor />*/}
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName={page.wrapper_class}
            editorClassName={page.editor_class}
            toolbarClassName={page.toolbar_class}
            toolbar={{
              options: [
                'inline',
                'blockType',
                'list',
                'link',
                'embedded',
                'emoji',
                'image',
                'history',
              ],
            }}
          />
          <div className={page.tags}>
            <div>
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag1(e.target.value)}
              />
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag2(e.target.value)}
              />
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag3(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag4(e.target.value)}
              />
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag5(e.target.value)}
              />
              <input
                type='text'
                placeholder='Tag'
                onChange={e => setTag6(e.target.value)}
              />
            </div>
          </div>
          <div className={page.description}>
            <input
              type='text'
              placeholder='Description (optional)'
              onChange={e => setDescription(e.target.value)}
            />
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

export default New
