import "./App.css";
import TextExpander from "./TextExpander";

function App() {
  return (
    <>
      <h1 style={{ textTransform: "uppercase" }}>
        the incredible text expander
      </h1>
      <TextExpander>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam alias
        quas doloremque! Maiores dolores illo nemo quidem laudantium consequatur
        voluptate quasi in, suscipit rem porro alias quo voluptatum commodi
        voluptatibus accusantium aperiam soluta. Voluptate ad incidunt
        voluptatum molestias facilis quidem odio nemo aut possimus non,
        repellendus velit culpa nam officiis.
      </TextExpander>
      <TextExpander
        color="orange"
        wording={["Hit me", "Close me"]}
        wordsCollapsed={30}
        extended
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
        doloribus, voluptate vitae expedita fugiat voluptates iure officia
        asperiores qui quis itaque placeat unde nam eos nesciunt aliquam
        consectetur! Maxime excepturi voluptatem quidem voluptates, quisquam
        consequatur optio consequuntur esse alias quas officiis ipsum velit id
        vero nostrum reprehenderit culpa doloremque quod?
      </TextExpander>
    </>
  );
}

export default App;
