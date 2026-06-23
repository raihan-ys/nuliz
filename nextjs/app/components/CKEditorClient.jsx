// CKEditor is called after rendering, because

"use client";

import { useEffect, useState } from 'react';

export default function CKEditorClient(props) {
  const [Loaded, setLoaded] = useState(false);
  const [CKEditorComp, setCKEditorComp] = useState(null);
  const [Editor, setEditor] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      // Import react components and plugins
      import('@ckeditor/ckeditor5-react'),
      import('ckeditor5')
    ])
      .then( ([ckModule, editorModule]) => {
        if (!mounted) return;
        const CK = ckModule.CKEditor || null;
        const E = editorModule.ClassicEditor;
        setCKEditorComp(() => CK);
        setEditor(() => E);
        
        // Import CSS
        try { import('ckeditor5/ckeditor5.css'); } catch (e) {}
        setLoaded(true);
      })
      .catch(() => {
        // Ignore load errors here, component will remain empty
      });

    return () => { mounted = false; };
  }, []);

  if (!Loaded || !CKEditorComp || !Editor) return null;

  const CK = CKEditorComp;
  const ClassicEditor = Editor;
  return <CK editor={ClassicEditor} {...props} />;
}
