import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import { useEffect, useState } from "react";
import axios from "axios";
import { CanceledError } from "axios";

interface User {
  name: string;
  id: number;
}

function App() {
  let items = ["Delhi", "Mumbai", "Varanasi", "Pune"];
  const [alertVisible, setAlertVisibility] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleSelect = (item: string) => {
    console.log(item);
    window.open(`https://www.google.com/search?q=${item}`, "_blank");
  };
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        } else {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <ListGroup items={items} heading="City Names" onSelect={handleSelect} />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}> My Alert</Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
      <div className="mt-4">
        {isLoading && <div className="spinner-border m-5"></div>}
        {error && <p className="text-danger">{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
