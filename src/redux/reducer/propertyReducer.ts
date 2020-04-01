import { CHECK_AVAILABILITY } from '../action/propertyAction';

const initialState = {
    "properties": [
        {
            "propertyName": "Park Hyatt Hotel, Las Vegas",
            "bookings": [
                {
                    "startDate": new Date(2020, 3, 2, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 5, 0, 0, 0, 0)
                },
                {
                    "startDate": new Date(2020, 3, 10, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 15, 0, 0, 0, 0)
                },
                {
                    "startDate": new Date(2020, 3, 21, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 22, 0, 0, 0, 0)
                },
                {
                    "startDate": new Date(2020, 3, 28, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 28, 0, 0, 0, 0)
                }
            ]
        },
        {
            "propertyName": "Tea Estate Villa, New York",
            "bookings": [
                {
                    "startDate": new Date(2020, 3, 1, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 2, 0, 0, 0, 0)
                },
                {
                    "startDate": new Date(2020, 3, 13, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 18, 0, 0, 0, 0)
                },
                {
                    "startDate": new Date(2020, 3, 20, 0, 0, 0, 0),
                    "endDate": new Date(2020, 3, 5, 20, 0, 0, 0)
                }
            ]
        }
    ]
};

function propertyReducer(state = initialState, action: { type: any; }) {
    switch (action.type) {
        case CHECK_AVAILABILITY:
            return Object.assign({}, state, {
                ...state,
            });
        default:
            return state;
    }
}

export default propertyReducer;