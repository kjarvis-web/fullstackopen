export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

interface CoursePartBasic extends CoursePartBase {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartBase {
  kind: 'special';
  requirements: string[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
