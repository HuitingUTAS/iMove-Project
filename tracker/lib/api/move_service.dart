import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:tracker/model/user_response.dart';

import '../model/location_request.dart';
import '../model/order.dart';
import '../model/order_status_request.dart';
import '../model/token_request.dart';

class MoveService {
  static const String baseUrl = 'http://192.168.0.182:3000'; // Replace with your API URL

  Future<String?> login(String username, String password, String role) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'), // Replace with your login endpoint
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'role': role,
        'username': username,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // Login successful
      final Map<String, dynamic> responseData = json.decode(response.body);
      UserResponse driverResponse = UserResponse.fromJson(responseData);
      return driverResponse.user.id;
    } else {
      // Login failed
      return "";
    }
  }

  Future<List<Order>> getOrdersByDriverId(String userId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/orders/driver/$userId'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      }
    );

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = jsonDecode(response.body);
      final List<Order> orders = jsonData.map((data) => Order.fromJson(data)).toList();
      return orders;
    }
    return [];
  }

  Future<Order> getOrdersByOrderId(String orderId) async {
    final response = await http.get(
        Uri.parse('$baseUrl/orders/$orderId'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        }
    );

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = jsonDecode(response.body);
      final List<Order> orders = jsonData.map((data) => Order.fromJson(data)).toList();
      return orders.isNotEmpty ? orders[0] : Order();
    }
    return Order();
  }

  Future<bool> updateOrderStatus(OrderStatusRequest request) async {
    final String jsonData = json.encode(request.toJson());

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/orders/status'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonData,
      );

      if (response.statusCode == 200) {
         return true;
      } else {
        // Request failed, handle errors
        print('OrderStatusRequest Error: ${response.statusCode}');
        return false;
      }
    } catch (error) {
      // Handle exceptions
      print('Error: $error');
    }
    return false;
  }

  Future<bool> updateDriverLocation(LocationRequest request) async {
    final String jsonData = json.encode(request.toJson());

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/drivers/location/update'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonData,
      );

      if (response.statusCode == 200) {
        return true;
      } else {
        // Request failed, handle errors
        print('updateDriverLocation Error: ${response.statusCode}');
        return false;
      }
    } catch (error) {
      // Handle exceptions
      print('Error: $error');
    }
    return false;
  }

  Future<bool> updateDriverToken(TokenRequest request) async {
    final String jsonData = json.encode(request.toJson());

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/drivers/location/update'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonData,
      );

      if (response.statusCode == 200) {
        return true;
      } else {
        // Request failed, handle errors
        print('updateDriverToken Error: ${response.statusCode}');
        return false;
      }
    } catch (error) {
      // Handle exceptions
      print('Error: $error');
    }
    return false;
  }
}