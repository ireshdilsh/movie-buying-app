export interface Comment {
    comment(comment: Comment): unknown;
    id: string;
    movieId: string;
    name: string;
    content: string;
    createdAt?: Date;
}