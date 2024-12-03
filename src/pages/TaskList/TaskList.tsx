import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import getTaskList from '../../API/getTaskLIst';
import { TTask } from '../../API';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['taskList'],
      queryFn: ({ pageParam = 1 }) => getTaskList(pageParam),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 10 ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const tasks: TTask[] = data?.pages.flat() ?? [];

  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 235,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: parentRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='tasklist'>
      <div className='tasklist__container container'>
        <div ref={parentRef} className={styles.taskList}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const { id, title, body } = tasks[virtualRow.index];
              return (
                <Card
                  key={id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  header={id + '. ' + title}
                  body={body.slice(0, 80) + '...'}
                  footer={
                    <Button
                      kind='primary'
                      onClick={() => navigate(`/task/${id}`)}
                    >
                      Просмотр
                    </Button>
                  }
                />
              );
            })}
          </div>
          {hasNextPage && (
            <div ref={loadMoreRef} className={styles.taskList__loadMore}>
              {isFetchingNextPage ? <Loader /> : 'Загрузить ещё'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
