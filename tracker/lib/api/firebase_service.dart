import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:tracker/api/move_service.dart';
import 'package:tracker/model/token_request.dart';

import '../firebase_options.dart';
import '../provider/fcm_provider.dart';

// Reference - https://github.com/mookypoo/portfolio_post/blob/main/lib/main.dart
class FirebaseService {
  static FirebaseMessaging? _firebaseMessaging;
  static FirebaseMessaging get firebaseMessaging => FirebaseService._firebaseMessaging ?? FirebaseMessaging.instance;
  static FlutterLocalNotificationsPlugin localNotificationsPlugin = FlutterLocalNotificationsPlugin();
  static NotificationDetails platformChannelSpecifics = const NotificationDetails(
    android: AndroidNotificationDetails(
      "iMove", "iMove Notifications", priority: Priority.max, importance: Importance.max,
    ),
  );
  static final MoveService _moveService = MoveService();

  static Future<void> initializeFirebase() async {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
    FirebaseService._firebaseMessaging = FirebaseMessaging.instance;
    await FirebaseMessaging.instance.getInitialMessage();
    await requestPermission();
    await FirebaseService.initializeLocalNotifications();
    await FCMProvider.onMessage();
   // await FirebaseService.onBackgroundMsg();
  }


  static Future<void> requestPermission() async {
    NotificationSettings settings = await FirebaseService.firebaseMessaging.requestPermission(
      alert: true,
      badge: true,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized){
      print('User granted permission');
    } else {
      print('User declined or has not accepted permission');
    }
  }

  static Future<void> initializeLocalNotifications() async {
    final token = await FirebaseMessaging.instance.getToken();
    print('Token: $token');
    const InitializationSettings initSettings = InitializationSettings(
        android: AndroidInitializationSettings("@mipmap/ic_launcher"),
        iOS: DarwinInitializationSettings()
    );
    await FirebaseService.localNotificationsPlugin.initialize(initSettings, onDidReceiveNotificationResponse: FCMProvider.onTapNotification);
  }

  static void updateToken(String userId) async {
    final token = await FirebaseMessaging.instance.getToken();
    await _moveService.updateDriverToken(TokenRequest(userId, token!));
  }
}