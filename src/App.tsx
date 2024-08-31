import { FluentProvider, webLightTheme } from '@fluentui/react-components';import './App.css';
import { Drawer} from './components/layout/nav';
import { navItems } from './custome';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Drawer items={navItems}/>
    </FluentProvider>
  );
}

export default App;
