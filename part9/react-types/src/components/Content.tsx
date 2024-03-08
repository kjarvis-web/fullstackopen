import { CoursePart } from '../types';
import Part from './Part';

interface Props {
  courseParts: CoursePart[];
}

const Content = (props: Props) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
