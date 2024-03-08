import { CoursePart, assertNever } from '../types';

interface Part {
  part: CoursePart;
}

const Part = ({ part }: Part) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em>
          </p>
          <p>required skills:{part.requirements.map((skill) => ` ${skill}`)}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
