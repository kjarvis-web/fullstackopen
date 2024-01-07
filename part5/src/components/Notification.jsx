const Notification = ({ added, message }) => {
  const stylesAdded = {
    color: "green",
    fontSize: 32,
    border: "green solid 4px",
    marginBottom: 16,
    borderRadius: "5px",
    background: "silver",
    padding: 4,
  };

  const stylesError = {
    color: "red",
    fontSize: 32,
    border: "red solid 4px",
    marginBottom: 16,
    borderRadius: "5px",
    background: "silver",
    padding: 4,
  };

  if (message === null) return null;

  return (
    <div style={added ? stylesAdded : stylesError} className="notification">
      {message}
    </div>
  );
};

export default Notification;
