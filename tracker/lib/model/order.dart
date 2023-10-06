import 'package:json_annotation/json_annotation.dart';
import 'customer.dart';
import 'item.dart';
import 'order_status.dart';

@JsonSerializable()
class Order {
  late String id;
  late String orderNumber;
  late String totalAmount;
  late String parcelQty;
  late Customer customer;
  late List<OrderStatus> orderStatusList;
  String _orderStatus = '';
  int _statusId = 0;

  // Getter for the name property
  String get orderStatus {
    if (orderStatusList.isNotEmpty && orderStatusList.length > 0){
      _statusId = orderStatusList[orderStatusList.length - 1].statusId;
      Item item = Item.statusOptions.firstWhere((element) => int.parse(element.code) == _statusId);
      _orderStatus = item.value;
    }
    return _orderStatus;
  }

  // Setter for the name property
  set orderStatus(String newStatus) {
    if (newStatus.isNotEmpty) {
      _orderStatus = newStatus;
    }
  }

  Order();

  Order.fromJson(Map<String, dynamic> json) :
        id = json['_id'],
        orderNumber = json['orderNumber'],
        totalAmount = json['totalAmount'].toString(),
        parcelQty = json['parcelQty'].toString(),
        customer = Customer.fromJson(json['customer']),
        orderStatusList = getOrderStatus(json);

  Map<String, dynamic> toJson() => {
    '_id': id,
    'orderNumber': orderNumber,
    'totalAmount': totalAmount,
    'parcelQty': parcelQty,
    'customer': customer.toJson()
  };

  static List<OrderStatus> getOrderStatus(Map<String, dynamic> json){
    final List<dynamic> jsonList = json['orderStatus'];
    List<OrderStatus> orderStatusList = jsonList.map((item) => OrderStatus.fromJson(item)).toList();
    return orderStatusList;
  }
}

