import 'package:json_annotation/json_annotation.dart';
import 'location.dart';

@JsonSerializable()
class LocationRequest{
  @JsonKey(name: '_id')
  late String id;
  late Location location;

  LocationRequest(this.id, this.location);

  LocationRequest.fromJson(Map<String, dynamic> json)
      :
        id = json["_id"],
        location = Location.fromJson(json['location']);

  Map<String, dynamic> toJson() =>
      {
        '_id': id,
        'location': location.toJson(),
      };
}