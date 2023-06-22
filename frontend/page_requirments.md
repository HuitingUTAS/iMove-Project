# 1. Requesting Unallocated order API Requirement (Done)

## API Name

FetchUnallocatedOrder

## Aim

Fetching all unallocated orders from order collection

## URL

`/DispatchPage/FetchUnallocatedOrder`

## Method

Requesting unallocated order: GET

## Data Params

No sending data param

## Success Response

Requesting unallocated orders:

- Code: 200
- Content: JSON，including all unallocated orders

# 2. Requesting Allocated order API Requirement (Done)

## API Name

FetchAllocatedOrder

## Aim

Fetching all allocated orders that undelivered from order collection

## URL

`/DispatchPage/FetchAllocatedOrder`

## Method

Requesting allocated order: GET

## Data Params

No sending data param

## Success Response

Requesting allocated orders:

- Code: 200
   - Content: JSON，including:
       -`orderInfo`: array, all allocated order information; -`ItemInfom`: array, all included items information

# 3. Allocating Order API Requirement

## API Name

AllocatingOrder

## Aim

Allocating unallocatd order based on address and deliver date.
There are four cars, therefore they need to be assigned four classify based on postcode.
Only allocated orders whose deliver date are the next day.

## URL

`/DispatchPage/AllocatingOrder`

## Method

Allocating Orders: PUT

## Data Params

No sending data param

## Success Response

Allocating orders:

- Code: 200
     - Content: JSON，including:
       - `message`: string, successful message

# 4. Checking Receiver API Requirement

## API Name

CheckingReceiver

## Aim

Checking whether the receiver can be found from current receiver collection or not.

## URL

`/DispatchPage/CheckingReceiver`

## Method

Checking receiver: GET

## Data Params

Checking receiver:

-`ReciverName`: String

## Success Response

Checking receiver:

- Code: 200
     - Content: JSON，including:
       - `Receiver Address`: string; - `Message` : string, successful message

# 5. Checking Item API Requirement

## API Name

CheckingItem

## Aim

Checking whether the item can be found from current item collection or not.

## URL

`/DispatchPage/CheckingItem`

## Method

Checking item: GET

## Data Params

Checking Item:

-`itemName` : String,

## Success Response

Checking Item:

- Code: 200
     - Content: JSON，including:
       - `message`: string, successful message

# 6. Inserting OrderItem API Requirement

## API Name

InsertingItem

## Aim

Inserting included items into the OrderItem Collection

## URL

`/DispatchPage/InsertingItem`

## Method

Inserting included items into OrderItem: POST

## Data Params

Adding Order Item:

- `items`: array, item information including:
       `itemName`,string
       `uom`, string
       `quantity`, number

## Success Response

- Code: 200
     - Content: JSON，including:
       - `message`: string, successful message

# 7. Inserting Order API Requirement

## API Name

InsertingOrder

## Aim

Inserting order into the orders collection, including single inserting and batch inserting

## URL

`/DispatchPage/InsertingOrder`

## Method

Inserting order (single and batch): POST

## Data Params

Adding order:

- `orders`: array, order Information including:
       `OrderID`, string, including order number + consignment number (currently is three zero)
       `SenderName`, string
       `ReciverName`, string
       `Address`, string
       `PhoneNumber`, string
       `Requirement`, string
       `Fridge`, boolean //true or false
       `DeliverDate`, string

## Success Response

Inserted order:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message
       - `OrderID`: string , it will be the attribute to be added into orderitem collection

# 8. Fetching Car API Requirement (Done)

## API Name

FetchingCar

## Aim

Retrieving car information from Car collection. 
- `CarID`: string, if there isn't carID, fetching all car information

## URL

`/CarManagement/FetchingCar/{CarID}`

## Method

Fetching Car: GET

## Data Params

None

## Success Response

Fetching Cars:

- Code: 200
- Content: JSON，including all fetched cars

