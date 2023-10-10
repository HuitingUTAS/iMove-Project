import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class TokenRequest {
  @JsonKey(name: '_id')
  late String id;
  late String token;

  TokenRequest(this.id, this.token);

  TokenRequest.fromJson(Map<String, dynamic> json)
      :
        id = json["_id"],
        token = json['token'];

  Map<String, dynamic> toJson() =>
      {
        '_id': id,
        'token': token,
      };
}