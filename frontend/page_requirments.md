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

# API 需求

## API 名称

Dispatch Order Management API

## 目的

获取未分配和已分配订单列表，用于在前端页面上展示，并允许上传、分配、添加和导出订单。

## URL

上传订单列表: `/DispatchPage`
分配订单: `/DispatchPage/orders`
添加新订单: `/AddOrder`
导出已分配订单: `/DispatchPage/orders`

## Method

1. 获取未分配订单列表: GET
2. 获取已分配订单列表: GET
3. 上传订单列表: POST
4. 分配订单: PUT
5. 添加新订单: POST
6. 导出已分配订单: GET

## Data Params

1. 获取未分配订单列表: 无
2. 获取已分配订单列表: 无
3. 上传订单列表:
   - `orders`: array, 订单列表
4. 分配订单:
   - `ordersToAllocate`: array, 要分配的订单列表
5. 添加新订单:
   - `newOrder`: object, 新订单信息
6. 导出已分配订单: 无

## Success Response

1. 获取未分配订单列表:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `unallocatedOrders`: array, 未分配订单列表
2. 获取已分配订单列表:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `allocatedOrders`: array, 已分配订单列表
3. 上传订单列表:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息
4. 分配订单:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息
5. 添加新订单:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息
6. 导出已分配订单:
   - Code: 200
   - Content: 文件类型, 已分配订单的导出文件

## Error Response

- Code: 404
- Content: JSON 格式的数据，包括：

  - `message`: string, 错误消息

- Code: 500
- Content: JSON 格式的数据，包括：
  - `message`: string, 错误消息

## 备注

前端可以通过这些 API 在调度页面上获取未分配和已分配订单列表、上传订单列表、分配订单、添加新订单和导出已分配订单。

# API 需求

## API 名称

Add Order API

## 目的

创建新的订单，并将其添加到未分配订单列表，用于在前端页面上展示和处理。

## URL

1. 添加新订单: `/AddOrder`

## Method

1. 添加新订单: POST

## URL Params

无

## Data Params

1. 添加新订单:
   - `SenderName`: string, 发件人姓名
   - `ReciverName`: string, 收件人姓名
   - `Address`: string, 地址
   - `PhoneNumber`: string, 电话号码
   - `Item`: string, 包含的物品
   - `Requirement`: string, 特殊要求
   - `Fridge`: boolean, 是否需要冰箱

## Success Response

1. 添加新订单:
   - Code: 200
   - Content: JSON 格式的数据，包括：
     - `message`: string, 成功消息
     - `order`: object, 新创建的订单对象

## Error Response

- Code: 404
- Content: JSON 格式的数据，包括：

  - `message`: string, 错误消息

- Code: 500
- Content: JSON 格式的数据，包括：
  - `message`: string, 错误消息

## 备注

前端可以通过这个 API 在添加订单页面添加新的订单，并将其添加到未分配订单列表中。
