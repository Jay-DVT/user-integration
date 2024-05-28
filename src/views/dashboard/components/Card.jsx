/* eslint-disable react/prop-types */

const Card = ({ user }) => {

  const handleClick = () => {
    console.log("User: ", user.id);
  }

  return (
    <div className="border-2 border-black w-full p-2 rounded-md text-center" onClick={handleClick}>
      <div>{user.name}{user.email}</div>
    </div>
  );
};

export default Card;
