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
    </>
  );
}

export default App;
