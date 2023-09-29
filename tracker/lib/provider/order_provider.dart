import 'package:flutter/cupertino.dart';
import 'package:flutter_session_manager/flutter_session_manager.dart';

import '../api/move_service.dart';
import '../model/order.dart';

class OrderProvider extends ChangeNotifier {
  final MoveService _moveService = MoveService();
  List<Order> orders = [];

  OrderProvider(){
    getOrdersByUserId();
  }

  Future getOrdersByUserId() async {
    orders.clear();
    notifyListeners();

    dynamic userId = await SessionManager().get("userId");
    if(userId.isNotEmpty) {
      orders = await _moveService.getOrdersByDriverId(userId);
    }
    notify();
  }

  void notify() {
    notifyListeners();
  }
}
