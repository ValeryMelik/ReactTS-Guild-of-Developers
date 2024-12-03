import axios from 'axios';
import { BASE_URL, TTask } from '.';

const getTaskDetail = async (taskId: number): Promise<TTask> => {
  const response = await axios.get(BASE_URL + `/${taskId}`);
  return response.data;
};

export default getTaskDetail;
