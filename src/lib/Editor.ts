import EditorJS from "@editorjs/editorjs";

class Editor {

    private editor: any;
    private header: any;
    private list: any;
    private table: any;
    private data: any

    private async getImports(): Promise<void> {
        this.editor = new (await import("@editorjs/editorjs")).default;
        this.header = (await import("@editorjs/header")).default;
        this.table = (await import("@editorjs/table")).default;
        this.list = (await import("@editorjs/list")).default;

        this.editor = new EditorJS({
            holder: "editorjs",
            tools: {
                header: this.header,
                list: this.list,
                table: this.table,
            }
        })
    }

    constructor() {
        this.getImports().then(r => r);
    }

}

export default Editor;