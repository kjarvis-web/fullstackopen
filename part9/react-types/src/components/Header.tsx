interface CourseName {
  name: string;
}

const Header = (courseName: CourseName) => {
  return <h1>{courseName.name}</h1>;
};

export default Header;
