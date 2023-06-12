import { DialogType, MessageType } from "../types/types";
import { InferActionsTypes } from "./redux-store";

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrew' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Viktor' },
    { id: 6, name: 'Valera' }
  ] as Array<DialogType>
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case "SEND-MESSAGE":
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }]
      };
    default:
      return state
  }
}

type ActionsTypes = InferActionsTypes<typeof actionsDialogs>

export const actionsDialogs = {
  sendMessageCreator: (newMessageBody: string) => ({ type: 'SEND-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;
