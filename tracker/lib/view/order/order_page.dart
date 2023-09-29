import 'package:flutter/material.dart';
import 'package:flutter_session_manager/flutter_session_manager.dart';
import '../../api/move_service.dart';
import '../../model/order.dart';
import '../components/rectangle_text.dart';
import 'order_detail.dart';

class OrderPage extends StatefulWidget {
  const OrderPage({super.key});

  @override
  _OrderPageState createState() => _OrderPageState();
}

class _OrderPageState extends State<OrderPage> {
  final MoveService _moveService = MoveService();

  Future<List<Order>> fetchOrders() async {
    String userId = await SessionManager().get("userId");
    if (userId.isNotEmpty) {
      return _moveService.getOrdersByDriverId(userId);
    }
    return [];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Listing')),
      body: Center(
        // FutureBuilder
        child: FutureBuilder<List<Order>>(
          future: fetchOrders(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
                // once data is fetched, display it on screen (call buildPosts())
                final orders = snapshot.data!;
                return buildOrders(orders);
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

  Widget buildOrders(List<Order> orders) {
    // ListView Builder to show data in a list
    return ListView.builder(
        itemCount: orders.length,
        itemBuilder: (context, index) {
          var order = orders[index];
          return InkWell(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => OrderDetailPage(orderId: order.id)));
            },
            child: Card(
              margin: const EdgeInsets.fromLTRB(8.0, 20.0, 8.0, 8.0),
              elevation: 4.0,
              child: ListTile(
                title: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 2,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            order.orderNumber,
                            style: const TextStyle(
                                fontSize: 20.0), // Adjust font size as needed
                          ),
                          const SizedBox(height: 8.0),
                          // Add spacing between title and subtitle
                          Text(order.customer.code ?? '', style: const TextStyle(
                            fontSize: 18.0,
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                          )),
                          Text(order.parcelQty, style: const TextStyle(
                            fontSize: 18.0,
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                          )),
                        ],
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        buildDisplayOrderStatusWidget(order)
                      ],
                    ),
                      /*child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          DynamicWidthRectangle(
                            text: order.orderStatus,
                            color: Colors.blueGrey,
                          ),
                        ],
                      ),*/
                    ),
                  ],
                ),
              ),
            ),
          );
        }
    );
  }

  Widget buildDisplayOrderStatusWidget(Order order) {
    String status = order.orderStatus;
    if (status.isNotEmpty) {
      return DynamicWidthRectangle(
            text: order.orderStatus,
            color: Colors.blueGrey
      );
    } else {
      return const Text(
        "",
        style: TextStyle(
          fontSize: 20,
        ),
      );
    }
  }
}


