import React from 'react';
import userEvent from '@testing-library/user-event';
import { createHeadline } from '../../services/HeadlineService';
import { HeadlineDetail } from './HeadlineDetail';
import { render, waitFor } from '@testing-library/react';

const handleStartNewItem = jest.fn();
const handleItemSelected = jest.fn();
const handleItemUpdated = jest.fn();

// ---- mock createHeadline ----
jest.mock('../../services/HeadlineService');

const headline = {
  title: 'My headline',
  attribution: 'My attribution',
  teaser: 'My teaser',
};

describe('<HeadlineDetail />', () => {
  test('allows to add a new item', async () => {
    const selectionState = { isNew: true, itemId: '', version: 0 };

    const { getByText, getByLabelText } = render(
      <HeadlineDetail
        selectionState={selectionState}
        onStartNewItem={handleStartNewItem}
        onItemSelected={handleItemSelected}
        onItemUpdated={handleItemUpdated}
      />
    );

    // add a new item
    userEvent.type(getByLabelText('Title'), headline.title);
    userEvent.type(getByLabelText('Attribution'), headline.attribution);
    userEvent.type(getByLabelText('Teaser'), headline.teaser);
    userEvent.click(getByText('Add'));

    // expect createHeadline() to be called
    await waitFor(() => expect(createHeadline).toHaveBeenCalledTimes(1));

    // expect handleStartNewItem() to be called to start adding new item
    await waitFor(() => expect(handleStartNewItem).toHaveBeenCalledTimes(1));
  });
});
