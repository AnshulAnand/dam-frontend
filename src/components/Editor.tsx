'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'
import page from '@/app/new/page.module.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

function RichTextEditor() {
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
  
  return (
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
  )
}

export default RichTextEditor
