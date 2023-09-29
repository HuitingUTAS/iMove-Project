import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tracker/provider/fcm_provider.dart';
import 'package:tracker/view/order/deliver_page.dart';
import 'package:tracker/view/route/navigation_page.dart';

import 'api/firebase_service.dart';
import 'api/navigation_service.dart';
import 'view/login/login_page.dart';
import 'view/order/order_detail.dart';
import 'view/order/order_page.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FirebaseService.initializeFirebase();

  runApp(const MaterialApp(
    home: MoveApp(),
  ));
}

class MoveApp extends StatelessWidget {
  const MoveApp({super.key});

  Widget _iMoveApp() =>
      MaterialApp(onGenerateRoute: (RouteSettings route) {
        if (route.name == "/order") {
          //final String _pageTitle = route.arguments.toString();
          return MaterialPageRoute(
            builder: (_) => const OrderPage(),
            //settings: RouteSettings(name: OrderPage.routeName, arguments: _pageTitle),
          );
        }
        if (route.name == "/order_detail") {
          //final String _pageTitle = route.arguments.toString();
          return MaterialPageRoute(
            builder: (_) => const OrderDetailPage(orderId: ""),
            //settings: RouteSettings(name: OrderPage.routeName, arguments: _pageTitle),
          );
        }
        if (route.name == "/navigation") {
          //final String _pageTitle = route.arguments.toString();
          return MaterialPageRoute(
            builder: (_) => const NavigationPage(orderId: ""),
            //settings: RouteSettings(name: OrderPage.routeName, arguments: _pageTitle),
          );
        }
        if (route.name == "/deliver") {
          //final String _pageTitle = route.arguments.toString();
          return MaterialPageRoute(
            builder: (_) => const DeliverPage(orderId: ""),
            //settings: RouteSettings(name: OrderPage.routeName, arguments: _pageTitle),
          );
        }
        return MaterialPageRoute(
            builder: (_) =>
                Scaffold(
                  body: Center(
                      child: Text('No route defined for ${route.name}')),
                ));
      },
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blueGrey,
        ),
        navigatorKey: NavigationService.navigationKey,
        home: const LoginPage(),
      );

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<FCMProvider>(
            create: (context) => FCMProvider()),
      ],
      child: _iMoveApp(),
    );
  }
}

  /*@override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'iMove',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const LoginPage(),
      routes: {
        '/order': (context) => OrderPage(userId: ''),
        '/order detail': (context) => const OrderDetailPage(orderId: ''),
      },
    );
  }*/



/*class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return OverlaySupport(
      child: MaterialApp(
        title: 'Notify',
        theme: ThemeData(
          primarySwatch: Colors.deepPurple,
        ),
        debugShowCheckedModeBanner: false,
        home: HomePage(),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final FirebaseMessaging _messaging;
  late int _totalNotifications;
  PushNotification? _notificationInfo;

  void registerNotification() async {
    await Firebase.initializeApp();
    _messaging = FirebaseMessaging.instance;

    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');

      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        print(
            'Message title: ${message.notification?.title}, body: ${message.notification?.body}, data: ${message.data}');

        // Parse the message received
        PushNotification notification = PushNotification(
          title: message.notification?.title,
          body: message.notification?.body,
          dataTitle: message.data['title'],
          dataBody: message.data['body'],
        );

        setState(() {
          _notificationInfo = notification;
          _totalNotifications++;
        });

        if (_notificationInfo != null) {
          // For displaying the notification as an overlay
          showSimpleNotification(
            Text(_notificationInfo!.title!),
            leading: NotificationBadge(totalNotifications: _totalNotifications),
            subtitle: Text(_notificationInfo!.body!),
            background: Colors.cyan.shade700,
            duration: Duration(seconds: 2),
          );
        }
      });
    } else {
      print('User declined or has not accepted permission');
    }
  }

  // For handling notification when the app is in terminated state
  checkForInitialMessage() async {
    await Firebase.initializeApp();
    FirebaseMessaging.instance.subscribeToTopic("all");
    RemoteMessage? initialMessage =
    await FirebaseMessaging.instance.getInitialMessage();

    if (initialMessage != null) {
      PushNotification notification = PushNotification(
        title: initialMessage.notification?.title,
        body: initialMessage.notification?.body,
        dataTitle: initialMessage.data['title'],
        dataBody: initialMessage.data['body'],
      );

      setState(() {
        _notificationInfo = notification;
        _totalNotifications++;
      });
    }
  }

  @override
  void initState() {
    _totalNotifications = 0;
    registerNotification();
    checkForInitialMessage();

    // For handling notification when the app is in background
    // but not terminated
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      PushNotification notification = PushNotification(
        title: message.notification?.title,
        body: message.notification?.body,
        dataTitle: message.data['title'],
        dataBody: message.data['body'],
      );

      setState(() {
        _notificationInfo = notification;
        _totalNotifications++;
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notify'),
        brightness: Brightness.dark,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'App for capturing Firebase Push Notifications',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
            ),
          ),
          SizedBox(height: 16.0),
          NotificationBadge(totalNotifications: _totalNotifications),
          SizedBox(height: 16.0),
          _notificationInfo != null
              ? Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'TITLE: ${_notificationInfo!.dataTitle ?? _notificationInfo!.title}',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16.0,
                ),
              ),
              SizedBox(height: 8.0),
              Text(
                'BODY: ${_notificationInfo!.dataBody ?? _notificationInfo!.body}',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16.0,
                ),
              ),
            ],
          )
              : Container(),
        ],
      ),
    );
  }
}

class NotificationBadge extends StatelessWidget {
  final int totalNotifications;

  const NotificationBadge({required this.totalNotifications});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40.0,
      height: 40.0,
      decoration: new BoxDecoration(
        color: Colors.red,
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            '$totalNotifications',
            style: TextStyle(color: Colors.white, fontSize: 20),
          ),
        ),
      ),
    );
  }
}

class PushNotification {
  PushNotification({
    this.title,
    this.body,
    this.dataTitle,
    this.dataBody,
  });

  String? title;
  String? body;
  String? dataTitle;
  String? dataBody;
}*/