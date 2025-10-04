import type { FC } from "react";
import HomePage from "./HomePage";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div>
      {/* <IndividualRoom /> */}
      <HomePage />
    </div>
  );
};

export default App;
