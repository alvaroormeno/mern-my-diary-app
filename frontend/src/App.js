
import Layout from './container/Layout';

import {GlobalProvider} from "./context/GlobalContext.js"

function App() {
  return (
      <GlobalProvider>
        <Layout />
      </GlobalProvider>
  );
}

export default App;
