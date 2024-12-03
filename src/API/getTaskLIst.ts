import axios from 'axios';
import { BASE_URL, TTask } from '.';

const getTaskList = async (page: number): Promise<TTask[]> => {
  const response = await axios.get(BASE_URL, {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  return response.data;
};

export default getTaskList;
