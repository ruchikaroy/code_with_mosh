import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import { useState } from "react";

function App() {
  let items = ["Delhi", "Mumbai", "Varanasi", "Pune"];
  const [alertVisible, setAlertVisibility] = useState(false);

  const handleSelect = (item: string) => {
    console.log(item);
    window.open(`https://www.google.com/search?q=${item}`, "_blank");
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
    </>
  );
}

export default App;
