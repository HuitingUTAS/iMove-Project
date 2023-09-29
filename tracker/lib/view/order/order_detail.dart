import 'package:flutter/material.dart';
import 'package:tracker/api/move_service.dart';
import 'package:tracker/view/route/navigation_page.dart';

import '../../model/order.dart';

class OrderDetailPage extends StatefulWidget {
  final String orderId;

  const OrderDetailPage({Key? key, required this.orderId}) : super(key: key);

  @override
  _OrderDetailPageState createState() => _OrderDetailPageState();
}

class _OrderDetailPageState extends State<OrderDetailPage> {
  final MoveService _moveService = MoveService();
  Future<Order>? _order;
  late String _orderId;

  Future<void> fetchOrderByOrderId(String orderId) async {
    _orderId = orderId;
    _order = _moveService.getOrdersByOrderId(orderId);
  }

  @override
  void initState() {
    super.initState();
    fetchOrderByOrderId(widget.orderId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Detail')),
      body: Center(
        // FutureBuilder
        child: FutureBuilder<Order>(
          future: _order,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              // once data is fetched, display it on screen (call buildPosts())
              final order = snapshot.data!;
              return buildOrder(order);
            } else if (snapshot.hasError) {
              //if no data, show simple Text
              return const Text("No data available");
            }
            // By default, show a loading spinner
            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }

  Widget buildOrder(Order order) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Order ID: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: order.orderNumber, style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const SizedBox(height: 8),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Customer Name: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: '${order.customer?.fullName}', style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const SizedBox(height: 8),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Parcel Quantity: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: order.parcelQty, style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const SizedBox(height: 5),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Total Amount: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: order.totalAmount, style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const SizedBox(height: 8),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Company Name: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: '${order.customer?.companyName}', style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const SizedBox(height: 8),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 20, color: Colors.black),
                children: [
                  const TextSpan(text: 'Delivery Address: ', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  TextSpan(text: '${order.customer?.deliveryAddress}', style: const TextStyle(color: Colors.black))
                ],
              ),
            ),
            const Spacer(), // Adds space between order details and buttons
          ],
        ),
      ),
      bottomNavigationBar: SizedBox(
        height: 50.0, // Adjust the height as needed
        child: Row(
          children: <Widget>[
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => NavigationPage(orderId: order.id!)));
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                ),
                child: const Text('Start', style: TextStyle(
                  fontSize: 20.0,
                ),
                ),
              ),
            ),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                ),
                child: const Text('Cancel', style: TextStyle(
                  fontSize: 20.0,
                ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}


