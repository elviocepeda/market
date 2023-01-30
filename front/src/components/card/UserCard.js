import "./UserCard.css";

export const UserCard = ({
  user = {},
  handleDelete,
  setDataToEdit,
}) => {
  const { id, uuid, name, email, phone } = user;

  return (
    <div key={uuid} className="user_card_wrapper">
      <div className="user_card_avatar">
        <div className="user_card_avatar_circle">E</div>
      </div>
      <div className="user_card_info">
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <div className="user_card_actions">
        <button onClick={() => setDataToEdit(user)}>Editar</button>
        <button onClick={() => handleDelete(id)}>Eliminar</button>
      </div>
    </div>
  );
};
