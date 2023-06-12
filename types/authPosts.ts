import { IPost } from './post';

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  posts: IPost[];
}
