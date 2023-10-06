import 'package:flutter/material.dart';

//Reference - https://pub.dev/packages/no_context_navigation
class NavigationService<T, U> {
  static GlobalKey<NavigatorState> navigationKey = GlobalKey<NavigatorState>();

  Future<Future<T?>?> pushNamed(String routeName, {Object? args}) async =>
      navigationKey.currentState?.pushNamed<T>(
        routeName,
        arguments: args,
      );

  Future<Future<T?>?> push(Route<T> route) async =>
      navigationKey.currentState?.push<T>(route);

  Future<Future<T?>?> pushReplacementNamed(String routeName, {Object? args}) async =>
      navigationKey.currentState?.pushReplacementNamed<T, U>(
        routeName,
        arguments: args,
      );

  Future<Future<T?>?> pushNamedAndRemoveUntil(
      String routeName, {
        required Object args,
        bool keepPreviousPages = false,
      }) async =>
      navigationKey.currentState?.pushNamedAndRemoveUntil<T>(
        routeName,
            (Route<dynamic> route) => keepPreviousPages,
        arguments: args,
      );

  Future<Future<T?>?> pushAndRemoveUntil(
      Route<T> route, {
        bool keepPreviousPages = false,
      }) async =>
      navigationKey.currentState?.pushAndRemoveUntil<T>(
        route,
            (Route<dynamic> route) => keepPreviousPages,
      );

  Future<Future<bool>?> maybePop([Object? args]) async =>
      navigationKey.currentState?.maybePop<bool>(args as bool?);

  bool? canPop() => navigationKey.currentState?.canPop();

  void goBack({required T result}) => navigationKey.currentState?.pop<T>(result);
}