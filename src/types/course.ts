export interface CourseTopic {
    id: string;
    title: string
    subtitle: string
    description: string
    author: string
    date: string
    duration: string
    views: string
    courseId: string
}

export interface Course {
    id: string;
    title: string
    subtitle: string
    description: string
    author: string
    date: string
    duration: string
    views: string
}

export interface CourseContent {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    topicId: string;
}

