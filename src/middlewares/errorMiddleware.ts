import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  // cast da mensagem de erro para uma chave do Enum ErrorTypes
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  // a mensagem acessa um erro do catálogo se ela não for uma chave docatálogo "mappedError" vai retornar undefined e não entrar no "if"
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message });
  }
  // console.error(err);
  return res.status(500).json({ message: `${err.message}` });
};

export default errorHandler;