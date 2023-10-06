import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_session_manager/flutter_session_manager.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:tracker/api/move_service.dart';
import 'package:tracker/model/location_request.dart';
import 'package:tracker/view/order/deliver_page.dart';
import 'package:tracker/model/location.dart';

class NavigationPage extends StatefulWidget {
  final String orderId;
  const NavigationPage({Key? key, required this.orderId}) : super(key: key);

  @override
  _NavigationPageState createState() => _NavigationPageState();
}


class _NavigationPageState extends State<NavigationPage> {
  final Completer<GoogleMapController?> _googleMapController = Completer();
  final MoveService _moveService = MoveService();
  Position? _currentPosition;
  Marker? _sourcePosition, _destinationPosition;
  LatLng _curLocation = const LatLng(23.0525, 72.5667);
  Map<PolylineId, Polyline> polylines = {};
  String _locationText = "";
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    if (!mounted) {
      _timer?.cancel();
    } else {
      _getCurrentPosition();
      _processNavigation();
    }
  }

  @override
  void dispose() {
    super.dispose();
    _timer?.cancel();
  }

  void _processNavigation() {
    _timer = Timer.periodic(const Duration(seconds: 10), (timer) {
      //DateTime timenow = DateTime.now();  //get current date and time
      //time = timenow.hour.toString() + ":" + timenow.minute.toString() + ":" + timenow.second.toString();
      //setState(() {
      _getCurrentPosition();
    });
  }

  //Reference - https://medium.com/@fernnandoptr/how-to-get-users-current-location-address-in-flutter-geolocator-geocoding-be563ad6f66a
  Future<bool> _handleLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
              'Location services are disabled. Please enable the services')));
      return false;
    }
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Location permissions are denied')));
        return false;
      }
    }
    if (permission == LocationPermission.deniedForever) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
              'Location permissions are permanently denied, we cannot request permissions.')));
      return false;
    }
    return true;
  }

  Future<void> _getCurrentPosition() async {
    final hasPermission = await _handleLocationPermission();

    if (!hasPermission) return;
    await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
        .then((Position position) {
      setState(() {
        if (position != null) {
          _currentPosition = position;
          _curLocation =
              LatLng(_currentPosition!.latitude!, _currentPosition!.longitude!);
          _locationText =
          'Latitude: ${_currentPosition!
              .latitude}, Longitude: ${_currentPosition!.longitude}';
          _updateLocationRequest(_currentPosition!);
        }
      });
      //_getAddressFromLatLng(_currentPosition!);
    }).catchError((e) {
      //debugPrint(e);
      print(e.toString());
    });
  }

  _updateLocationRequest(Position position) async{
    String userId = await SessionManager().get("userId");
    if (userId.isNotEmpty) {
      Location location = Location(position.latitude, position.longitude);
      LocationRequest request = LocationRequest(userId, location);
      await _moveService.updateDriverLocation(request);
    }
  }

  _addMarker() {
    setState(() {
      _sourcePosition = Marker(
        markerId: const MarkerId('source'),
        position: _curLocation,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueAzure),
      );
      _destinationPosition = Marker(
        markerId: const MarkerId('destination'),
        position: LatLng(-42.914080, 147.342240),
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueCyan),
      );
    });
  }

  /*Future<void> _getAddressFromLatLng(Position position) async {
    await placemarkFromCoordinates(
        _currentPosition!.latitude, _currentPosition!.longitude)
        .then((List<Placemark> placemarks) {
      Placemark place = placemarks[0];
      setState(() {
        _currentAddress =
        '${place.street}, ${place.subLocality}, ${place.subAdministrativeArea}, ${place.postalCode}';
      });
    }).catchError((e) {
      debugPrint(e);
    });
  }*/


  /*final GeolocatorPlatform _geoLocator = GeolocatorPlatform.instance;
  late GoogleMapController _googleMapController;
  late Position _currentPosition;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  void _getCurrentLocation() async {
    try {
      const LocationSettings locationSettings = LocationSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 100,
      );

      final Position currentPosition = await _geoLocator.getCurrentPosition(
          locationSettings: locationSettings
      );
      setState(() {
        _currentPosition = currentPosition;
      });
    } catch (e) {
      print(e);
    }
  }*/

  /*@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _sourcePosition == null
          ? Center(child: CircularProgressIndicator())
          : Stack(
        children: [
          GoogleMap(
            zoomControlsEnabled: false,
            polylines: Set<Polyline>.of(polylines.values),
            initialCameraPosition: CameraPosition(
              target: _curLocation,
              zoom: 16,
            ),
            markers: {_sourcePosition!, _destinationPosition!},
            onTap: (latLng) {
              print(latLng);
            },
            onMapCreated: (GoogleMapController controller) {
              _googleMapController.complete(controller);
            },
          ),
          Positioned(
            top: 30,
            left: 15,
            child: GestureDetector(
              onTap: () {
                /*Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (context) => MyApp()),
                        (route) => false);*/
              },
              child: const Icon(Icons.arrow_back),
            ),
          ),
          Positioned(
              bottom: 10,
              right: 10,
              child: Container(
                width: 50,
                height: 50,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Colors.blue),
                child: Center(
                  child: IconButton(
                    icon: const Icon(
                      Icons.navigation_outlined,
                      color: Colors.white,
                    ),
                    onPressed: () async {
                      /*await launchUrl(Uri.parse(
                          'google.navigation:q=${widget.lat}, ${widget
                              .lng}&key=YOUR_API_KEY'));*/
                    },
                  ),
                ),
              ))
        ],
      ),
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('iMove'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.all(16.0), // Apply padding of 16.0 to all sides
              child: Text(
                'Current Location:',
                style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0), // Apply padding of 16.0 to all sides
              child: Text(
                _locationText,
                style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
              ),
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => DeliverPage(orderId: widget.orderId)));
              },
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(50),
              ),
              child: const Text('Route', style: TextStyle(
                fontSize: 20.0,
              ),
              ),
            ),
          ],
        ),
    );
  }
}