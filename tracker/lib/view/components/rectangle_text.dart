import 'package:flutter/material.dart';

class DynamicWidthRectangle extends StatelessWidget {
  final String text;
  final Color color;

  DynamicWidthRectangle({required this.text, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: color,
      padding: EdgeInsets.all(8.0), // Adjust padding as needed
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 18.0,
        ),
      ),
    );
  }
}