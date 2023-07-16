import { AdminTypes, governorates, studyLevels } from '../utils/constants';

export type Governorate = (typeof governorates)[number];
export type StudyLevel = (typeof studyLevels)[number];
export type AdminType = (typeof AdminTypes)[number];

interface WithMognoId {
  _id: string;
}
export interface IUser extends WithMognoId {
  name: string;
  governorate: Governorate;
  phone: string;
  fatherPhone: string;
  level: StudyLevel;
  ips: string[];
  courses: string[];
  password?: string;
}

export interface IAdmin extends WithMognoId {
  name: string;
  email: string;
  type: AdminType;
}

export interface ICourse extends WithMognoId {
  title: string;
  price: number;
  imageUrl: string;
  level: StudyLevel;
}
export interface Ivideo extends WithMognoId {
  title: string;
  url: string;
  imageUrl: string;
  content?: string[];
  courses: ICourse[];
  quality?: number[];
}

export interface IExam extends WithMognoId {
  title: string;
  formId: string;
  prevVid?: string[];
  // nextVid?: string;
  prevCourse?: string[];
}

export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: string[],
  ) {
    super(message);
  }
}

// input types
export interface signupBody {
  name: string;
  governorate: Governorate;
  phone: string;
  fatherPhone: string;
  level: StudyLevel;
  password: string;
  confirmPassword: string;
}

export interface createCourseBody {
  _id?: string;
  title: string;
  price: string;
  level: StudyLevel;
  image: File | undefined;
  imageUrl: string | undefined;
}
export interface createVideoBody {
  _id?: string;
  title: string;
  url: string;
  courses: string[];
  image: File | undefined;
  imageUrl: string | undefined;
  quality?: string;
}
export interface createAdminBody {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: 'main' | 'secondary';
}
export interface loginBody {
  phone: string;
  password: string;
}

export interface createExamBody {
  _id?: string;
  title: string;
  url: string;
  prevVid?: string[];
  // nextVid?: string;
  prevCourse?: string[];
}

// response types
export interface LoggedUser extends IUser {
  token: string;
}
export interface LoggedAdmin extends IAdmin {
  token: string;
}
