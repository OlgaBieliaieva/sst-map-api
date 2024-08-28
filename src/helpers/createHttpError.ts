const messageList: { [key: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

interface HttpError extends Error {
  status: number;
}

const createHttpError = (
  status: number,
  message: string = messageList[status],
): HttpError => {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
};

export default createHttpError;
