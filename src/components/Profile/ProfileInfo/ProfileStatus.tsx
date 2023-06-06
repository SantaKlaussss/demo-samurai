import React, { ChangeEventHandler } from 'react';

type PropsType = {
  status: string
  updateStatus: (newStatus: string) => void
}

type StateType = {
  editMode: boolean,
  status: string
  title: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  state = {
    editMode: false,
    title: 'yo',
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deActivateEditMode = () => {
    this.setState({
      editMode: false,
    })

    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span 
              onDoubleClick={this.activateEditMode}
            >
            {this.props.status || '------'}
            </span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input
              onChange={this.onStatusChange} 
              autoFocus={true} 
              onBlur={this.deActivateEditMode} 
              value={this.state.status}
              placeholder='Статус'
              title='1123'
            ></input>
          </div>
        }
      </div>
    )
  }

}

export default ProfileStatus;
