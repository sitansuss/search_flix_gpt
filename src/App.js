import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";

// Import the dotenv library and configure it to load environment variables


function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
