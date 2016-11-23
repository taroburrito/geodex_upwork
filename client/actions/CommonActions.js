export const Handle_Message = 'Handle_Message';
export const Handle_Success_Message = 'Handle_Success_Message';
export const Handle_Error_Message = 'Handle_Error_Message';

export function handleMessage(data){
  return{type: Handle_Message}
}
export function handleSuccessMessage(success){
  return{type: Handle_Success_Message, success:success}
}
export function handleErrorMessage(error){
  return{type: Handle_Error_Message, error:error}
}
