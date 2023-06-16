import React, { useState, useEffect } from 'react';

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status);

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  let activateEditMode = () => {
    setEditMode(true)
  }

  let deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  let onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span 
            onDoubleClick={activateEditMode}
          > <b>Status:</b> {props.status || '------'}
          </span>
        </div>
      }
      {editMode &&
        <div>
          <input 
            autoFocus={true} 
            onBlur={deActivateEditMode} 
            value={status} 
            onChange={onStatusChange}
            placeholder='placeholder'
          ></input>
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks;
