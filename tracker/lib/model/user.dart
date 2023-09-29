import 'package:json_annotation/json_annotation.dart';

import 'location.dart';

@JsonSerializable()
class User {
  String? id;
  String? userName;
  Location? location;

  User(this.id, this.userName);


  User.fromJson(Map<String, dynamic> json) :
        id = json['_id'],
        userName = json['userName'],
        location = Location.fromJson(json['location']);

  Map<String, dynamic> toJson() => {
    '_id': id,
    'userName': userName,
    'location': location?.toJson(),
  };
}
