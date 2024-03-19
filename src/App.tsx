import React, { useState } from 'react';
import { AppRoot, SplitLayout, PanelHeader, SplitCol, View, ScreenSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FactForm } from './components/FactForm';
import { UserForm } from './components/UserForm';

const client = new QueryClient();

const App: React.FC = () => {
  const [activePanel, setActivePanel] = React.useState('new-fact');
  const [popout, setPopout] = useState<React.JSX.Element | null>(null);

  const clearPopout = () => setPopout(null);

  const setLoadingScreenSpinner = () => {
    setPopout(<ScreenSpinner state="loading" />);
  };

  return (
    <QueryClientProvider client={client}>
      <AppRoot>
        <SplitLayout
          header={<PanelHeader delimiter="none" />}
          popout={popout}
          aria-live="polite"
          aria-busy={!!popout}
        >
          <SplitCol autoSpaced>
            <View activePanel={activePanel}>
              <FactForm
                id="new-fact"
                setActivePanel={setActivePanel}
                clearPopout={clearPopout}
                setLoadingScreenSpinner={setLoadingScreenSpinner}
              />
              <UserForm
                id="new-age"
                setActivePanel={setActivePanel}
                clearPopout={clearPopout}
                setLoadingScreenSpinner={setLoadingScreenSpinner}
              />
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </QueryClientProvider>
  );
};

export default App;
