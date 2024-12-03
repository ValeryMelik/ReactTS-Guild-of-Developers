import styles from './TaskDetails.module.scss';

import { FC } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { TTask } from '../../API';
import getTaskDetail from '../../API/getTaskDetail';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

const TaskDetails: FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    data: task,
    isLoading,
    isSuccess,
  } = useQuery<TTask, Error>({
    queryFn: () => getTaskDetail(Number(taskId)),
    queryKey: ['taskDetail', 'taskList'],
    enabled: !!taskId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.taskDetails}>
      <div className='taskdDetail__container container'>
        {isLoading && <Loader />}{' '}
        {isSuccess && task && (
          <Card
            header={task.title}
            body={task.body}
            footer={
              <Button
                kind='primary'
                onClick={(): void | Promise<void> => navigate(-1)}
              >
                Назад
              </Button>
            }
          />
        )}
      </div>
    </div>
  );

  return null;
};

export default TaskDetails;
