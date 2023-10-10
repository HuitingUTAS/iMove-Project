import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

import '../model/order.dart';
import '../api/firebase_service.dart';
import '../api/navigation_service.dart';

class FCMProvider with ChangeNotifier {
  static final NavigationService navService = NavigationService();

  /// when app is in the foreground
  static Future<void> onTapNotification(NotificationResponse? response) async {
    if (response?.payload == null) return;
    //final Order data = FCMProvider.convertPayload(response!.payload!);
    //if (_data.containsKey(...)) {
      //await Navigator.of(FCMProvider._context!).push("orders" as Route<Object?>));
    //Navigator.push(FCMProvider._context!, MaterialPageRoute(builder: (context) => const OrderPage()));
    //}
    navService.pushNamed('/order', args: "");
  }

  static convertPayload(String payload){
    final String payload0 = payload.substring(1, payload.length - 1);
    List<String> split = [];
    payload0.split(",").forEach((String s) => split.addAll(s.split(":")));
    Order mapped = Order();
    /*for (int i = 0; i < split.length + 1; i++) {
      if (i % 2 == 1) mapped.addAll({split[i-1].trim().toString(): split[i].trim()});
    }*/
    return mapped;
  }

  static Future<void> onMessage() async {
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      //if (MoveProvider._refreshNotifications != null) await MoveProvider._refreshNotifications!(true);
      // if this is available when Platform.isIOS, you'll receive the notification twice
      //if (Platform.isAndroid) {
      await FirebaseService.localNotificationsPlugin.show(
        0, message.notification!.title,
        message.notification!.body,
        FirebaseService.platformChannelSpecifics,
        payload: message.data.toString(),
      );
      //}
    });
  }
}

/*class FCMProvider with ChangeNotifier {
  static BuildContext? _context;

  static void setContext(BuildContext context) => FCMProvider._context = context;

  /// when app is in the foreground
  static Future<void> onTapNotification(NotificationResponse? response) async {
    if (FCMProvider._context == null || response?.payload == null) return;
    final Order data = FCMProvider.convertPayload(response!.payload!);
    //if (_data.containsKey(...)){
      //await Navigator.of(MoveProvider._context!).push(...);
    //
  }

  static convertPayload(String payload){
    final String payload0 = payload.substring(1, payload.length - 1);
    List<String> split = [];
    payload0.split(",").forEach((String s) => split.addAll(s.split(":")));
    Order mapped = Order();
    /*for (int i = 0; i < split.length + 1; i++) {
      if (i % 2 == 1) mapped.addAll({split[i-1].trim().toString(): split[i].trim()});
    }*/
    return mapped;
  }

  static Future<void> onMessage() async {
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      //if (MoveProvider._refreshNotifications != null) await MoveProvider._refreshNotifications!(true);
      // if this is available when Platform.isIOS, you'll receive the notification twice
      //if (Platform.isAndroid) {
        await FirebaseService.localNotificationsPlugin.show(
          0, message.notification!.title,
          message.notification!.body,
          FirebaseService.platformChannelSpecifics,
          payload: message.data.toString(),
        );
      //}
    });
  }

  static Future<void> backgroundHandler(RemoteMessage message) async {
  }
}*/