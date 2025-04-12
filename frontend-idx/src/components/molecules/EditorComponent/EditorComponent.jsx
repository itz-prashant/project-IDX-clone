import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';


const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null
    })

    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula', editorState.theme)
        monaco.editor.setTheme('dracula');
    }

    useEffect(()=>{
        fetch('/Dracula.json')
        .then(response => response.json())
        .then((data)=> setEditorState({
            ...editorState,
            theme: data
        }))
    })

  return (
   <>
    {editorState.theme && 
    <Editor 
        height={'80vh'}
        width={'100%'}
        defaultLanguage='javascript'
        defaultValue='// Welcome to playground'
        options={{
            fontSize: 18,
            fontFamily: 'monospace'
        }}
        onMount={handleEditorTheme}
    />}
   </>
  )
}

export default EditorComponent
