const customerJson = [
    {
        "name": "Eric Food Supplier",
        "warehouses": [
            {
                "id" : 1,
                "name": "Alpha",
                "state": "Texas",
                "location": {
                    "lat": 40.854885,
                    "lng": -88.081807},
                "status" : "operational",
                "orders": 20,
                "sensor": [
                        {
                            "sensorid": 1,
                            "history": []
                        },
                ]
            },
            {
                "id" : 2,
                "name": "Bravo",
                "state": "Nevada",
                "location": {
                    "lat": 30.266666,
                    "lng": -97.733330},
                "status" : "operational",
                "orders": 5
            },
            {
                "id" : 3,
                "name": "Charlie",
                "state": "New York",
                "location": {
                    "lat": 38.854885,
                    "lng": -88.081807},
                "status" : "operational",
                "orders": 100
            },
            {
                "id" : 4,
                "name": "Delta",
                "state": "San Francisco",
                "location": {
                    "lat": 37.773972,
                    "lng": -122.431297},
                "status" : "Sensor Issue",
                "orders": 0
            },
            {
                "id" : 5,
                "name": "Epsilon",
                "state": "Kansas",
                "location": {
                    "lat": 25.761681 ,
                    "lng": -80.191788},
                "status" : "operational",
                "orders": 19
            },
            {
                "id" : 5,
                "name": "Foxtrot",
                "state": "Florida",
                "location": {
                    "lat": 40.730610 ,
                    "lng": -73.935242},
                "status" : "No Sensors Detected",
                "orders": 4
            }
        ]
    },
    {
        "name": "Bob the Farmer",
        "warehouses": [
            {
                "id" : 1,
                "name": "Fruit",
                "state": "Michigan",
                "location": {
                    "lat": 42.279594,
                    "lng": -83.732124
                },
                "status" : "operational",
                "orders": 20
            },
            {
                "id" : 2,
                "name": "Dairy",
                "state": "Ohio",
                "location": {
                    "lat": 30.266666,
                    "lng": -97.733330},
                "status" : "operational",
                "orders": 5
            },
            {
                "id" : 3,
                "name": "Vegtables",
                "state": "Ohio",
                "location": {
                    "lat": 39.983334,
                    "lng": -82.983330
                },
                "status" : "operational",
                "orders": 100
            },
            {
                "id" : 4,
                "name": "Other",
                "state": "Illinois",
                "location": {
                    "lat": 41.881832,
                    "lng": -87.623177},
                "status" : "error",
                "orders": 0
            }
        ]
    },
    {
        "name": "Mcdonald Food Supplier",
        "warehouses": [
            {
                "id" : 1,
                "name": "Cows",
                "state": "California",
                "location": {
                    "lat": 38.575764,
                    "lng": -121.478851},
                "status" : "operational",
                "orders": 20
            },
            {
                "id" : 2,
                "name": "Oranges",
                "state": "California",
                "location": {
                    "lat": 37.804363,
                    "lng": -122.271111},
                "status" : "operational",
                "orders": 5
            },
            {
                "id" : 3,
                "name": "Lettice",
                "state": "Oklahoma",
                "location": {
                    "lat": 35.481918,
                    "lng": -97.508469},
                "status" : "operational",
                "orders": 100
            },
            {
                "id" : 4,
                "name": "Fish",
                "state": "Oregon",
                "location": {
                    "lat": 45.523064,
                    "lng": -122.676483},
                "status" : "error",
                "orders": 0
            },
            {
                "id" : 5,
                "name": "Bread",
                "state": "Georgia",
                "location": {
                    "lat": 33.753746 ,
                    "lng": -84.386330},
                "status" : "operational",
                "orders": 19
            }
        ]
    }
]

export default customerJson;