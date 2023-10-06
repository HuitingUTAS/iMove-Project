import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class Customer {
  String? code;
  String? companyName;
  String? lastName;
  String? firstName;
  String? contactMobile;
  String? contactOffice;
  String? building;
  String? address;
  String? country;
  String? state;
  String? city;
  String? postal;

  String get fullName => '$firstName $lastName';

  String get deliveryAddress => '$address, $city, $state $postal';

  Customer();

  Customer.fromJson(Map<String, dynamic> json) :
        code = json['code'],
        companyName = json['companyName'],
        lastName = json['lastName'],
        firstName = json['firstName'],
        contactMobile = json['contactMobile'],
        contactOffice = json['contactOffice'],
        building = json['building'],
        address = json['address'],
        country = json['country'],
        state = json['state'],
        city = json['city'],
        postal = json['postal'];

  Map<String, dynamic> toJson() => {
    'code': code,
    'companyName': companyName,
    'lastName': lastName,
    'firstName': firstName,
    'contactMobile': contactMobile,
    'contactOffice': contactOffice,
    'building': building,
    'address': address,
    'country': country,
    'state': state,
    'city': city,
    'postal': postal,
  };
}
