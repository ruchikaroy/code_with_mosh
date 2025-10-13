import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["Delhi", "Mumbai", "Varanasi", "Pune"];

  const handleSelect = (item: string) => {
    console.log(item);
    window.open(`https://www.google.com/search?q=${item}`, "_blank");
  };
  return (
    <>
      <ListGroup items={items} heading="City Names" onSelect={handleSelect} />
      <Button color="primary">My Button</Button>
    </>
  );
}

export default App;