# 9. Update Car API Requirement (Done)

## API Name

UpdatingCar

## Aim

Updating Car infromation

## URL

`/CarManagement/UpdatingCar`

## Method

Updating car: PUT

## Data Params

- `_id`,string, updated car ID
- `make`, string
- `model`, string
- `type`, string
- `registrationNumber`, string
- `volume`, string
- `hasFridge`, string
- `isInsuranced`, string
- `status`, boolean, whether is using or not

## Success Response

Updating Car:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 10. Inserting Car API Requirement (Done)

## API Name

InsertingCar

## Aim

Adding new car to the car collection

## URL

`/CarManagement/InsertingCar`

## Method

Inserting Car: POST

## Data Params

- `make`, string
- `model`, string
- `type`, string
- `registrationNumber`, string
- `volume`, string
- `hasFridge`, string
- `isInsuranced`, string
- `status`, boolean, whether is using or not

## Success Response

Inserting Car:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 11. Deleting Car API Requirement (Done)

## API Name

DeletingCar

## Aim

Deleting car from car collection
- `CarID`,string, deleting car ID

## URL

`/CarManagement/DeletingCar/{CarID}`

## Method

DELETE

## Data Params

None

## Success Response

Deleting Car:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 12. Fetching Driver API Requirement (Done)

## API Name

FetchingDriver

## Aim

Retrieving driver information from Drivers collection.
- `DriverID`: string, if there isn't DriverID, fetching all driver information

## URL

`/DriverManagement/FetchingDriver/{DriverID}`

## Method

Fetching Driver: GET

## Data Params

None

## Success Response

Fetching Drivers:

- Code: 200
- Content: JSON，including all fetched drivers

# 13. Update Driver API Requirement (Done)

## API Name

UpdatingDriver

## Aim

Updating Driver infromation

## URL

`/DriverManagement/UpdatingDriver`

## Method

Updating driver: PUT

## Data Params

- `_id`,string, updated driver ID
- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `licenseNumber`, string
- `licensePhoto`, string
- `photo`, string
- `status`, boolean, whether is using or not

## Success Response

Updating driver:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 14. Inserting Driver API Requirement

## API Name

InsertingDriver

## Aim

Adding new driver to the drivers collection

## URL

`/DriverManagement/InsertingDriver`

## Method

Inserting driver: POST

## Data Params

- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `licenseNumber`, string
- `licensePhoto`, string
- `photo`, string
- `status`, boolean, whether is using or not

## Success Response

Inserting Driver:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 15. Deleting Driver API Requirement (Done)

## API Name

DeletingDriver

## Aim

Deleting driver
- `DriverID`,string, deleting driver ID

## URL

`/DriverManagement/DeletingDriver/{DriverID}`

## Method

DELETE

## Data Params

None

## Success Response

Deleting Driver:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 16. Fetching Dispatcher API Requirement (Done)

## API Name

FetchingDispatcher

## Aim

Retrieving dispatcher information from Dispatchers collection.
- `DispatcherID`: string, if there isn't DispatcherID, fetching all dispatcher information

## URL

`/DispatcherManagement/FetchingDispatcher/{DispatcherID}`

## Method

Fetching Dispatcher: GET

## Data Params

None

## Success Response

Fetching Dispatchers:

- Code: 200
- Content: JSON，including all fetched Dispatchers

# 17. Update Dispatcher API Requirement (Done)

## API Name

UpdatingDispatcher

## Aim

Updating Dispatcher infromation

## URL

`/DriverManagement/UpdatingDispatcher`

## Method

Updating dispatcher: PUT

## Data Params

- `_id`,string, updated dispatcher ID
- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `status`, boolean, whether is using or not

## Success Response

Updating dispatcher:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# Update Dispatcher Password API Requirement (Done)

## API Name

Updating Dispatcher password

## Aim

Updating Dispatcher password

## URL

