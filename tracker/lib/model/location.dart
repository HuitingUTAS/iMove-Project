import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class Location {
  @JsonKey(name: 'lat')
  double? latitude;
  @JsonKey(name: 'lng')
  double? longitude;

  Location(this.latitude, this.longitude);

  Location.fromJson(Map<String, dynamic> json) :
      latitude = double.parse(json['lat'].toString()),
      longitude = double.parse(json['lng'].toString());

  Map<String, dynamic> toJson() => {
    'lat': latitude,
    'lng': longitude,
  };
}
