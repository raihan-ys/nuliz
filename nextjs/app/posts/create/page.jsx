"use client";

import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
	const cloud = useCKEditorCloud({ version: '48.2.0' });

  // Get client's token
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // CKEditor Liscense Key
  const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Nzk2NjcxOTksImp0aSI6IjhmYmY2NmViLTA4OTMtNGI3Mi04Yzk0LTU3MzMyMWY2Mzk5OCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiNWNhZDJlODQifQ.eRDOeGJD1y60LUotnVU98WEQESch4KmexAmdnRNtASQgnLbAKsTt9SccSwJprMgOo7KqLjydVUPwhg2ujGHRHA';

  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      router.replace('/login');
      return;
    }
  }, [router]);

  useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Alignment,
			AutoImage,
			Autoformat,
			Autosave,
			ImageBlock,
			BlockQuote,
			Bold,
			CloudServices,
			Code,
			CodeBlock,
			Emoji,
			Essentials,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Fullscreen,
			GeneralHtmlSupport,
			Heading,
			Highlight,
			HorizontalLine,
			HtmlComment,
			ImageCaption,
			ImageEditing,
			ImageInsertViaUrl,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			ImageUtils,
			ImageInline,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			Mention,
			Paragraph,
			ShowBlocks,
			SourceEditing,
			Strikethrough,
			Style,
			Subscript,
			Superscript,
			Table,
			TableCaption,
			TableToolbar,
			TextTransformation,
			TodoList,
			Underline
		} = cloud.CKEditor;

		return {
			ClassicEditor,
			editorConfig: {
				root: {
					placeholder: 'Tulis ceritamu disini...',
				},
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'sourceEditing',
						'showBlocks',
						'fullscreen',
						'|',
						'heading',
						'style',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'subscript',
						'superscript',
						'code',
						'|',
						'emoji',
						'horizontalLine',
						'link',
						'insertTable',
						'highlight',
						'blockQuote',
						'codeBlock',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					Autoformat,
					AutoImage,
					Autosave,
					BlockQuote,
					Bold,
					CloudServices,
					Code,
					CodeBlock,
					Emoji,
					Essentials,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Fullscreen,
					GeneralHtmlSupport,
					Heading,
					Highlight,
					HorizontalLine,
					HtmlComment,
					ImageBlock,
					ImageCaption,
					ImageEditing,
					ImageInline,
					ImageInsertViaUrl,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					ImageUtils,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					Mention,
					Paragraph,
					ShowBlocks,
					SourceEditing,
					Strikethrough,
					Style,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline
				],
				licenseKey: LICENSE_KEY,
				fontFamily: {
					supportAllValues: true
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-style',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				htmlSupport: {
					allow: [
						{
							name: /^.*$/,
							styles: true,
							attributes: true,
							classes: true
						}
					]
				},
				image: {
					toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
				},
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				style: {
					definitions: [
						{
							name: 'Article category',
							element: 'h3',
							classes: ['category']
						},
						{
							name: 'Title',
							element: 'h2',
							classes: ['document-title']
						},
						{
							name: 'Subtitle',
							element: 'h3',
							classes: ['document-subtitle']
						},
						{
							name: 'Info box',
							element: 'p',
							classes: ['info-box']
						},
						{
							name: 'CTA Link Primary',
							element: 'a',
							classes: ['button', 'button--green']
						},
						{
							name: 'CTA Link Secondary',
							element: 'a',
							classes: ['button', 'button--black']
						},
						{
							name: 'Marker',
							element: 'span',
							classes: ['marker']
						},
						{
							name: 'Spoiler',
							element: 'span',
							classes: ['spoiler']
						}
					]
				},
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
				}
			}
		};
	}, [cloud, isLayoutReady]);

  // Handle post submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content}),
      });

      if (!res.ok) throw new Error(String(res.status));

      // Redirect to submitted post details' page
      const data = await res.json();
      setMessage({ type: 'success', text: 'Tulisan selesai!' });
      router.push(`/posts/${data.id}`);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <header className="mb-6 flex flex-col items-center">
          <Image src="/images/writingPoster.png" alt="create post banner" width={120} height={80} />
          <h1 className="mt-4 text-2xl font-bold">Postingan Baru</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Judul</span>
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Judul tulisanmu..."
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Konten</span>
            </label>
            <div className="main-container">
              <div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-fullscreen">
                <div className="editor-container__editor">
                  {ClassicEditor && editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="btn rounded-full bg-black text-white px-6 py-2 hover:bg-white hover:text-black" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-3 rounded ${message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
