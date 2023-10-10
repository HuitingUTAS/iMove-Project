import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class OrderStatusRequest{
  @JsonKey(name: '_id')
  late String id;
  late int status;

  OrderStatusRequest();

  OrderStatusRequest.fromJson(Map<String, dynamic> json)
      :
        id = json["_id"],
        status = int.parse(json["status"].toString());

  Map<String, dynamic> toJson() =>
      {
        '_id': id,
        'status': status.toString(),
      };
}