`/DriverManagement/UpdatingDispatcherPassword`

## Method

Updating dispatcher: PUT

## Data Params

- `_id`,string, updated dispatcher ID
- `password`, string

## Success Response

Updating dispatcher:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 18. Inserting Dispatcher API Requirement

## API Name

InsertingDispatcher

## Aim

Adding new dispatcher to the dispatchers collection

## URL

`/DispatcherManagement/InsertingDispatcher`

## Method

Inserting dispatcher: POST

## Data Params

- `dispatcherID`,string, updated dispatcher ID
- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `password`, string
- `username`, string
- `status`, boolean, whether is using or not

## Success Response

Inserting Dispatcher:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 19. Deleting Dispatcher API Requirement

## API Name

DeletingDispatcher

## Aim

Deleting dispatcher

## URL

`/DispatcherManagement/DeletingDispatcher`

## Method

## Data Params

- `DispatcherID`,string, deleting dispatcher ID

## Success Response

Deleting Dispatcher:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 20. Fetching Packer API Requirement

## API Name

FetchingPacker

## Aim

Retrieving packer information from packers collection

## URL

`/PackerManagement/FetchingPacker`

## Method

Fetching Packer: GET

## Data Params

- `PackerID`: string, if there isn't PackerID, fetching all packer information

## Success Response

Fetching Packers:

- Code: 200
- Content: JSON，including all fetched Packers

# 21. Update Packer API Requirement

## API Name

UpdatingPacker

## Aim

Updating Packer infromation

## URL

`/PackerManagement/UpdatingPacker`

## Method

Updating packer: PUT

## Data Params

- `packerID`,string, updated packer ID
- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `password`, string
- `username`, string
- `photo`, string
- `status`, boolean, whether is using or not

## Success Response

Updating packer:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 21. Inserting Packer API Requirement

## API Name

InsertingPacker

## Aim

Adding new packer to the packers collection

## URL

`/PackerManagement/InsertingPacker`

## Method

Inserting packer: POST

## Data Params

- `packerID`,string, updated packer ID
- `name`, string
- `gender`, string
- `email`, string
- `phone`, string
- `address`, string
- `password`, string
- `username`, string
- `photo`, string
- `status`, boolean, whether is using or not

## Success Response

Inserting Packer:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 22. Deleting Packer API Requirement

## API Name

DeletingPacker

## Aim

Deleting packer

## URL

`/PackerManagement/DeletingPacker`

## Method

## Data Params

- `PackerID`,string, deleting packer ID

## Success Response

Deleting Packer:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# API requirement (dispatcher/driver Done)

## API name

Registration page API

## Aim

Create new staffs or cars to system

## URL

- Create new packer: `/RegistrationPage/packer`
- Create new dispatcher: `/RegistrationPage/dispatcher`
- Create new car: `/RegistrationPage/car`
- Create new driver: `/RegistrationPage/driver`
- Create new manager: `/RegistrationPage/manager`

## method

1. Create new packer: POST
2. Create new dispatcher: POST (Done)
3. Create new car: POST
4. Create new driver: POST
5. Create new manager: POST

## Data Params(maybe changed in the future)

1. for packer:

- `name`: string
- `gender`: string
- `age`: int
- `email`: string
- `phone number`: string
- `address`: string
- `photo`: binary(not sure, google told me for photo, mongoDB store it as binary)

2. for dispatcher:

- `username`: string
- `password`: string
- `name`: string
- `gender`: string
- `age`: int
- `email`: string
- `phone`: string
- `address`: string
- `photo`: binary

3. for car:

- `make`: string
- `model`: string
- `type`: string
- `registration number`: string
- `container volume`: int
- `has fridge`: boolean
- `is insuranced`: boolean
- `photo`: binary

4. for driver:

- `username`: string
- `password`: string
- `name`: string
- `gender`: string
- `age`: int
- `email`: string
- `phone`: string
- `address`: string
- `licenseNumber`: string
- `licensePhoto`: binary
- `photo`: binary

