import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

export const TextEditor = () => {
  return (
    <Editor
  apiKey="bri9cdlb2m72saupxktpz5bbv8cyk8ou9uq7qsdxgzzpo6jm"
  onInit={(_evt, editor) => (editorRef.current = editor)}
  initialValue="<p>This is the initial content of the editor.</p>"
  init={{
    height: 500,
    width: 700,
    menubar: true,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'paste',
      'help',
      'wordcount',
      'textpattern',
      'fontsize'
    ],
    toolbar: [
      'undo redo |',

      'formatselect |',

      'fontsizeselect |',

      'bold italic underline strikethrough |',

      'forecolor backcolor |',

      'alignleft aligncenter alignright alignjustify |',

      'bullist numlist outdent indent |',

      'link image media |',

      'removeformat |',

      'code |',

      'help'
    ].join(' '),

    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }}
/>

  )
}
