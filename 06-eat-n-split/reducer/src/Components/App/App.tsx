import { AppProvider } from "../../context/AppProvider";
import People from "../People/People";
import AddFriend from "../AddFriend/AddFriend";
import Summary from "../Summary/Summary";
import BillForm from "../BillForm/BillForm";
import "./app.css";

function App() {
  return (
    <AppProvider>
      <div className="app">
        <div className="left">
          <People />

          <AddFriend />

          <Summary />
        </div>

        <BillForm />
      </div>
    </AppProvider>
  );
}

export default App;
