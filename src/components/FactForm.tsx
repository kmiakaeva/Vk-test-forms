import React, { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react';
import {
  Panel,
  PanelHeader,
  FormItem,
  Textarea,
  Button,
  PanelHeaderBack,
  Group,
  FormStatus,
  Div,
} from '@vkontakte/vkui';

import { useFactQuery } from '../hooks/useFactQuery';

interface FactFormProps {
  id: string;
  setActivePanel: Dispatch<SetStateAction<string>>;
  clearPopout: () => void;
  setLoadingScreenSpinner: () => void;
}

export const FactForm: React.FC<FactFormProps> = ({
  id,
  setActivePanel,
  clearPopout,
  setLoadingScreenSpinner,
}) => {
  const { data, error, isError, isLoading, isFetching, refetch } = useFactQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   *  note (kmiakaeva):
   * - A symbol from the list: [\s.,;:!?]
   * - or
   * - A sequence that starts with a space but doesn't contain any spaces: (?<=\s)[^\s]
   */
  const setCursorAfterFirstWord = () => {
    if (!textareaRef.current) {
      return;
    }

    const value = textareaRef.current.value;
    const match = value.match(/[\s.,;:!?]|(?<=\s)[^\s]/);
    const cursorPosition = match ? match.index : value.length;

    if (cursorPosition) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoadingScreenSpinner();
    } else {
      clearPopout();
    }

    if (data && textareaRef.current) {
      textareaRef.current.value = data.fact;
      setCursorAfterFirstWord();
    }
  }, [isLoading, isFetching, data]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch({ throwOnError: true }).catch((err: Error) => console.error(err));
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('new-age')} />}>
        Go to the age getting panel
      </PanelHeader>

      <Group>
        <form onSubmit={onSubmit}>
          <FormItem htmlFor="fact" top="Fact">
            <Textarea id="fact" getRef={textareaRef} placeholder="There will be a fact here..." />
          </FormItem>

          {isError && (
            <Div>
              <FormStatus header="Error" mode="error">
                {error.message}
              </FormStatus>
            </Div>
          )}

          <FormItem>
            <Button type="submit" size="m" appearance="accent-invariable">
              Get new fact!
            </Button>
          </FormItem>
        </form>
      </Group>
    </Panel>
  );
};
