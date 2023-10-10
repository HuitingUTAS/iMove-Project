import 'package:flutter/material.dart';
import 'package:flutter_session_manager/flutter_session_manager.dart';
import 'package:tracker/api/firebase_service.dart';

import '../../api/move_service.dart';
import '../../api/navigation_service.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final NavigationService navService = NavigationService();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final MoveService _moveService = MoveService();
  final _formKey = GlobalKey<FormState>();
  List<String> roles = ['Driver'];
  String selectedRole = 'Driver';
  String errorText = '';

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      final username = _usernameController.text;
      final password = _passwordController.text;
      final String? userId = await _moveService.login(username, password, selectedRole.toLowerCase());

      if (userId!.trim().isNotEmpty) {
        // Navigate to the next screen after successful login
        //Navigator.push(context, MaterialPageRoute(builder: (context) => OrderPage()));
        await SessionManager().set('userId', userId);
        FirebaseService.updateToken(userId);
        navService.pushNamed('/order', args: "");
      } else {
        setState(() {
          errorText = 'Invalid username or password.';
        });
      }
    }
  }

  void _resetForm() {
    _formKey.currentState?.reset();
    _usernameController.clear();
    _passwordController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('iMove'),
      ),
      body: WillPopScope(
          onWillPop: () async {
          _resetForm();
          return true; // Allow back navigation
        },
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                TextFormField(
                  controller: _usernameController,
                  decoration: const InputDecoration(
                    labelText: 'Username',
                    labelStyle: TextStyle(fontSize: 18.0),
                    errorStyle: TextStyle(fontSize: 18.0),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter username';
                    }
                    return null;
                  },
                  style: const TextStyle(fontSize: 18.0),
                ),
                const SizedBox(height: 16.0),
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                      labelText: 'Password',
                      labelStyle: TextStyle(fontSize: 18.0),
                      errorStyle: TextStyle(fontSize: 14.0)
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter password';
                    }
                    return null;
                  },
                  style: const TextStyle(fontSize: 18.0),
                ),
                const SizedBox(height: 16.0),
                DropdownButton<String>(
                  value: selectedRole,
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedRole = newValue!;
                    });
                  },
                  items: roles.map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(
                        value,
                        style: const TextStyle(fontSize: 18.0), // Adjust font size as needed
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 8.0), // Adjust spacing
                Text(
                  errorText,
                  style: const TextStyle(color: Colors.red),
                ),
                const SizedBox(height: 24.0),
                ElevatedButton(
                  onPressed: _submit,
                  style: ElevatedButton.styleFrom(
                    textStyle: const TextStyle(fontSize: 18), // Adjust the font size as needed
                  ),
                  child: const Text('Login'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}