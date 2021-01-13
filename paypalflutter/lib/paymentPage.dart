import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
class PaymentPage extends StatefulWidget {
 final sku=001;
 final	name='Assinatura';
final	price=25;
final	currency='BRL';
final	quantity=1;
final	total=25;
final	description='Assinatura do servico';
  @override
  _PaymentPageState createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue[700],
      body: Container(
        margin: EdgeInsets.all(20),
        child: SafeArea(
          child: WebView(
            javascriptMode: JavascriptMode.unrestricted,
            initialUrl: Uri.dataFromString(_loadHTML(),mimeType: 'text/html').toString(),
          ),
        ),
      ),
    );
  }

  String _loadHTML(){
    return '''
    <html>
    <body onload="document.f.submit();">
    <form id="f" name="f" method="post" action="http://a1fa01a4cf1d.ngrok.io/payment">
    <input type="hidden" name="sku" value="${widget.sku}"/>
    <input type="hidden" name="name" value="${widget.name}"/>
    <input type="hidden" name="price" value="${widget.price}"/>
    <input type="hidden" name="currency" value="${widget.currency}"/>
    <input type="hidden" name="quantity" value="${widget.quantity}"/>
    <input type="hidden" name="total" value="${widget.total}"/>
    <input type="hidden" name="description" value="${widget.description}"/>
    </form>
    </body>
    </html>
    ''';
  }
}