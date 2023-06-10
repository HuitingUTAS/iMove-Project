# 1. Requesting Unallocated order API Requirement

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

# 2. Requesting Allocated order API Requirement

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

# 8. Fetching Car API Requirement

## API Name

FetchingCar

## Aim

Retrieving car information from Car collection

## URL

`/CarManagement/FetchingCar`

## Method

Fetching Car: GET

## Data Params

- `CarID`: string, if there isn't carID, fetching all car information

## Success Response

Fetching Cars:

- Code: 200
- Content: JSON，including all fetched cars

# 9. Update Car API Requirement

## API Name

UpdatingCar

## Aim

Updating Car infromation

## URL

`/CarManagement/UpdatingCar`

## Method

Updating car: PUT

## Data Params

- `CarID`,string, updated car ID
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

# 10. Inserting Car API Requirement

## API Name

InsertingCar

## Aim

Adding new car to the car collection

## URL

`/CarManagement/InsertingCar`

## Method

Inserting Car: POST

## Data Params

- `CarID`,string, inserted car ID
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

# 11. Deleting Car API Requirement

## API Name

DeletingCar

## Aim

Deleting car from car collection

## URL

`/CarManagement/DeletingCar`

## Method

## Data Params

- `CarID`,string, deleting car ID

## Success Response

Deleting Car:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 12. Fetching Driver API Requirement

## API Name

FetchingDriver

## Aim

Retrieving driver information from Drivers collection

## URL

`/DriverManagement/FetchingDriver`

## Method

Fetching Driver: GET

## Data Params

- `DriverID`: string, if there isn't DriverID, fetching all driver information

## Success Response

Fetching Drivers:

- Code: 200
- Content: JSON，including all fetched drivers

# 13. Update Driver API Requirement

## API Name

UpdatingDriver

## Aim

Updating Driver infromation

## URL

`/DriverManagement/UpdatingDriver`

## Method

Updating driver: PUT

## Data Params

- `driverID`,string, updated driver ID
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

- `driverID`,string, inserted driver ID
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

# 15. Deleting Driver API Requirement

## API Name

DeletingDriver

## Aim

Deleting driver

## URL

`/DriverManagement/DeletingDriver`

## Method

## Data Params

- `DriverID`,string, deleting driver ID

## Success Response

Deleting Driver:

- Code: 200
     - Content: JSON，including：
       - `message`: string, successful message

# 16. Fetching Dispatcher API Requirement

## API Name

FetchingDispatcher

## Aim

Retrieving dispatcher information from Dispatchers collection

## URL

`/DispatcherManagement/FetchingDispatcher`

## Method

Fetching Dispatcher: GET

## Data Params

- `DispatcherID`: string, if there isn't DispatcherID, fetching all dispatcher information

## Success Response

Fetching Dispatchers:

- Code: 200
- Content: JSON，including all fetched Dispatchers

# 17. Update Dispatcher API Requirement

## API Name

UpdatingDispatcher

## Aim

Updating Dispatcher infromation

## URL

`/DriverManagement/UpdatingDispatcher`

## Method

Updating dispatcher: PUT

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

# API 需求

## API 名称

Driver Order Information API

## 目的

获取司机的订单信息，用于在前端页面上展示，并允许司机更新订单状态和上传文件。

## URL

1. 获取司机订单列表: `/DriverPage/orders`
2. 更新订单状态: `/DriverPage/Orderid`
3. 上传文件: `/DriverPage/Orderid`

## Method

1. 获取司机订单列表: GET
2. 更新订单状态: PUT
3. 上传文件: POST

## URL Params

- `id`: int, Order ID (仅在更新订单状态和上传文件时需要)

## Data Params

1. 获取司机订单列表: 无
2. 更新订单状态:
   - `status`: string, 订单状态 (可选值：Waiting, In progress, Completed)
3. 上传文件:
   - `file`: file, 上传的文件

## Success Response

1. 获取司机订单列表:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `orders`: array, 订单列表，包含：
       - `order_id`: string, 订单 ID
       - `status`: string, 订单状态
2. 更新订单状态:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息
3. 上传文件:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息

## Error Response

- Code: 404
- Content: JSON 格式的数据，包括：

  - `message`: string, 错误消息

- Code: 500
- Content: JSON 格式的数据，包括：
  - `message`: string, 错误消息

## 备注

司机可以通过这些 API 在前端页面上查看订单列表、更新订单状态和上传文件。
