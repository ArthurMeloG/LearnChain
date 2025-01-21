import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';

const editor = new EditorJS({
    tools: {
        header: Header,
        linkTool: {
            class: LinkTool,
            config: {
                endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
            }
        },
        raw: RawTool,
        image: SimpleImage,
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            },
        },
        embed: Embed,
        quote: Quote,
    },
});

export default editor;