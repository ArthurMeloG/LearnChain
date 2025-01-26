import EditorJS from "@editorjs/editorjs";
import {CourseContent, CourseTopic} from "@/types/course";
import Api from "@/api/Api";

export  class Editor {

    private readonly editor: EditorJS;
    private content: CourseContent;
    private topic: CourseTopic;

    public constructor(editor: EditorJS, content: CourseContent, topic: CourseTopic) {
        this.editor = editor;
        this.content = content;
        this.topic = topic;
    }

    public async saveContent() {
        try {
            const contentData = await this.editor.save();
            const newContent = {
                topic: this.topic.id,
                content: this.content.id,
                data: contentData,
            };

            const content = await Api.contentData.fetchContentDataById(this.content.id);

            if(content.id) {
                console.log("UPDATE");
                await Api.contentData.updateContentData(this.content.id, newContent);
            }
            else {
                console.log("INSERT");
                const response = await Api.contentData.createContentData(newContent);
                console.log(response);
            }

        } catch (e) {
            console.error("Erro ao salvar conteúdo:", e);
        }
    }

    public async getContent () {
        try {
            return await Api.contentData.fetchContentDataById(this.content.id);
        } catch (error) {
            console.error("Erro ao buscar conteúdo:", error);
            return null;
        }
    }
}