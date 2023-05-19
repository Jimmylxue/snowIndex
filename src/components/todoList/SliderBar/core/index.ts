import dayjs from 'dayjs';

export function getTimeByIndex(timeIndex: number) {
  let startTime = 0,
    endTime = 0;
  switch (timeIndex) {
    case 0:
      startTime = dayjs().startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
    case 1:
      startTime = dayjs().subtract(1, 'day').startOf('D').valueOf();
      endTime = dayjs().subtract(1, 'day').endOf('D').valueOf();
      return [startTime, endTime];
    case 2:
      startTime = dayjs().subtract(7, 'day').startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
  }
  return [startTime, endTime];
}

export function getStatusByIndex(status: number) {
  return { status };
}

export function getTaskTypeByIndex(
  index: number,
  taskTypeList: { taskType: number }[],
) {
  return {
    taskType: taskTypeList[index].taskType,
  };
}
