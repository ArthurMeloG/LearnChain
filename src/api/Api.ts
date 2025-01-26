import Course from "./Course";
import Topic from "@/api/Topic";
import Content from "@/api/Content";
import ContentData from "@/api/ContentData";
import Auth from "@/api/Auth";

const Api = {
    course: Course,
    topic: Topic,
    content: Content,
    contentData: ContentData,
    auth: Auth
};

export default Api;