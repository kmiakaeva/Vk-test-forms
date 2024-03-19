import { createRoot } from 'react-dom/client';
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';

import App from './App.tsx';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);
