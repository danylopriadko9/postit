export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
}

export interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  published: boolean;
  userId: string;
  user: IUser;
  comments?: IComment[];
}

export interface IComment {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: string;
}
