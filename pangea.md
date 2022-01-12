



Supply Chain Model Design - Design a schema that allows our logistics 
team to manage an inventory of supplies across multiple locations.
Support the following features:

Transfer supply from one location to another in batches
Track supply batches (storage unit/freight, quantity, status)
Track freights (status, estimated arrival date, supply batches)
Each location has multiple storage units of supply batches
Supply unit is either pieces, kg or ml.
Write queries to answer the following questions
How many SKU at LOCATION right now?
How many SKU at LOCATION in two days?
Bonuses

Given the projected daily demand for each supply, how would you predict supply shortage periods in each location?
Bonus: support compound supplies (a kitted supply consisting of supply components)
Bonus: How would you use demand projections for locations that kit supply components into finished supplies?


1. Multiple locations

2. transfer suply from location A to B

3. 


Entities

1. Locations
    id
    name
    lat
    long

2. batches
id
from
to
product_id
quantiy
status
location_storage_id

3 location_storage
    id
    location_id
    storage_name


4. Products
    id
    name
    unit


5. Frieghts
    id
    status
    arrival_date
    batches_id
