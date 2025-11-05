import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import { useState } from "react";
import type { User } from "./services/user-service";
import userService from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  let items = ["Delhi", "Mumbai", "Varanasi", "Pune"];
  const [alertVisible, setAlertVisibility] = useState(false);

  const handleSelect = (item: string) => {
    console.log(item);
    window.open(`https://www.google.com/search?q=${item}`, "_blank");
  };
  const { users, error, isLoading, setError, setUsers } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => user.id !== u.id));
    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((error) => {
        setError(error.messsage);
        setUsers(originalUsers);
      });
  };
  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + "!" };
    const originalUsers = [...users];
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      <ListGroup items={items} heading="City Names" onSelect={handleSelect} />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}> My Alert</Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
      <div className="mt-4 ">
        {isLoading && <div className="spinner-border m-5"></div>}
        <button className="btn btn-primary my-5" onClick={() => addUser()}>
          Add
        </button>
        {error && <p className="text-danger">{error}</p>}
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={user.id}
            >
              {user.name}
              <div>
                <button
                  className="btn btn-outline-danger mx-2"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
