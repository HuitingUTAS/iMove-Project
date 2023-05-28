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

# API Requirement

## API Name

Dispatch Order API

## Aim

Adding new order with order items
Importing new order with order items
Allocating order based on its delivery data and postcode
Exporting order for packing

## URL

Allocating Order: `/DispatchPage/DispatchPage`
Adding new order: `/DispatchPage/AddOrder`
Importing new order: `/DispatchPage/BatchOrder`
Allocated Order: `/DispatchPage/AllocatedOrder`
Unallocaed Order: `/DispatchPage/UnallocatedOrders`

## Method

1. Requesting unallocated order: GET
2. Requesting allocated order: GET
3. uploading order (single and batch): POST
4. Allocating: PUT
5. Exporting allocated order: GET

6. Adding order to the order table

## Data Params

1. Adding order:

   - `orders`: array, order Information including:
     `OrderID`,
     `SenderName`,
     `ReciverName`,
     `Address`,
     `PhoneNumber`,
     `Requirement`,
     `Fridge`, //true or false
     `DeliverDate`,

2. Adding Order Item:

   - `items`: array, item information including:
     `itemName`,
     `uom`,
     `quantity`,

3. Checking receiver:

   -`ReciverName`: String , check whether there is this reciver or not

4. Checking Item:

   -`itemName` : String, check whether there is this item or not

5. Requesting unallocated orders: no sending data param

6. Allocating orders:

   - `orders`: array, unallocaed orders

7. Requesting allocated orders: no sending data param

## Success Response

1. Inserted order to the order table:

   - Code: 200
   - Content: JSON，including：
     - `message`: string, successful message
     - `Order ID`: string , order number, as a attribute to be added into orderitem table

2. Adding Order items to the Orderitem table:

   - Code: 200
   - Content: JSON，including:
     - `message`: string, successful message

3. Checking receiver:

   - Code: 200
   - Content: JSON，including:
     - `message`: string, successful message

4. Checking Item:

   - Code: 200
   - Content: JSON，including:
     - `message`: string, successful message

5. Requesting unallocated orders:

   - Code: 200
   - Content: JSON，including: -`Order ID`, -`Sender`, -`Revicer`, -`Requirement`

6. Allocating orders:

   - Code: 200
   - Content: JSON，including:
     - `message`: string, successful message

7. Requesting allocated orders:
   - Code: 200
   - Content: JSON，including:
     - `orderInfo`: array, all allocated order information, -`ItemInfom`: array, all included items information

## Error Response

- Code: 400
- Content: JSON data，inlcuding：
  - `message`: string, error massage