5. for manager:

- `name`: string
- `gender`: string
- `age`: int
- `email`: string
- `phone number`: string
- `address`: string
- `photo`: binary

# API requirement

## API name

Packer page API

## Aim

Get different orders' information

## URL

Get order's information: `/PackerPage/OrderID`
Upload the needed parcel to system: `/PackerPage/OrderID`

## method

1. Get order's information: GET
2. Upload the needed parcel to system: POST

## Data Params(maybe changed in the future)

1. Get order's information:

- `order name`: string
- `order ID`: string
- `item`: array
- `date`: date

2. Upload the needed parcel to system:

- `parcel needed`: int

# API requirement

## API name

customer management page API

## Aim

Get all of the customers' information, and also edit, delete and add new.

## URL

Get all customers' information: `/CustomerManagementPage/customers`
Edit customer: `/CustomerManagementPage/customerID`
Add new: `/CustomerManagementPage/customer`
delete customer: `/CustomerManagementPage/customerID`

## method

1. Get all customers' information: GET
2. Edit customer: PUT
3. Add new: POST
4. delete customer: DELETE

## Data Params(maybe changed in the future)

1. Get all customers' information:

- `customerID`: array(not sure for this, cause i want to show all of the customers on screen)
- `customerName`: array
- `address`: array

2. Edit customer:

- `customerName`: string
- `address`: string

3. Add new:

- `customerName`: string
- `address`: string

4. delete customer:

- `customerID`: string, delete customer

# API requirement

## API name

Item management page API

## Aim

Get all of the items' information, and also edit, delete and add new.

## URL

Get all Items' information: `/CustomerManagementPage/customers`
Edit item: `/CustomerManagementPage/customerID`
Add new: `/CustomerManagementPage/customer`
delete item: `/CustomerManagementPage/customerID`

## method

1. Get all items' information: GET
2. Edit item: PUT
3. Add new: POST
4. delete item: DELETE

## Data Params(maybe changed in the future)

1. Get all items' information:

- `itemID`: array(not sure for this, cause i want to show all of the items on screen)
- `itemName`: array
- `weight`: array

2. Edit item:

- `itemName`: string
- `weight`: int

3. Add new:

- `itemName`: string
- `weight`: int

4. delete item:

- `itemID`: string, delete item

# API requirement

## API name

Tracking page API

## Aim

track the current position of the car and the position of each order.

## URL

Get information of each car: `/TrackingPage/carID`
Get information of each order: `/TrackingPage/OrderID`

## method

1. Get information of each car: GET
2. Get information of each order: GET

## Data Params(maybe changed in the future)

1.  Get information of each car:

- `Car name`: string
- `driver name`: string (every day a driver has a car)
- `Order ID`: string

2. Get information of each order:

- `Order name`: string
- `Order ID`: string
- `address`: string
- `items`: array
- `parcel number`: int
- `status`: string
- `start time`: timestamp
- `end time`: timestamp

# API requirement

## API name

Driver Information API

## aim

get the orders' information for one driver, update status, and upload files

## URL

1. get the orders' information: `/DriverPage/Driverid`
2. update status: `/DriverPage//Driverid/Orderid`
3. upload file: `/DriverPage//Driverid/Orderid`

## Method

1. get the orders' information: GET
2. update status: PUT/POST
3. upload file: POST

## Data Params

1. get the orders' information:

- `driver name`: string
- `order id`: string
- `order name`: string
- `customer name`: string
- `address`: string
- `parcel number`: int
- `special requirements`: string
- `status`: string

2. update status:
   - `status`: string, order status (choices：Waiting, In progress, Completed)
   - `start time`: timestamp(when the status is changed to In progress, record a time)
   - `end time`: timestamp(when the status is changed to Completed, record a time)
3. upload file:
   - `file`: binary, (the photo to upload)
