import 'package:json_annotation/json_annotation.dart';
import 'user.dart';

@JsonSerializable()
class UserResponse {
  User user;

  UserResponse.fromJson(Map<String, dynamic> json) :
    user = User.fromJson(json['user']);

  Map<String, dynamic> toJson() => {
    'user': user?.toJson(),
  };
}
