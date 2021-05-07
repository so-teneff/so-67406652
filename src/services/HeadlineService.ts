import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Headline } from '../models';

export const createHeadline = async (headline: Headline) => {
  try {
    const resp = await axios.post('/headlines', headline);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createHeadline, {
    onSuccess: () => {
      // refetch headlines on success
      queryClient.invalidateQueries('headlines');
    },
  });
};
