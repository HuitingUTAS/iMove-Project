import 'dart:ffi';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class OrderStatus {
  late int statusId;
  late DateTime date;

  OrderStatus();

  OrderStatus.fromJson(Map<String, dynamic> json)
      :
        statusId = int.parse(json["status"].toString()),
        date = DateTime.parse(json['date']);

  Map<String, dynamic> toJson() =>
      {
        'status': statusId.toString(),
        'date': date.toString(),
      };
}