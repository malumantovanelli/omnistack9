import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";
import Search from "./pages/Search";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Book,
    Search
  })
);

export default Routes;
