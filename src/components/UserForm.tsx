import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  FormItem,
  Input,
  Button,
  PanelHeaderBack,
  FormStatus,
  IconButton,
  Div,
} from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';

import { useAgeQuery } from '../hooks/useAgeQuery';

interface UserFormProps {
  id: string;
  setActivePanel: Dispatch<SetStateAction<string>>;
  clearPopout: () => void;
  setLoadingScreenSpinner: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  id,
  setActivePanel,
  clearPopout,
  setLoadingScreenSpinner,
}) => {
  const [newName, setNewName] = useState('');
  const [prevName, setPrevName] = useState('');
  const {
    data: age,
    error,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useAgeQuery(newName);

  const validateName = (name: string) => {
    // kmiakaeva (note): name should be in cyrillic or latin of any register
    const nameRegex = /^[а-я]+$|^[a-z]+$/i;
    const formatName = name.toLowerCase().trim();
    const formatPrevName = prevName.toLowerCase().trim();

    return formatName !== formatPrevName && nameRegex.test(formatName) && !!formatName;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateName(newName)) {
      if (!isLoading) {
        refetch({ throwOnError: true }).catch((err: Error) => console.error(err));
      }

      setPrevName(newName);
    }
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoadingScreenSpinner();
    } else {
      clearPopout();
    }

    let timerId: NodeJS.Timeout;

    if (validateName(newName)) {
      timerId = setTimeout(() => {
        if (!isFetching) {
          refetch({ throwOnError: true }).catch((err: Error) => console.error(err));
        }

        setPrevName(newName);
      }, 3000);
    }

    return () => clearTimeout(timerId);
  }, [isLoading, isFetching, newName, refetch]);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('new-fact')} />}>
        Go to the new fact panel
      </PanelHeader>

      <Group>
        <form onSubmit={onSubmit}>
          <FormItem htmlFor="name" top="Name">
            <Input
              id="name"
              placeholder="Enter new name"
              value={newName}
              after={
                <IconButton
                  hoverMode="opacity"
                  label="Очистить поле"
                  onClick={() => setNewName('')}
                >
                  <Icon16Clear />
                </IconButton>
              }
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </FormItem>

          {isError && (
            <Div>
              <FormStatus header="Error" mode="error">
                {error.message}
              </FormStatus>
            </Div>
          )}

          {isSuccess && (
            <Div>
              <FormStatus mode="default">Age: {age}</FormStatus>
            </Div>
          )}

          <FormItem>
            <Button type="submit" appearance="accent-invariable" size="m">
              Get age!
            </Button>
          </FormItem>
        </form>
      </Group>
    </Panel>
  );
};
