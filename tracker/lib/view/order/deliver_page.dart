import 'package:flutter/material.dart';
import 'package:tracker/model/order_status_request.dart';

import '../../api/move_service.dart';
import '../../api/navigation_service.dart';
import '../../model/item.dart';

class DeliverPage extends StatefulWidget {
  final String orderId;
  const DeliverPage({Key? key, required this.orderId}) : super(key: key);

  @override
  _DeliverPageState createState() => _DeliverPageState();
}

class _DeliverPageState extends State<DeliverPage> {
  final NavigationService _navService = NavigationService();
  final MoveService _moveService = MoveService();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  Item? _selectedStatus;

  void _updateOrder(BuildContext context) async {
    if (_formKey.currentState!.validate()) {
      OrderStatusRequest request = OrderStatusRequest();
      request.id = widget.orderId;
      request.status = int.parse(_selectedStatus!.code);
      bool isSuccess = await _moveService.updateOrderStatus(request);
      if (isSuccess) {
        _navService.pushNamed('/order', args: "");
      } else {
        _showAlertDialog(context, 'There is an unexpected error happens, please try again later.');
      }
    }
  }

  void _showAlertDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('iMove Information'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the alert dialog
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Order Confirmation'),
      ),
    body: Form(
      key: _formKey,
      child: Stack(
      children: [
        Padding(
          padding: const EdgeInsets.all(0),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20,
                ),
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    'Update Status',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0), // Adjust the padding as needed
                  child: DropdownButtonFormField<Item>(
                    value: _selectedStatus,
                    onChanged: (newValue) {
                      setState(() {
                        _selectedStatus = newValue!;
                      });
                    },
                    items: Item.statusOptions.map((Item item) {
                      return DropdownMenuItem<Item>(
                        value: item,
                        child: Text(item.value),
                      );
                    }).toList(),
                    validator: (value) {
                      if (value == null || value.code.isEmpty) {
                        return 'Please select an option';
                      }
                      return null;
                    },
                    decoration: const InputDecoration(
                      labelStyle: TextStyle(
                        fontSize: 20.0,
                      ),
                      errorStyle: TextStyle(fontSize: 14.0),
                      labelText: 'Select an option',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const Spacer(),
                Center(
                  child: ElevatedButton(
                    onPressed: () {
                      _updateOrder(context); // Pass the context to show the dialog
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(50),
                    ),
                    child: const Text('Confirm', style: TextStyle(
                      fontSize: 20.0,
                    ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        )
        ],
      ),
    ),
    );
  }
}