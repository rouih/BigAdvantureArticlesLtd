export type ArticleType = {
    title: string;
    body: string;
    author: string;
}

export type CommentType = {
    text: string;
    userId: string;
    articleId: string;
}

export type UserType = {
    username: string;
    full_name: string;
    token?: string;
}