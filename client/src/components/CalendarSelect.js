import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

//renders the selectable calendars for user input
class CalendarSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
    };
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.props.handleDayClick}
          disabledDays={this.props.disabled}
        />
      </div>
    );
  }
}

export default CalendarSelect