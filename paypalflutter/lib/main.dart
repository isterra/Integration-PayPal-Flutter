import 'package:flutter/material.dart';
import 'package:paypalflutter/paymentPage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter PayPal integration'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          height: MediaQuery.of(context).size.height/3,
          margin: EdgeInsets.all(20),
          color: Colors.blue,
          child: Column(
            children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Image(image:NetworkImage('https://www.smartchinasourcing.com/wp-content/uploads/2018/10/TTPAYMENT1.jpg') ,),
            ),
            RaisedButton(
              child: Text("Comprar por R\$25,00",style: TextStyle(color: Colors.white,
            fontSize: 20),), 
            color: Colors.blue[700],     
              onPressed: ()=>Navigator.push(context, MaterialPageRoute(builder: (context)=>PaymentPage())))        
            ],
          ),
        ),
      ),
    );
  }
}
