package bebo.studios2

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import com.chaquo.python.Python
import com.chaquo.python.android.AndroidPlatform

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.app/python"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "runPython") {
                val param = call.argument<String>("param")
                
                // Initialize Python interpreter if not already initialized
                if (!Python.isStarted()) {
                    Python.start(AndroidPlatform(this))
                }
                
                try {
                    val py = Python.getInstance()
                    val pyModule = py.getModule("myscript") // Loads myscript.py
                    val pyFunction = pyModule.get("run_my_code") // Finds function
                    val pyResult = pyFunction?.call(param) // Executes function
                    
                    result.success(pyResult.toString())
                } catch (e: Exception) {
                    result.error("PYTHON_ERROR", e.message, null)
                }
            } else {
                result.notImplemented()
            }
        }
    }
}
