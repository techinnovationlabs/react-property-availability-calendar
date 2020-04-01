import React, { Component } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';

import { CHECK_AVAILABILITY } from '../../redux/action/propertyAction';
import { connect } from 'react-redux';

import './base-styles.css';
import './date-picker.css';

interface PropertyProps {
    properties: any[],
    checkAvailabilityDummy: () => void,
    history: any,
    show: any
}

class Property extends Component<PropertyProps> {

    state = {
        properties: ['Park Hyatt Hotel, Las Vegas', 'Tea Estate Villa, New York'],
        selectedProperty: '',
        startDate: new Date(),
        endDate: new Date(),
        message: ''
    }

    constructor(props: Readonly<PropertyProps>) {
        super(props);
        this.handleDate = this.handleDate.bind(this);
        this.checkAvailability = this.checkAvailability.bind(this);
    }

    handleDate = (start: Date, end: Date) => {
        this.setState({ startDate: start, endDate: end });
    }

    isRangeOverlapping = (start1: Date, end1: Date, start2: Date, end2: Date) => {
        var e1start = start1.getTime();
        var e1end = end1.getTime();
        var e2start = start2.getTime();
        var e2end = end2.getTime();
        return ((e1start >= e2start && e1start <= e2end) || (e2start >= e1start && e2start <= e1end));
    }

    checkAvailability = () => {
        const { selectedProperty, startDate, endDate } = this.state;
        let message = null;
        this.props.properties.forEach((property) => {
            if (property.propertyName === selectedProperty) {
                property.bookings.forEach((booking: { startDate: Date; endDate: Date; }) => {
                    if (this.isRangeOverlapping(startDate, endDate, booking.startDate, booking.endDate)) {
                        message = 'Sorry, this property is not available for the selected dates';
                    }
                })
            }
        })
        message = message ? message : 'Hurray, this property is available for the selected dates';
        this.setState({ message: message });
        this.props.checkAvailabilityDummy();
    }

    onPropertyChangeHandler = (event: { target: { value: any; }; }) => {
        this.setState({
            selectedProperty: event.target ? event.target.value : '',
            message: null
        });
    };

    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <label>Property</label>
                    <div>
                        <select value={this.state.selectedProperty} name="selectedProperty" onChange={this.onPropertyChangeHandler} required>
                            <option value="" disabled>Select a property</option>
                            {
                                this.state.properties.map(property => <option key={property} id={property} value={property}>{property}</option>)
                            }
                        </select>
                    </div>
                    <br />
                    <label>Choose your preferrable dates</label>
                    <SimpleReactCalendar mode='range'
                        blockClassName='date_picker'
                        onSelect={(range: { start: Date; end: Date; }) => {
                            this.handleDate(range.start, range.end);
                        }}
                        selected={{
                            start: this.state.startDate,
                            end: this.state.endDate
                        }}
                    />
                </div>
                <br />
                <button className="btn btn-success" onClick={this.checkAvailability}>Check Availability</button>
                <br />
                {this.state.message}
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: (arg0: { type: any; }) => any) => ({
    // Did not really have a need for this method, for this particular requirement
    checkAvailabilityDummy: () => dispatch({ type: CHECK_AVAILABILITY })
});

const mapStateToProps = (state: any) => ({
    properties: state.properties
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);